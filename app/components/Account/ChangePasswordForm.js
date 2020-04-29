import React, { useState } from 'react'
import {StyleSheet,View } from 'react-native';
import {Input,Button} from 'react-native-elements';
import * as firebase from 'firebase';
import {reAuthenticate} from './../../utils/api';

export default ChangePasswordForm = (props) => {
    const {userData:{email}} = props;
    const {setActive, setReloadData, toastRef, toastRefN} = props;
    const [newPassword,setNewPassword] = useState(null);
    const [repeatNewPassword,setRepeatNewPassword] = useState(null);
    const [password,setPassword] = useState("");
    const [error,setError] = useState({current:null,newPassword:null,repeatNewPassword:null});
    const [load,setLoad] = useState(false);
    const [hidePass,setHidePass] = useState({current:true,newPassword:true,repeatNewPassword:true});


    const updatePassword = async () => {
        setError({current:null,newPassword:null,repeatNewPassword:null});
        if (!password || !newPassword || !repeatNewPassword){
            let e = {};
            let message = "All fields are required.";
            !password && (e.current = message);
            !newPassword && (e.newPassword = message);
            !repeatNewPassword && (e.repeatNewPassword = message);
            setError(e);
        } else {
            if ( newPassword !== repeatNewPassword ) {
                setError({
                    newPassword:"Passwords do not match.", repeatNewPassword:"Passwords do not match.",
                });
            } else {
                setLoad(true);
                await reAuthenticate(password).then( async () => {
                    await firebase.auth().currentUser.updatePassword(newPassword).then( () => {
                        setLoad(false);
                        setActive(false);
                        toastRefN.current.show('Password updated.');
                        firebase.auth().signOut()
                    }).catch(() => {
                        setLoad(false);
                        setActive(false);
                        toastRef.current.show("Error updating new Password");
                    });
                }).catch(() => {
                    setError({current:"Password is not correct."});
                    setLoad(false);
                });
            }
        }
    }

    return(
        <View style={style.view}>
            <Input
                placeholder="Current password"
                containerStyle={style.inputForm}
                password={true}
                secureTextEntry={hidePass.current}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                rightIcon={{
                    type:"material-community",
                    name: hidePass.current ? "eye-off-outline" : "eye-outline",
                    color:"#c2c2c2",
                    onPress:() => setHidePass({ current:!hidePass.current,newPassword:hidePass.newPassword,repeatNewPassword:hidePass.repeatNewPassword}),
                }}
                errorMessage={error.current}
            />
            <Input
                placeholder="New Password"
                containerStyle={style.inputForm}
                password={true}
                secureTextEntry={hidePass.newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                rightIcon={{
                    type:"material-community",
                    name: hidePass.newPassword ? "eye-off-outline" : "eye-outline",
                    color:"#c2c2c2",
                    onPress:() => setHidePass({ current:hidePass.current,newPassword:!hidePass.newPassword,repeatNewPassword:hidePass.repeatNewPassword}),
                }}
                errorMessage={error.newPassword}
            />
            <Input
                placeholder="Repeat New Password"
                containerStyle={style.inputForm}
                password={true}
                secureTextEntry={hidePass.repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.nativeEvent.text)}
                rightIcon={{
                    type:"material-community",
                    name: hidePass.repeatNewPassword ? "eye-off-outline" : "eye-outline",
                    color:"#c2c2c2",
                    onPress:() => setHidePass({ current:hidePass.current,newPassword:hidePass.newPassword,repeatNewPassword:!hidePass.repeatNewPassword}),
                }}
                errorMessage={error.repeatNewPassword}
            />
            <Button 
                title="Update Password"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={updatePassword}
                loading={load}
            />
        </View>
    );
}

const style = StyleSheet.create({
    view:{
        alignItems:"center",
        paddingTop:10,
        paddingBottom:10,
    },
    inputForm:{
        marginBottom:10,
        
    },
    btnContainer:{
        marginTop:20,
        width:"95%"
    },
    btn:{
        backgroundColor:"#001a35",

    }
});