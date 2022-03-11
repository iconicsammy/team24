import firestore from '@react-native-firebase/firestore';

class DataService {
    private static _instance: DataService;
    private subscriber: any;
    constructor() {
        if (!DataService._instance) {
            DataService._instance = this;
        }
        // Initialize object
        return DataService._instance;
      }

    getQuestions = (questionsRetrieved: any, errorGettingQuestions: any, questionType: string = 'fillInBlank') =>{
        //TODO: create proper interfaces for onShapshot arguements 
        // questionType is just to query specific questions should we wish
        
       this.subscriber = firestore().collection('questions').onSnapshot(questionsRetrieved, errorGettingQuestions);
    }

    stopListening = () =>{
        if (this.subscriber){
            this.subscriber();
        }
    }
}

const ServiceData = new DataService();

export default ServiceData;