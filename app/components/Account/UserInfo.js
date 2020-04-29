import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';


export default UserInfo = (props) => {
    const { userData } = props;
    const {setReloadData} = props;
    const {toastRef} = props;
    const {anotherRef} = props;
    const {setTextLoad,activeLoad} = props;

    const _img = "https://vignette.wikia.nocookie.net/naruto/images/e/ec/Hashirama_Senju_en_un_Modo_Sabio_desconocido.png/revision/latest?cb=20150509223458&path-prefix=es";

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const permissionCamera = resultPermission.permissions.cameraRoll.status;
        if(permissionCamera === "denied"){
            toastRef.current.show('Access denied.');
        } else {
            const res = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,4],
            });

            if(res.cancelled) {
                toastRef.current.show('Operation was cancelled.');
            } else {
                uploadImage(res.uri,userData.uid).then(() => {
                    updatePhotoURL(userData.uid);
                }).catch(() => {
                    toastRef.current.show('Error uploading image.')
                });
            }
        }
    }

    const uploadImage = async (uri, imageName) => {
        setTextLoad('Updating Avatar');
        activeLoad(true);
        const response = await fetch(uri);
        const _blop = await response.blob();
        
        const ref = firebase.storage().ref().child(`avatar/${imageName}`);
        return ref.put(_blop);
    }

    const updatePhotoURL = uid => {
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL().then(async r => {
            const update = {
                photoURL: r
            }
            await firebase.auth().currentUser.updateProfile(update);
            await activeLoad(false);
            setReloadData(true);
        }).catch(() => {
            toastRef.current.show('Error getting Avatar');
        });
    }

    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="xlarge"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={{
                    uri: userData.photoURL ? userData.photoURL : _img
                }}
            />
            <View>
                <Text style={styles.displayName}>{userData.displayName ? userData.displayName : 'Anonymous'}</Text>
                <Text>{userData.email ? userData.email : 'Email address not available'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30,
    },
    userInfoAvatar: {
        marginRight: 20,
    },
    displayName:{
        fontWeight:"bold",
        fontSize:18,
    },
    
});