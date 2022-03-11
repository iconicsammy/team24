
import { QuestionDetails } from 'interfaces/Choice';


export function buildFillInBlankQuestion(questionBlock: any, sourceLanguage: string, destLanguage: string, complexity: number): QuestionDetails {
    /*
        given main question such as whats your name, build a question.

        complexity = 1 is easy, 2 medium or 3 hard
    */

    const sourceLanguageQuestion = questionBlock["question"];
    const destLanguageBlock = questionBlock[destLanguage];
    const destLanguageQuestion = destLanguageBlock['question'];
    const translations = destLanguageBlock['translations'];
    const destTranslateWords = Object.keys(translations);
    /*
    if (complexity === 1){
      //fill only one in blank.
    }
    */

    //going with one fill in blank space
    const word = destTranslateWords[Math.floor(Math.random() * destTranslateWords.length)];
    const choices: string[] = translations[word].choices;
    const answer = translations[word].answer;
    const fillInBlankQuestion = destLanguageQuestion.replace(answer, '_'.repeat(answer.length)); //what user will see.

    return {
        choices,
        fillInBlankQuestion,
        sourceLanguageQuestion,
        answer,
        word
    };
}

export function fillInBlankTitleBuilder(question: string, highlightWord: string) : string[] {
    const words = question.split(' ');
    const elements: string[] = [];

    let lastWasHighLightWord = false;
    words.forEach(d => {
        if (d !== highlightWord) {
            if (elements.length == 0) {
                elements.push(d)
            } else {
                if (lastWasHighLightWord) {
                    elements.push(d)
                } else {
                    elements[elements.length - 1] = elements[elements.length - 1] + " " + d;
                }

            }
            lastWasHighLightWord = false;
        } else {
            lastWasHighLightWord = true;
            elements.push('')
        }
    });
    return elements;
}