import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button, Divider } from 'react-native-elements';
import { validateEmail } from './../../utils/validation';
import * as firebase from 'firebase';
import Loading from './../../components/Loading';

export default LoginForm = (props) => {
    const { toastRef } = props;
    const { navigation } = props;
    const [hidePassword, setHidePassword] = useState(true)
    const [values, setValues] = useState({ email: '', password: '' });
    const [load, setLoad] = useState(false);

    const handleInputChange = (value, name) => {
        setValues({ ...values, [name]: value });
    }

    const logIn = async () => {
        setLoad(true);
        if(!values.email || !values.password){
            toastRef.current.show('All fields are required');
        } else {
            if(!validateEmail(values.email.trim())){
                toastRef.current.show('Email address is not valid.');
            } else {
                await firebase.auth().signInWithEmailAndPassword(values.email,values.password).then(() => {
                    setLoad(false);
                    navigation.navigate('My Account');
                }).catch(() => {
                    setLoad(false);
                    toastRef.current.show('Email or password is not valid.');
                })
            }
        }
        setLoad(false);
    }

    return (
        <View style={styles.formContainer} >
            <Input style={styles.inputForm} placeholder="Email"
                rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight} />}
                onChange={e => handleInputChange(e.nativeEvent.text, 'email')} />
            <Input style={styles.inputForm} password={true} secureTextEntry={hidePassword}
                onChange={e => handleInputChange(e.nativeEvent.text, 'password')}
                placeholder="Password"
                rightIcon={<Icon type="material-community" name={hidePassword ? "eye-off-outline" : "eye-outline"} iconStyle={styles.iconRight} onPress={() => setHidePassword(!hidePassword)} />} />
            <Button title="Sign in" buttonStyle={styles.btnStyle} containerStyle={{ width: "100%" }} onPress={logIn} />
            <Loading active={load} text={"Signing in..."} />
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
        marginTop: 20,
        marginBottom:15 ,
    },
    divider: {
        backgroundColor: "#000",
        height: 5,
        marginTop: 10,
        marginBottom: 10,
    },

})