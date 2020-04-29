import React from 'react'
import {View,Text,ScrollView,StyleSheet,Image} from 'react-native';
import {Button} from 'react-native-elements';


export default AnonymousUser = ({props}) => {
    const {navigation} = props;
    return (
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Image source={require("./../../../assets/img/250px-Madara.png")} 
                style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>You are currently logged as an anonymous account.</Text>
            <Text style={styles.description}>To gain access to all options like post and rate, you need to log into an account.</Text>
            <View style={styles.viewBtn}>
                <Button buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer} title="Log in" onPress={() => navigation.navigate('Log into your account')}/>
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    viewBody: {
        marginLeft:30,
        marginRight:30,
    },
    image:{
        height:300,
        width:"100%",
        marginBottom:10,
    },
    title:{
        fontWeight:"bold",
        fontSize:21,
        marginBottom:10,
        textAlign:"center"
    },
    description:{
        textAlign:"center",
        marginBottom:40,
    },
    viewBtn: {
        flex:1,
        alignItems:"center",
    },
    btnStyle:{
        backgroundColor:"#001a35"
    },
    btnContainer: {
        width:"100%",
    }
});