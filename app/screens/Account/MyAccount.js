import React, { useState, useEffect } from 'react'
import * as firebase from 'firebase';
import Loading from './../../components/Loading';

import UserLogged from './UserLogged';
import AnonymousUser from './AnonymousUser';

export default MyAccount = (props) => {
    const [login, setLogin] = useState(null);


    useEffect( () => {
        ( async () => await firebase.auth().onAuthStateChanged(user => {
            !user ? setLogin(false) : setLogin(true);
        }))();
    }, [login]);


    if (login === null) {
        return <Loading active={true} text="loading..." />;
    } else {
        if (login){
            return <UserLogged /> ;
        } else {
            return <AnonymousUser props={props} /> ;
        }
        /*return (
            login ? <UserLogged /> : <AnonymousUser props={props} />
        );*/
    }


}