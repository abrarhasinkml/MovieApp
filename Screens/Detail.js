import React, {Component} from 'react';
import {View, Text,TextInput, Button, StyleSheet, Image} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Detail ({navigation}){
    const api_URL="http://www.omdbapi.com/?apikey=1c5b36f0&i=";
    const [state,setState]=useState({
        selection:[],
        ratings:[]
    });
    useEffect(()=>{
        const loadMovie=()=>{
            const url=api_URL+navigation.getParam('imdb');
            console.log(url);
            axios(url).then(({data})=>{
                let d=data;
                console.log(d)
                let r=d.Ratings;
                console.log(r);
                setState(prevState=>{return{
                    ...prevState,selection:d, ratings:r
                }})
            })
        }
        loadMovie();

    },[])
    
    
    return(
        <View style={styles.container}>
            
            <View>
                <Image
                    style={styles.filmPoster}
                    source={{
                        uri: state.selection.Poster,
                        }}
                    />
                <Text>{state.selection.Title}</Text>
                <Text>{state.selection.Genre}</Text>
                <Text>{state.selection.Director}</Text>
                <Text>{state.selection.Plot}</Text>
                <Text>{state.selection.Actors}</Text>
                <View>
                {state.ratings.map(
                        rating=>(
                           <View key={rating.Source}>
                               <Text>{rating.Source} - {rating.Value}</Text>
                           </View> 
                        )
                    )}
                </View>
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
    filmPoster:{
        width:300,
        height:300
    }

    
  });
  


