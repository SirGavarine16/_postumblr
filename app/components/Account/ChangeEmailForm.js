import React, { useState } from 'react'
import {StyleSheet,View } from 'react-native';
import {Input,Button} from 'react-native-elements';
import * as firebase from 'firebase';
import {reAuthenticate} from './../../utils/api';
import {validateEmail} from './../../utils/validation';
 
export default ChangeEmailForm = (props) => {
    const {userData:{email}} = props;
    const {setActive, setReloadData, toastRef, toastRefN} = props;
    const [newEmail,setNewEmail] = useState("");
    const [password,setPassword] = useState(null);
    const [error,setError] = useState({email:null,password:null});
    const [load,setLoad] = useState(false);
    const [hidePass,setHidePass] = useState(true);

    const updateEmail = async () => {
        setError({email:null,password:null});
        if(!newEmail || email === newEmail){
            setError({email:"A new email address is required."});
        } else {
            if(!validateEmail(newEmail)) { 
                setError({email:"Email address is not valid."});
            } else {
                if(!password || password === ''){
                    setError({password:"Password is required."})
                } else {
                    setLoad(true);
                    await reAuthenticate(password).then(async () => {
                        await firebase.auth().currentUser.updateEmail(newEmail).then(() => {
                            setLoad(false);
                            setReloadData(true);
                            toastRefN.current.show('Email updated.');
                            setActive(false);
                        }).catch(() => {
                            setLoad(false);
                            toastRef.current.show('There was a mistake.');
                        });
                    }).catch(()=> {
                        setError({password:"Password is not correct."});
                        setLoad(false);
                    });
                }
            }
        }
    }

    return ( 
        <View style={style.view}>
            <Input
                placeholder="Email Address"
                containerStyle={style.inputForm}
                defaultValue={email && email}
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                rightIcon={{
                    type:"material-community",
                    name: "at",
                    color:"#c2c2c2"
                }}
                errorMessage={error.email}
            />
            <Input
                placeholder="Password"
                containerStyle={style.inputForm}
                password={true}
                secureTextEntry={hidePass}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                rightIcon={{
                    type:"material-community",
                    name: hidePass ? "eye-off-outline" : "eye-outline",
                    color:"#c2c2c2",
                    onPress:() => setHidePass(!hidePass),

                }}
                errorMessage={error.password}
            />
            <Button 
                title="Update Email Address"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={updateEmail}
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