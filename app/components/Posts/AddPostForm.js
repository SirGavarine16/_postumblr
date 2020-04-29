import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import MapView from "react-native-maps";
import Modal from "./../Modal";
import * as Location from 'expo-location';

import { firebaseApp } from './../../utils/firebase';
import firebase from 'firebase/app';
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const widthScreen = Dimensions.get("window").width;
var uuid = require('random-uuid-v4');


export default AddPostForm = (props) => {
    const { setActive, toastRef, navigation, toastRefN, setIsReloadPost } = props;
    const [imagesSelected, setImagesSelected] = useState([]);
    const [form, setForm] = useState({});
    const [isMapActive, setMapActive] = useState(false);
    const [location, setLocation] = useState(null);

    const submit = () => {

        if (!form.title || !form.address || !form.description) {
            toastRef.current.show('All fields are required.');
        } else if (imagesSelected.length === 0) {
            toastRef.current.show('Post must have at least 1 photo.', 500);
        } else if (!location) {
            toastRef.current.show('Location of the place is required.');
        } else {
            setActive(true);
            uploadImagesToStorage(imagesSelected).then(arrayImages => {
                let post = {
                    title: form.title,
                    address: form.address,
                    description: form.description,
                    location: location,
                    images: arrayImages,
                    rating: 0,
                    ratingTotal: 0,
                    totalVoting: 0,
                    createdAt: new Date(),
                    createdBy: firebaseApp.auth().currentUser.uid,
                };
                db.collection('posts').add(post).then(() => {
                    setActive(false);
                    setIsReloadPost(true);
                    navigation.navigate('Posts'); 
                }).catch(e => {
                    setActive(false);
                    console.log(e);
                    toastRef.current.show('Something went wrong, try again later...');
                    
                });


            });
        }
    }

    const uploadImagesToStorage = async (imageArray) => {
        const imagesBlob = [];
        await Promise.all(
            imageArray.map(async image => {
                let _uuid = uuid();
                const response = await fetch(image);
                const blob = await response.blob();
                const ref = firebase.storage().ref('posts-images').child(_uuid);
                await ref.put(blob).then(res => {
                    imagesBlob.push(res.metadata.name);
                });
            })
        );
        return imagesBlob;
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <FeaturedImage image={imagesSelected[0]} />
            <PostForm form={form} setForm={setForm} setMapActive={setMapActive} location={location} />
            <UploadImage imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} toastRef={toastRef} />
            <Button title="Upload Post" onPress={submit} buttonStyle={styles.addPostBtn} />
            {isMapActive && <Map isMapActive={isMapActive} setMapActive={setMapActive} setLocation={setLocation} toastRef={toastRef} toastRefN={toastRefN} />}

        </ScrollView>
    );
}

function Map(props) {
    const { isMapActive, setMapActive, setLocation, toastRef, toastRefN } = props;
    const [_location, _setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let resultPermission = await Permissions.askAsync(Permissions.LOCATION);
            const statusPermission = resultPermission.permissions.location.status;

            if (statusPermission !== 'granted') {
                toastRef.current.show('You need to enable access to your location to continue.');
            } else {
                const loc = await Location.getCurrentPositionAsync({});
                _setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                });
            }
        })()
    }, []);

    const saveLocation = () => {
        setLocation(_location);
        toastRefN.current.show('Location has been saved successfully.');
        setMapActive(false);
    }

    return (
        <Modal active={isMapActive} setActive={setMapActive}>
            <View>
                {_location && (
                    <MapView style={styles.mapStyle} initialRegion={_location} showsUserLocation={true}
                        onRegionChange={region => _setLocation(region)}  >
                        <MapView.Marker
                            coordinate={{
                                latitude: _location.latitude,
                                longitude: _location.longitude
                            }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={styles.viewMapBtn} >
                    <Button
                        title="Save Location"
                        onPress={saveLocation}
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                    />
                    <Button
                        title="Cancel Location"
                        onPress={() => setMapActive(false)}
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                    />
                </View>
            </View>
        </Modal>
    );
}

PostForm = (props) => {
    const { form, setForm, setMapActive, location } = props;


    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Title"
                containerStyle={styles.input}
                onChange={(e) => setForm({ ...form, title: e.nativeEvent.text })}
            />
            <Input
                placeholder="Address"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community", name: "google-maps", color: location ? "#0000a0" : "#c2c2c2",
                    onPress: () => setMapActive(true),
                }}
                onChange={(e) => setForm({ ...form, address: e.nativeEvent.text })}
            />
            <Input
                placeholder="Description"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={(e) => setForm({ ...form, description: e.nativeEvent.text })}
            />
        </View>
    );
}

FeaturedImage = (props) => {
    const { image } = props;

    return (
        <View style={styles.viewFeatured} >
            {image ?
                <Image
                    source={{ uri: image }}
                    style={{ width: widthScreen, height: 200 }}
                /> : <Image
                    source={require('./../../../assets/img/no-image.png')}
                    style={{ width: widthScreen, height: 200 }}
                />}
        </View>
    );
}

UploadImage = (props) => {
    const { imagesSelected, setImagesSelected, toastRef } = props;

    const removeImage = image => {
        const arrayImages = imagesSelected;

        Alert.alert("Remove photo", "Are you sure you want to remove the selected image?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    onPress: () => setImagesSelected(arrayImages.filter(imageURL => imageURL !== image))
                }
            ],
            { cancelable: false });
    }

    const imageSelect = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const permissionCamera = resultPermission.permissions.cameraRoll.status;
        if (permissionCamera === "denied") {
            toastRef.current.show('Access was denied.');
        } else {
            const res = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 4],
            });

            if (res.cancelled) {
                toastRef.current.show('Operation was cancelled.');
            } else {
                setImagesSelected([...imagesSelected, res.uri]);
            }
        }
    }

    return (
        <View style={styles.viewImages}>
            {/*     ICONO PARA SUBIR IMAGENES     */}

            {imagesSelected.length < 4 &&
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />}

            {imagesSelected.map((image, index) => {
                return <Avatar
                    key={index}
                    onPress={() => removeImage(image)}
                    style={styles.miniatureStyle}
                    source={{ uri: image }}
                />
            })}


        </View>
    );
}

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
        marginBottom: 30,
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    viewFeatured: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        marginBottom: 10,
    },
    textArea: {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0,
    },
    mapStyle: {
        width: "100%",
        height: 550,

    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    viewMapBtnContainerSave: {
        paddingRight: 5,
    },
    viewMapBtnSave: {
        backgroundColor: "#001a35"
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5,
    },
    viewMapBtnCancel: {
        backgroundColor: "#a60d0d",
    },
    addPostBtn: {
        backgroundColor: "#001a35",
        margin: 20,
    }
}); 