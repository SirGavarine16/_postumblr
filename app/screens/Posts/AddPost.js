import React, { useState, useRef } from 'react'
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from './../../components/Loading';
import AddPostForm from '../../components/Posts/AddPostForm';

export default AddPost = (props) => {
    const { navigation, route } = props;
    const {setIsReloadPost} = route.params;
    const toastRef = useRef();
    const toastRefN = useRef();
    const [load, setLoad] = useState(false);

    return (
        <View>
            {<AddPostForm toastRef={toastRef} setActive={setLoad} navigation={navigation} toastRefN={toastRefN}
                setIsReloadPost={setIsReloadPost} 
            />}
            <Toast ref={toastRefN} position="center" opacity={0.8}/>
            <Toast ref={toastRef} position="center" opacity={0.8} style={styles.toastError} />
            <Loading active={load} text="uploading post..." />
        </View>
    );
}

const styles = StyleSheet.create({
    toastError: {
        backgroundColor: "red",
        padding: 10,
        width: "90%",
        alignItems: "center",
    },
});