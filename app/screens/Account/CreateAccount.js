import React, { useRef } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CreateAccountForm from '../../components/Account/CreateAccountForm';
import { Divider } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

export default CreateAccount = ({navigation}) => {
    const toastRef = useRef();

    return (
            <KeyboardAwareScrollView>
                <Image source={require('./../../../assets/img/tumblr-logo.png')}
                    style={styles.logo} resizeMode="contain" />
                <View style={styles.viewForm}>
                    <CreateAccountForm toastRef={toastRef} navigation={navigation} />
                </View>
                <Toast ref={toastRef} style={styles.toastError} position="top" positionValue={10}  opacity={0.8} />
            </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 45,
    },
    viewForm: {
        marginRight: 30,
        marginLeft: 30,
    },
    divider: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 30,
        marginLeft: 30,
    },
    toastError: {
        backgroundColor: "red",
        padding: 10,
        width: "90%",
        alignItems: "center",
      },
});