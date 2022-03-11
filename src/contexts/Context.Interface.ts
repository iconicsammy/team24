import { QuestionComplexityEnum } from './QuestionComplexity.enum';

export interface QuestionsOptions{
    complexity: QuestionComplexityEnum,
    sourceLanguage: string,
    destLanguage: string,
    selectedChoice: string
}


export interface ProviderProps {}