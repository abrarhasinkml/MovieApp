import React, {Component} from 'react';
import {Text,View, TextInput, Button, StyleSheet, ScrollView, Image, StatusBar} from 'react-native';
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
    const checkInput=()=>{
        if(!state.searchquery.trim()){
            alert("Please enter a movie name!");
        }
        else{
            searchMovie();
        }
    }
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
                <View style={styles.headerdiv}>
                    <View style={{flex:1}}>
                        <Text style={styles.headerText}>MovieApp</Text>
                    </View>
                    <View style={{flex:1}}>
                        <TextInput style={styles.searchbox}
                            placeholder="Enter Movie Name"
                            onSubmitEditing={checkInput}
                            onChangeText={text=>setState(prevState=>{return {...prevState, searchquery:text}})}
                        />
                    </View>
                    
                </View>
                <ScrollView style={styles.moviecards}>
                    {state.search_res.map(
                        movie=>(
                           <View key={movie.imdbID} style={styles.cards}>
                               <Image
                                    style={styles.moviePoster}
                                    source={{
                                        uri: movie.Poster,
                                      }}
                                    />
                               <Text style={styles.movietitle} onPress={() => navigation.navigate('Detail',{
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
      backgroundColor:"#264653"
    },
    headerdiv:{
        flexDirection:"row",
        alignSelf:"auto",
        backgroundColor:"#2a9d8f",
        paddingTop:70,
        paddingBottom:10,
    },
    headerText:{
        justifyContent:'flex-start',
        color:"#fff",
        fontWeight:700,
        fontSize:30,
        marginLeft:250,

    },
    searchbox:{
        
        justifyContent:'flex-end',
        width: 250,
        height: 36,
        borderRadius:45,
        backgroundColor:'#fff',
        padding:10,
        
    },
    
    moviecards:{
        padding:10,
        flexDirection:"row"
    },
    cards:{
        flex:1
    },
    moviePoster:{
        height:300,
        width:300,
        justifyContent:'flex-start'
    },
    
    movietitle:{
        justifyContent:'flex-end'
    }
    

    
  });
  


