import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import Loading from './../../components/Loading';
import UserInfo from '../../components/Account/UserInfo';
import Toast from 'react-native-easy-toast';
import MyAccountOptions from '../../components/Account/MyAccountOptions';

export default UserLogged = () => {
    const [load, setLoad] = useState(false);
    const [userData, setUserData] = useState({});
    const [reloadData, setReloadData] = useState(false);
    const toastRef = useRef();
    const toastRefN = useRef();
    const [textLoad, setTextLoad] = useState("");

    const signOut =  () => {
        setTextLoad("Signing out...");
        setLoad(true);
        firebase.auth().signOut();
        setLoad(false);
    }

    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserData(user.providerData[0]);   
        })();
        setReloadData(false);
    }, [reloadData]);

    return (
        <View style={styles.viewBody}>
            <UserInfo userData={userData} setReloadData={setReloadData} toastRef={toastRef} setTextLoad={setTextLoad} activeLoad={setLoad} />
            <MyAccountOptions userData={userData} setReloadData={setReloadData} toastRef={toastRef} toastRefN={toastRefN} />

            <Button
                titleStyle={styles.textBtn}
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainer}
                onPress={signOut} title="Sign out" />


            <Loading active={load} text={textLoad} />
            <Toast ref={toastRefN} position="center" opacity={0.8}  />
            <Toast ref={toastRef} position="center" opacity={0.8} style={styles.toastError} />
        </View>
    );
}

const styles = StyleSheet.create({
    viewBody: {
        //marginLeft: 30,
        //marginRight: 30,
        minHeight: "100%",
        backgroundColor: "#f2f2f2",
    },
    image: {
        height: 150,
        width: "100%",
        marginTop: 20,
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
        backgroundColor: "#fff", // 001a35
        marginTop: 30,
        height:"auto",
        borderRadius: 0,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#e3e3e3",
        borderBottomColor: "#e3e3e3",
        paddingBottom: 10,
        paddingTop: 10,
    },
    btn2Style: {
        backgroundColor: "#5f5e70",
        marginTop: 10,
        marginBottom: 10,
    },
    btnContainer: {
        width: "100%",
    },
    textBtn: {
        color: "#000",
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
        width: "100%",
        alignItems: "center",
    },
    toastSuccess: {
        backgroundColor: "#3dc33d",
        padding: 10,
        width: "100%",
        alignItems: "center",
    }
});