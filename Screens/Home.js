import React, {Component} from 'react';
import {Text,View, TextInput, Button, StyleSheet, ScrollView, Image, StatusBar, TouchableOpacity} from 'react-native';
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
                        <View style={styles.searchEnd}>
                            <View style={{flex:1}}>
                            <TextInput style={styles.searchbox}
                                placeholder="Enter Movie Name"
                                onSubmitEditing={checkInput}
                                onChangeText={text=>setState(prevState=>{return {...prevState, searchquery:text}})}
                            />
                            </View>
                            <View style={{flex:1}}>
                                <TouchableOpacity style={styles.searchbtn} onPress={checkInput}>Search</TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    
                </View>
                <ScrollView>
                    {state.search_res.map(
                        movie=>(
                           <View key={movie.imdbID} style={styles.moviecards}>
                               <View style={styles.shadow}>
                               <Image
                                    style={styles.moviePoster}
                                    source={{
                                        uri: movie.Poster,
                                      }}
                                    onPress={() => navigation.navigate('Detail',{
                                        imdb: movie.imdbID})}
                                    />
                                </View>
                                <Text style={styles.movietitle} onPress={() => navigation.navigate('Detail',{
                                   imdb: movie.imdbID})}>{movie.Title}</Text>
                               
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
        alignSelf:"stretch",
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
    searchEnd:{
        flexDirection:'row',
        alignSelf:"center",
    },
    searchbox:{
        
        justifyContent:'flex-start',
        width: 250,
        height: 36,
        borderRadius:45,
        backgroundColor:'#fff',
        padding:10,
        marginRight:90
        
    },
    searchbtn:{
        height:36,
        width:59,
        backgroundColor:'#e9c46a',
        borderRadius:45,
        paddingTop:10,
        
        alignItems:"center"
    }
    ,
    moviecards:{
        flexDirection:"row",
        backgroundColor:"#2a9d8f",
        marginTop:25,
        alignItems:"center",
        marginLeft:250,
        marginRight:250
    },
    shadow: {
        shadowColor: '#202020',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
      },
    moviePoster:{
        height:100,
        width:100,
        
    },
    
    movietitle:{
        color:"#fff",
        fontWeight:700,
        fontSize:30,
        marginLeft:10
    }
    

    
  });
  


