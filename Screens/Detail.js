import React, {Component} from 'react';
import {View, TextInput, Button, StyleSheet} from 'react-native';

export default class Home extends Component{
    
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.searchbox}
                    placeholder="New Screen"
                />
                <Button
                    title="Search"
                    style={styles.searchbtn}
                    onPress={()=>this.props.navigation.navigate('Detail')}
                >
                </Button>
            </View>
        );
    }
    
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
  


