import React, { useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { InterfaceChoice, InterfaceAppContext } from 'interfaces/Choice';
import AppContext from 'context/AppContext';


const Choice = (props: InterfaceChoice) => {
   const appContext = useContext<InterfaceAppContext>(AppContext);
   const { selectedChoice, updateAnswer } = appContext;

   const { choice, onPress, currentAnswer } = props;

   const handleChoiceSelection = () => {
      updateAnswer(choice)
      onPress(choice);
   }
   return (<TouchableOpacity onPress={handleChoiceSelection} style={currentAnswer ? styles.selectedChoice : styles.btn}><Text style={currentAnswer ? styles.textHide : styles.text}>{choice}</Text></TouchableOpacity>)
};

const styles = StyleSheet.create({
   btn: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    marginLeft: 10
   },
   selectedChoice: {
      backgroundColor: '#608fa4',
      borderRadius: 15,
      padding: 10,
      marginLeft: 10 
   },
   text: {
    color: '#000'
 
   },
   textHide: {
      color: '#608fa4',
      fontWeight: "200"
   }
 });

export default Choice;