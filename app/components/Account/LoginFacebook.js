import React, { useState } from 'react'
import { SocialIcon } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { FacebookApi } from './../../utils/social';
import Loading from './../Loading';

export default LoginFacebook = (props) => {
    const { toastRef, navigation } = props;
    const [load, setLoad] = useState(false);

    const logIn = async () => {
        try {
            await Facebook.initializeAsync(FacebookApi.application_id);
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                const credentials = firebase.auth.FacebookAuthProvider.credential(token);
                await firebase.auth().signInWithCredential(credentials).then(() => {
                    navigation.navigate('My Account');
                }).catch(() => {
                    //Error
                    toastRef.current.show('Facebook Login Error');
                });
            } else {
                // type === 'cancel'
                toastRef.current.show('Sign-in was cancelled.');
            }
        } catch ({ message }) {
            // alert(`Facebook Login Error: ${message}`);
            //console.log('Facebook login error: '+message);
            toastRef.current.show('Facebook Login Error');
        }
    }

    return (
        <>
            <SocialIcon
                title="Log in with Facebook"
                button type="facebook"
                onPress={logIn}
                style={{ width: "100%" }}
            />
            <Loading active={load} text="Signing in with facebook..." />
        </>
    );
}