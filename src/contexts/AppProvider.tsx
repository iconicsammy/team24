import React, { Component } from 'react';
import AppContext from "./AppContext";
import {QuestionsOptions, ProviderProps} from './Context.Interface';
import { QuestionComplexityEnum } from './QuestionComplexity.enum';



class AppProvider extends Component<ProviderProps, QuestionsOptions> {
    constructor(props: ProviderProps) {
        super(props);

        this.state = {
            complexity:  QuestionComplexityEnum.Easy, //so that we can user option to chose how complex the questions can be.
            sourceLanguage: 'en',
            destLanguage: 'de',
            selectedChoice: ''
        };
    }
    render() {
        return (<AppContext.Provider value={{...this.state,
            updateAnswer: (choice: string) => {       
            this.setState({
                ...this.state,
                selectedChoice: choice
            });
        },}}>{this.props.children}</AppContext.Provider>);
    }
};

export default AppProvider;