import React, {Component} from 'react';
import {View, Text,TextInput, Button, StyleSheet, Image, ImageBackground} from 'react-native';
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
                <Text style={styles.movieHeader}>{state.selection.Title}</Text>
                <View style={styles.imageShadow}>
                    <ImageBackground
                            style={styles.filmPosterBanner}
                            resizeMode="cover"
                            source={{
                                uri: state.selection.Poster,
                                }}
                            blurRadius={5}
                            >
                    <Image
                        style={styles.filmPoster}
                        source={{
                            uri: state.selection.Poster,
                            }}
                        />
                    </ImageBackground>
                </View>
                <Text style={styles.info}>Genre: {state.selection.Genre}</Text>
                <Text style={styles.info}>Director: {state.selection.Director}</Text>
                <Text style={styles.infoHeaders}>Plot</Text>
                <Text style={styles.info}>{state.selection.Plot}</Text>
                <Text style={styles.infoHeaders}>Cast</Text>
                <Text style={styles.info}>{state.selection.Actors}</Text>
                <Text style={styles.infoHeaders}>Ratings</Text>
                <View>
                {state.ratings.map(
                        rating=>(
                           <View key={rating.Source}>
                               <Text style={styles.info}>{rating.Source} - {rating.Value}</Text>
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
      paddingTop:50,
      backgroundColor:"#264653"
    },
    imageShadow:{
        shadowColor: '#202020',
        shadowOffset: {width: 0, height: 5},
        shadowRadius: 3,        
    },
    filmPosterBanner:{
        flexDirection:"column",
        height:400,
        alignItems:"center"
    },
    filmPoster:{
        width:250,
        height:250,
        position:'absolute',
        bottom:0,
        shadowColor: '#202020',
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 3,
        
    },
    movieHeader:{
        color:"#fff",
        fontWeight:700,
        fontSize:30,
        alignSelf:"center",
        marginBottom:8
    },
    info:{
        color:"#fff",
        fontWeight:300,
        fontSize:15,
        alignSelf:"center",
        marginTop:5
        
    },
    infoHeaders:{
        color:"#fff",
        fontWeight:300,
        fontSize:20,
        alignSelf:"center",
        borderBottomColor:"#8d99ae"
    }
    


    
  });
  


