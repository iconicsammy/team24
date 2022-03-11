import React, { useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Text } from "react-native"
import { InterfaceAnswer, InterfaceAppContext } from 'interfaces/Choice';
import AppContext from 'context/AppContext';


const FillInBlank = (props: InterfaceAnswer) => {
   const appContext = useContext<InterfaceAppContext>(AppContext);
   const { selectedChoice } = appContext;

   const { question, children } = props;

 
   return (<TouchableOpacity >{children}</TouchableOpacity>)
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

export default FillInBlank;