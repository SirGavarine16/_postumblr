import React, { useState } from 'react'
import {StyleSheet,View } from 'react-native';
import {Input,Button} from 'react-native-elements';
import * as firebase from 'firebase';

export default ChangeUsernameForm = (props) => {
    const {userData:{displayName}} = props;
    const {setActive, setReloadData, toastRef, toastRefN} = props;
    const [newUsername,setNewUsername] = useState(null);
    const [error,setError] = useState(null);
    const [load,setLoad] = useState(false);

    const updateUsername = async () => {
        setError(null);
        if(!newUsername) {
            setError('New Username is required.');
        } else {
            setLoad(true);
            const update = {
                displayName: newUsername,
            }
            await firebase.auth().currentUser.updateProfile(update).then(() => {
                setLoad(false);
                setReloadData(true);
                toastRefN.current.show('Username updated.')
                setActive(false);
            }).catch(() => {
                setLoad(false);
                toastRef.current.show('Error updating username.');
                setActive(false);
            });
        }
    }

    return (
        <View style={style.view}>
            <Input
                placeholder="Username"
                containerStyle={style.inputForm}
                defaultValue={displayName && displayName}
                onChange={(e) => setNewUsername(e.nativeEvent.text)}
                rightIcon={{
                    type:"material-community",
                    name: "account-circle-outline",
                    color:"#c2c2c2"
                }}
                errorMessage={error}
            />
            <Button 
                title="Update Username"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={updateUsername}
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