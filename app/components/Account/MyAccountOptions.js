import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Modal from './../Modal';

import ChangePasswordForm from './../Account/ChangePasswordForm';
import ChangeUsernameForm from './../Account/ChangeUsernameForm';
import ChangeEmailForm from './../Account/ChangeEmailForm';

export default MyAccountOptions = (props) => {
    const [active, setActive] = useState(false);
    const [childs, setChilds] = useState(null);
    const {userData,setReloadData,toastRef,toastRefN} = props;
    

    const menuOptions = [
        {
            title: "Change Username",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("username"),
        }, {
            title: "Change Email Address",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("email"),
        }, {
            title: "Change Password",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("password"),
        },
    ];

    const selectedComponent = (key) => {
        switch(key) {
            case "username":
                setChilds(<ChangeUsernameForm userData={userData} toastRef={toastRef} toastRefN={toastRefN} setActive={setActive} setReloadData={setReloadData} />);
                setActive(true);
                break;
            case "email":
                setChilds(<ChangeEmailForm userData={userData} toastRef={toastRef} toastRefN={toastRefN} setActive={setActive} setReloadData={setReloadData} />);
                setActive(true);
                break;
            case "password":
                setChilds(<ChangePasswordForm userData={userData} toastRef={toastRef} toastRefN={toastRefN} setActive={setActive} setReloadData={setReloadData} />);
                setActive(true);
                break;
            default:
                setActive(false);
                break;
        }
    }

    return (
        <View>
            {
                menuOptions.map((option, index) => {
                    return (
                        <ListItem
                            key={index}
                            title={option.title}
                            leftIcon={{
                                type: option.iconType,
                                name: option.iconNameLeft,
                                color: option.iconColorLeft,
                            }}
                            rightIcon={{
                                type: option.iconType,
                                name: option.iconNameRight,
                                color: option.iconColorRight,
                            }}
                            onPress={option.onPress}
                            containerStyle={styles.optionContainer}
                        />

                    );
                })}
            { childs && (   <Modal active={active} setActive={setActive}>{childs}</Modal>  )}
        </View>
    );
}

const styles = StyleSheet.create({
    optionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
    }
});