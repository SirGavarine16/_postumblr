import React, { useState, useRef } from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import LoginForm from './../../components/Account/LoginForm';
import Toast from 'react-native-easy-toast';
import LoginFacebook from '../../components/Account/LoginFacebook';

export default Login = ({ navigation }) => {
    const [haveAccount, setHaveAccount] = useState(false);
    const toastRef = useRef();

    const goToNewAccount = () => {
        navigation.navigate('Create new account');
    }
    const openLogin = () => {
        setHaveAccount(true);
    }

    return (
        <ScrollView style={styles.viewBody} centerContent={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <Image source={require("./../../../assets/img/tumblr-logo.png")}
                style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>Sign into your account:</Text>
            <Divider style={styles.divider} />
            { !haveAccount ? <View style={styles.viewBtn}>
                <Button buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer} title="I have an account" onPress={openLogin} />
            </View> : null}
            {
                haveAccount ? <View>
                    <LoginForm toastRef={toastRef} navigation={navigation} />
                </View> : null
            }
            <View style={styles.viewBtn}>
                <Button buttonStyle={styles.btn2Style} containerStyle={styles.btnContainer} title="Create new account" onPress={goToNewAccount} />
            </View>

            <View style={styles.viewFBtn}>
                <LoginFacebook toastRef={toastRef} navigation={navigation} />
            </View>
            
            <ForgotPassword navigation={navigation}></ForgotPassword>

            <Divider style={styles.divider} />
            <Toast ref={toastRef} position="top" opacity={0.8} positionValue={10} style={styles.toastError} />
        </ScrollView>
    );
}

ForgotPassword = ({ navigation }) => {
    return (
        <View style={{ alignItems: "center" }}>
            <Text style={styles.textAdvice}>Forgot password? {" "}
                <Text style={styles.textLink} onPress={() => navigation.navigate('Recover account')}>Click here.</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,
    },
    image: {
        height: 150,
        width: "100%",
        marginTop: 45,
    },
    title: {
        fontWeight: "bold",
        fontSize: 21,
        marginBottom: 10,
        textAlign: "center"
    },
    description: {
        textAlign: "center",
        marginBottom: 40,
    },
    viewBtn: {
        flex: 1,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    btnStyle: {
        backgroundColor: "#001a35"
    },
    btn2Style: {
        backgroundColor: "#5f5e70"
    },
    btnContainer: {
        width: "100%",
    },
    divider: {
        marginTop: 10,
        marginBottom: 10,
    },
    textAdvice: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    textLink: {
        fontWeight: "bold",
        color: "#001a35"
    },
    toastError: {
        backgroundColor: "red",
        padding: 10,
        width: "90%",
        alignItems: "center",
    },
    viewFBtn:{
        flex: 1,
        alignItems: "center",
        marginTop: 35,
        marginBottom: 5,
    },
    fbBtn:{
        backgroundColor:"#4267B2"
    }
});