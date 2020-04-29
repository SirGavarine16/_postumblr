import React from 'react'
import {StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

export default Modal = (props) => {
    const {active, setActive, children } = props;

    const closeModal = () => {
        setActive(false);
    }

    return (
        <Overlay 
            isVisible={active}
            windowBackgroundColor="rgba(0,0,0,.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.modal}
            onBackdropPress={closeModal}>
            {children}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    modal:{
        height: "auto",
        width:"90%",
        backgroundColor:"#fff"
    }
})