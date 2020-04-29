import React, { useState, useEffect } from 'react'
import {View,Text,StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import PostList from './../../components/Posts/PostList';


import {firebaseApp } from './../../utils/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { setPlaneDetection } from 'expo/build/AR';
import { logInWithReadPermissionsAsync } from 'expo-facebook';

const db = firebase.firestore(firebaseApp);


export default Posts = (props) => {
    const {navigation} = props;
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [startPosts, setStartPosts] = useState(null);
    const [load,setLoad] = useState(false);
    const [totalPosts, setTotalPosts] = useState(0);
    const limit = 8;
    const [isReloadPost,setIsReloadPost] = useState(false);
 
    useEffect(() => {
        firebase.auth().onAuthStateChanged(userData => {
            setUser(userData);
        });
    },[]);

    useEffect(() => {
        db.collection('posts').get().then((snap) => {
            setTotalPosts(snap.size);
        });
        (async () => {
            let resultPosts = [];
            const resultsPosts = db.collection('posts').orderBy('createdAt','desc').limit(limit);
            await resultsPosts.get().then((res) => {
                setStartPosts(res.docs[res.docs.length-1]);
                res.forEach(doc => {
                    let post = doc.data();
                    post.id = doc.id;
                    resultPosts.push(post);
                });
                setPosts(resultPosts);
            });
        })();
        setIsReloadPost(false);
    },[isReloadPost]);

    const handleLoadMore = async () =>{
        let resultPostArray = [];
        posts.length < totalPosts && setLoad(true);

        const postsDb = db.collection('posts').orderBy('createdAt','desc')
            .startAfter(startPosts.data().createdAt).limit(limit);
        
        await postsDb.get().then(res => {
            if(res.docs.length > 0){
                setStartPosts(res.docs[res.docs.length-1]);
            }else{
                setLoad(false);
            }
            res.forEach(doc => {
                let post = doc.data();
                post.id = doc.id;
                resultPostArray.push(post);
            });
            var newArray = posts.concat(resultPostArray);
            setPosts(newArray); 
        });
        
    }

    return(
        <View style={styles.viewBody}>
            <PostList posts={posts} load={load} handleLoadMore={handleLoadMore} navigation={navigation} />

            { user && <AddPostButton navigation={navigation} setIsReloadPost={setIsReloadPost} /> }
            
        </View>
    );
}

function AddPostButton (props) {
    const {navigation,setIsReloadPost} = props;

    return <ActionButton 
        buttonColor="#001a35"
        onPress={() => navigation.navigate('AddPost', { setIsReloadPost }) }
    />
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1
    }
});