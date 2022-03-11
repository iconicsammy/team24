### Team Twenty 24

Depedencies:

    "@react-native-firebase/app: "^14.5.1",
    "@react-native-firebase/firestore": "^14.5.1",
    "react": "17.0.2",
    "react-native": "0.67.3"

### Running the app

 do npm install
 npm start
 npm run android



### Data Structure Example:
````
{
    "sourceLanguage": "en",
    "question": "will you come to my house?",
    "questionType": "fillInBlank", 

    "de": {
            "question": "kommst du zu mir nach hause?",
            "translations": 
                {"come": 
                  {
                      "choices": :["deComeOne", "deComeTwo", "deComeTrhee", "kommst"],
                      "answer": "kommst"
                  }, 
                
                "house": {
                      "choices": :["deHouseOne", "hause", "deHauseThree", "deHouseFour"],
                      "answer":"hause"
                  }
        
             }

        }, 

}

````

Explanation:

    the words come and house are eligible for translation in the original english. If user is playing easy, one of them would be replaced. if medium, more...

    "de" represents the German language this language could be played with.

### Limitations

Android only.

Each question expects four answers.

some flaky with highlight text