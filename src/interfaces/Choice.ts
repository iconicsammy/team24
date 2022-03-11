export interface InterfaceChoice {
    choice: string;
    onPress: Function;
    currentAnswer: boolean;
}

export interface InterfaceChoices {
    choices: string[];
}

export interface InterfaceAppContext {
    selectedChoice: string;
    updateAnswer: Function;
}


export interface InterfaceAnswer{
    question: string;
}

//fill in blank one...
export interface QuestionDetails {
    choices: string[],
    fillInBlankQuestion: string,
    sourceLanguageQuestion: string,
    answer: string,
    word: string
}