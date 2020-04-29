import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import * as firebase from 'firebase';

export default PostList = (props) => {
    const { posts, load, handleLoadMore, navigation } = props;


    return (
        <View>
            {posts.length >0 ? (
                <FlatList data={posts} renderItem={post => <Post post={post} navigation={navigation}  />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={<FooterList load={load} />}
                />
            ) : <View style={styles.loaderPosts}>
                    <ActivityIndicator size="large" color="#001a35" />
                    <Text>Loading posts</Text>
                </View>}
        </View>
    );
}

Post = (props) => {
    const { post,navigation } = props;
    const { title, description, images, address } = post.item;
    const [imagePost, setImagePost] = useState(null);

    useEffect(() => {
        const image = images[0];
        firebase.storage().ref(`posts-images/${image}`).getDownloadURL().then(res => {
            setImagePost(res);
        });
    });


    return (
        <TouchableOpacity 
        //onPress={ () => navigation.navigate('Post',{post,postName:title}) }  
         >
            <View style={styles.viewPost}          >
                <View style={styles.viewImagePost}>
                    <Image source={{ uri: imagePost }} resizeMode="cover" 
                        style={styles.imagePost} PlaceholderContent={<ActivityIndicator color="#001a35" />} />
                </View>
                <View >
                    <Text style={styles.postTitle}>{title}</Text>
                    <Text style={styles.postAddress}>{address}</Text>
                    <Text style={styles.postDesc}>{description.substr(0,60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

FooterList = (props) => {
    const {load} = props;

    if(load){
        return (
            <View style={styles.loadPosts}>
                <ActivityIndicator size="large"/>
            </View>
        );
    } else {
        return (
            <View style={styles.notFoundPosts}>
                <Text>There are no posts left to load.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loadPosts: {
        marginTop: 20,
        alignItems: "center",
    },
    viewPost: {
        flexDirection: "row",
        margin: 10,
    },
    viewImagePost: {
        marginRight: 15,
    },
    imagePost: {
        width: 80,
        height: 80,
    },
    postTitle: {
        fontWeight: "bold",
    },
    postAddress: {
        paddingTop: 2,
        color: "grey",
    },
    postDesc: {
        paddingTop: 2, color: "grey", width: 250,
    },
    loaderPosts:{
        marginTop:10,
        marginBottom:10,
        alignItems:"center",
    },  
    notFoundPosts:{
        marginTop:10,
        marginBottom:20,
        alignItems:"center",
    }
});