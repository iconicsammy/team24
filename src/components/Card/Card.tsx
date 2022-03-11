import React, { useState, useContext, useEffect } from 'react';
import AppContext from 'context/AppContext';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { InterfaceAppContext } from 'interfaces/Choice';
import Choice from 'components/Choice/Choice';
import FillInBlank from 'components/FillInBlank/FillInBlank';
import ServiceData from 'services/ServiceData';
import { QuestionDetails } from 'interfaces/Choice';
import { buildFillInBlankQuestion, fillInBlankTitleBuilder } from 'utils/questionBuilder';

const Card = () => {
    const appContext = useContext<InterfaceAppContext>(AppContext);
    const [questions, updateQuestions] = useState<QuestionDetails[]>([]);
    const [activeQuestion, loadQuestion] = useState(-1); //nothing selected
    const [answerState, updateAnswerState] = useState('');
    const [btnLabel, updateBtnLabel] = useState('Continue')
    const { selectedChoice, updateAnswer, complexity, sourceLanguage, destLanguage } = appContext;


    const displayFillInBlanKQuestion = () => {
        const userQuestion = questions[activeQuestion].sourceLanguageQuestion;
        const highlightWORD = questions[activeQuestion].word;

        const textElements : string[] = fillInBlankTitleBuilder(userQuestion, highlightWORD)
        
        return (<>
         {textElements.map((ele:string, index: number)=>{
              if (ele === ''){
                return (<Text style={styles.highlight} key={index.toString()}> {highlightWORD} </Text>)
              }else{
                  return (<Text key={index.toString()}>{ele}</Text>)
              }
         })}
        </>)
    }

    function onQuestionsFetched(QuerySnapshot) {
 
        const questionsList: QuestionDetails[] = [];

        QuerySnapshot.forEach(documentSnapshot => {

            const question = documentSnapshot.data();


            if (question['questionType'] === 'fillInBlank') {
                const questionDetails: QuestionDetails = buildFillInBlankQuestion(question, sourceLanguage, destLanguage, complexity);
                questionsList.push(questionDetails);
            }
        });
        updateQuestions(questionsList);
        if (questionsList.length > 0){
            //prepare the question now
            loadQuestion(0);
        }
    }

    function onErrorFetchingResults(error: any) {
        Alert.alert('Error', 'we could not get questions')
        console.error(error);
    }


    useEffect(() => {
        ServiceData.getQuestions(onQuestionsFetched, onErrorFetchingResults);

        // Stop listening for updates when no longer required
        return () => ServiceData.stopListening();
    }, []);




    const handleChoiceSelection = (selectedChoice: string) => {
        updateBtnLabel('Check Answer');
    }

    const handleAnswerButton = () => {
        if (selectedChoice === '') {
            return;
        }
        //did user got the right answer?
        if (btnLabel === 'Check Answer') {
            if (selectedChoice === questions[activeQuestion].answer) {
                // good answer. get next question now
                updateAnswer('');
                updateBtnLabel('Continue');
                updateAnswerState('success')
                if (activeQuestion < questions.length){
                    loadQuestion(activeQuestion + 1)
                }else{
                    //restart?
                    loadQuestion(0);
                }
            } else {
                updateAnswerState('error')
            }
        }
    }

    const renderActionBtn = (btnStyle = styles.actionButton, txtStyle = styles.normalText) => (<View style={styles.actionButtonContainer}>
        <TouchableOpacity onPress={handleAnswerButton} style={btnStyle}><Text style={txtStyle}>{btnLabel}</Text></TouchableOpacity>
    </View>)

    const renderSuccessBar = () => {
        return (<View style={styles.greatJob}>
            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <Text>Great Job!</Text>
                {renderActionBtn(styles.actionButtonSuccess, styles.greatJobText)}
            </View>

        </View>)
    }

    const renderErrorBar = () => {
        return (<View style={styles.badAnswer}>
            <View style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                <Text>Answer: {questions[activeQuestion].answer}</Text>
                {renderActionBtn(styles.actionButtonSuccess, styles.badAnswerText)}
            </View>

        </View>)
    }



    return (<>{activeQuestion > -1 ? (<View style={styles.container}>
        <Text style={styles.questionDirection}>Fill in the blank space</Text>

        <Text style={styles.question}>
            {displayFillInBlanKQuestion()}
        </Text>


        <FillInBlank question="hellen"><Text>{questions[activeQuestion].fillInBlankQuestion}</Text></FillInBlank>


        <View style={styles.choices}>
            <Choice choice={questions[activeQuestion].choices[0]} onPress={handleChoiceSelection} currentAnswer={selectedChoice === questions[activeQuestion].choices[0]} />
            <Choice choice={questions[activeQuestion].choices[1]} onPress={handleChoiceSelection} currentAnswer={selectedChoice === questions[activeQuestion].choices[1]} />
        </View>


        <View style={styles.choices}>
            <Choice choice={questions[activeQuestion].choices[2]} onPress={handleChoiceSelection} currentAnswer={selectedChoice === questions[activeQuestion].choices[2]} />
            <Choice choice={questions[activeQuestion].choices[3]} onPress={handleChoiceSelection} currentAnswer={selectedChoice === questions[activeQuestion].choices[3]} />
        </View>

        {answerState === '' && (renderActionBtn())}
        {answerState === 'success' && (renderSuccessBar())}
        {answerState === 'error' && (renderErrorBar())}
    </View>) : (<Text>Loading game</Text>)}</>)
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#3a6b80',
        marginTop: 80,
        flex: 1,
        flexGrow: 1,
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    questionDirection: {
        marginTop: 25,
        fontSize: 10,
        color: '#fff'
    },
    question: {
        fontSize: 14,
        marginTop: 12,
        color: '#fff'
    },
    answer: {
        fontSize: 12,
        marginTop: 15,
        color: '#fff'
    },
    highlight: {
        fontWeight: '800',
        textDecorationLine: 'underline',
        color: '#fff'
    },
    choices: {
        marginTop: 10,
        flexDirection: 'row',
        padding: 5
    },
    actionButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 50,
        width: '70%'
    },
    actionButton: {
        backgroundColor: '#6090a3',
        borderRadius: 15,
        padding: 10,
        marginLeft: 10,
        alignItems: 'center'
    },
    normalText: {
        color: '#FFF'
    },
    greatJob: {
        backgroundColor: '#00e8e6',
        alignItems: 'center',
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    actionButtonSuccess: {
        backgroundColor: '#ffffff',

        borderRadius: 15,
        padding: 10,
        marginLeft: 10,
        alignItems: 'center'
    },
    greatJobText: {
        color: '#000',
    },
    badAnswer: {
        backgroundColor: '#ff8b8a',
        alignItems: 'center',
        flex: 1,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    badAnswerText: {
        color: '#ff0000',
    },
});

export default Card;