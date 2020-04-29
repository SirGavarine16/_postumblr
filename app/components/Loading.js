import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Overlay } from 'react-native-elements';

export default Loading = (props) => {
    return (
        <Overlay
            isVisible={props.active}
            windowBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={style.overlay}
        >
            <View style={style.view}>
                <ActivityIndicator size="large" color="#FFFFFF" />
                {props.text && props.text != '' ? <Text style={style.text}>{props.text}</Text> : null}
            </View>

        </Overlay>
    );
}

const style = StyleSheet.create({
    overlay: {
        height: 100,
        width: 200,
        backgroundColor: "#000",
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 10
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#FFFFFF",
        textTransform:"uppercase",
        marginTop:10,
    }
})