import React, {Component} from 'react';
import {View, Text,TextInput, Button, StyleSheet} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Detail ({navigation}){
    const api_URL="http://www.omdbapi.com/?apikey=1c5b36f0&i=";
    const [state,setState]=useState({
        selection:[],
    });
    useEffect(()=>{
        const loadMovie=()=>{
            const url=api_URL+navigation.getParam('imdb');
            console.log(url);
            axios(url).then(({data})=>{
                let d=data;
                console.log(d)
                setState(prevState=>{return{
                    ...prevState,selection:d
                }})
            })
        }
        loadMovie();

    },[])
    
    
    return(
        <View style={styles.container}>
            
            <View>
                {state.selection.Title}
            </View>
        </View>
    );
    
    
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      marginTop:50,
      alignItems: "center"
    },
    searchbox:{
        margin:10
    }

    
  });
  


