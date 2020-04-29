import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button, Divider } from 'react-native-elements';
import {validateEmail} from './../../utils/validation';
import * as firebase from 'firebase';
import Loading from './../../components/Loading';

export default CreateAccountForm = (props) => {
    const {toastRef} = props;
    const {navigation} = props;
    const [hidePassword, setHidePassword] = useState(true)
    const [hideRepeatPassword,setHideRepeatPassword] = useState(true);
    const [values,setValues] = useState({email:'',password:'',repPassword:''});
    const [load,setLoad] = useState(false);
    
    const handleInputChange = (value,name) => {
        setValues({...values, [name]:value });
    }

    const createNewUser = async () => {
        setLoad(true);
        if(!values.email || !values.password || !values.repPassword){
            toastRef.current.show("All fields are required.");
        } else {
            if( !validateEmail(values.email) ){
                toastRef.current.show("Email address is not valid.");
            } else {
                if( values.password !== values.repPassword){
                    toastRef.current.show("Passwords do not match.");
                } else {
                    await firebase.auth().createUserWithEmailAndPassword(values.email,values.password).then(() => {
                        setLoad(false);
                        navigation.navigate('My Account');
                    }).catch( (e) => {
                        console.log('Hubo un error',e) 
                        setLoad(false);
                        toastRef.current.show('There was a mistake creating the account.');
                    });
                }
            }
        }
        setLoad(false);
    }

    return (
        <View style={styles.formContainer} behavior="padding" enabled>
            <Input style={styles.inputForm} placeholder="Email" rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight} />} onChange={e => handleInputChange(e.nativeEvent.text,'email')} />
            <Input style={styles.inputForm} password={true} secureTextEntry={hidePassword}  onChange={e => handleInputChange(e.nativeEvent.text,'password')}
                placeholder="Password"
                rightIcon={<Icon type="material-community" name={hidePassword ? "eye-off-outline":"eye-outline"} iconStyle={styles.iconRight} onPress={() => setHidePassword(!hidePassword)} />} />
            <Input style={styles.inputForm} password={true} secureTextEntry={hideRepeatPassword} onChange={e => handleInputChange(e.nativeEvent.text,'repPassword')}
                placeholder="Repeat password"
                rightIcon={<Icon type="material-community" name={hideRepeatPassword ? "eye-off-outline":"eye-outline"} iconStyle={styles.iconRight} onPress={() => setHideRepeatPassword(!hideRepeatPassword)} />} />
            <Button title="Sign up" buttonStyle={styles.btnStyle} containerStyle={{ width: "100%" }} onPress={createNewUser} />
            <Loading active={load} text={"creating account..."} />
        </View>
    );
}



const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    iconRight: {
        color: "#c1c1c1"
    },
    viewBtn: {
        flex: 1,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    btnStyle: {
        backgroundColor: "#001a35",
        marginTop:20,
    },
    divider: {
        backgroundColor: "#000",
        height:5,
        marginTop: 10,
        marginBottom: 10,
    },
    
})