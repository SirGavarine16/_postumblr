import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { StyleSheet } from 'react-native';

import MyAccount from './../screens/Account/MyAccount';
import Posts from '../screens/Posts';
import TopPosts from './../screens/TopPosts';
import Search from './../screens/Search';
import Login from './../screens/Account/Login';
import CreateAccount from '../screens/Account/CreateAccount';
import RecoverAccount from '../screens/Account/RecoverAccount';
import AddPost from '../screens/Posts/AddPost';
import Post from '../screens/Posts/Post';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const PostStack = createStackNavigator();
PostsStack = () => {
    return (
        <PostStack.Navigator>
            <PostStack.Screen name="Posts" component={Posts} options={tabOption('Posts')} />
            <PostStack.Screen name="AddPost" component={AddPost} options={tabOption('New Post')} />
            <PostStack.Screen name="Post" component={Post} options={({route}) => tabOption(route.params.postName)} />
        </PostStack.Navigator>
    );
}

TopPostsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Top Posts" component={TopPosts}
                options={{
                    headerStyle: {
                        backgroundColor: '#001a35',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
}

SearchStack = () => {
    return (<Stack.Navigator >
        <Stack.Screen name="Search" component={Search}
            options={{
                headerStyle: {
                    backgroundColor: '#001a35',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        />
    </Stack.Navigator>);
}

const AccountStack = createStackNavigator();
MyAccountStack = () => {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen name="My Account" component={MyAccount}
                options={{
                    headerStyle: {
                        backgroundColor: '#001a35',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <AccountStack.Screen name="Log into your account" component={Login}
                options={{
                    headerStyle: {
                        backgroundColor: '#001a35',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <AccountStack.Screen name="Create new account" component={CreateAccount}
                options={{
                    headerStyle: {
                        backgroundColor: '#001a35',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <AccountStack.Screen name="Recover account" component={RecoverAccount}
                options={{
                    headerStyle: {
                        backgroundColor: '#001a35',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </AccountStack.Navigator>
    );
}
export default Navigation = () => {
    return (
        <NavigationContainer >
            <Tab.Navigator initialRouteName="Posts" tabBarOptions={{ tabStyle: _style.bgC, activeTintColor: "#fff", keyboardHidesTabBar: true, }}>
                <Tab.Screen
                    name="Posts"
                    component={PostsStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),

                    }} />

                <Tab.Screen
                    name="Top Posts"
                    component={TopPostsStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="star" color={color} size={size} />
                        )
                    }} />
                <Tab.Screen
                    name="Search"
                    component={SearchStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="magnify" color={color} size={size} />
                        )
                    }} />
                <Tab.Screen
                    name="My Account"
                    component={MyAccountStack}

                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size} />
                        )
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const _style = StyleSheet.create({
    bgC: {
        backgroundColor: "#000000",
    },
    r: {
        backgroundColor: "red",
    },
    cW: {
        backgroundColor: "#fff"
    }
})

tabOption = (title) => {
    return {
        title: title,
        headerStyle: {
            backgroundColor: '#001a35',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
};