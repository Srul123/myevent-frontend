import React from "react";
import AppBarMain from "./AppBarMain";
import AppBarLoginWithIcons from "./app-bar-login-with-Icons/AppBarLoginWithIcons";
import AppBarLoginMobile from "./AppBarLoginMobile";

import {useSelector} from "react-redux";
import useWindowDimensions from '../../../services/useWindowDimensions';


export default function Header() {
    const {width} = useWindowDimensions();

    const isLoggedIn = useSelector((state) => {
        return state.userReducer.login;
    });
    return <>
        {(() => {
            if (!isLoggedIn){
                return (
                    <AppBarMain />
                )
            } else {
                if(width > 800) {
                    return (
                        <AppBarLoginWithIcons/>
                    )
                } else {
                    return (<AppBarLoginMobile />)
                }
            }
        })()}
    </>;
}
