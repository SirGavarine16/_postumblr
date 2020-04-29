import React from 'react'
import { StyleSheet, View, Text } from 'react-native';

export default Alert = (props) => {

    if (!props.active) {
        return null;
    } else {
        return (
            <View style={styles.alert}>
                <Text style={{ color: "white" }}>{props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    alert: {
        marginTop: 10,
        marginBottom: 10,
        borderColor: "orange",
        color: "white",
        width: "100%",
        backgroundColor: "red",
        opacity: 0.8,
        padding: 5,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
});