import React from 'react';
import Navigation from './app/navigation/Navigation';
import { firebaseApp } from './app/utils/firebase';
import { YellowBox, StatusBar } from "react-native";
import {decode, encode} from 'base-64'
 
if (!global.btoa) {  global.btoa = encode }
 
if (!global.atob) { global.atob = decode }


YellowBox.ignoreWarnings(["Setting a timer"]);

export default function App() {
  return <>
    <StatusBar barStyle="light-content" backgroundColor="#000" />
    <Navigation />
  </>;
}


