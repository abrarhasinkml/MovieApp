import React, {Component} from 'react';
import {Text,View, TextInput, Button, StyleSheet, ScrollView, Image} from 'react-native';
import axios from 'axios';
import { useState } from 'react';




export default function Home ({navigation}){
    const apiURL="http://www.omdbapi.com/?apikey=1c5b36f0&s=";
    const [state,setState]=useState({
        searchquery:"",
        search_res:[],
        selection:{},
        testText:""
    });

    const searchMovie=()=>{
        const url=apiURL+state.searchquery;
        axios(url).then(({data})=>{
            let d=data.Search;
            console.log(d)
            setState(prevState=>{return{
                ...prevState,search_res:d
            }})
        })
    }
        return(
            <View style={styles.container}>
                <TextInput style={styles.searchbox}
                    placeholder="Enter Movie Name"
                    onSubmitEditing={searchMovie}
                    onChangeText={text=>setState(prevState=>{return {...prevState, searchquery:text}})}
                />
                <ScrollView style={styles.moviecards}>
                    {state.search_res.map(
                        movie=>(
                           <View key={movie.imdbID}>
                               <Image
                                    style={styles.moviePoster}
                                    source={{
                                        uri: movie.Poster,
                                      }}
                                    />
                               <Text onPress={() => navigation.navigate('Detail',{
                                   imdb: movie.imdbID
                               })}>{movie.Title}</Text>
                                
                           </View> 
                        )
                    )}
                </ScrollView>
                
                
            </View>
        );
    
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      alignItems: "center",
      backgroundColor:'#9ACD32'
    },
    searchbox:{
        margin:20,
        width: 250,
        height: 36,
        borderRadius:45,
        backgroundColor:'#fff',
        padding:10
    },
    searchbtn:{
        flex:0
    },
    moviePoster:{
        height:300,
        width:300
    }

    
  });
  


