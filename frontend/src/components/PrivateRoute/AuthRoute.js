/*!

=========================================================
* Argon Dashboard PRO React Nodejs - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react-nodejs
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim
* Coded by ProjectData

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {checkSession} from "../../network/ApiAxios";

const AuthRoute = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={(props) => (
            !(localStorage.getItem("token") && localStorage.getItem("user"))
                ? <Component {...props} />
                : <Redirect to='/admin/index'/>
        )}/>
    )
}

export default AuthRoute;