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
import {useHistory} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {

    const history = useHistory();

    const check = async () => {
        const response = await checkSession();
        const {data} = response;
        if (!data.success) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            history.push("/auth/login");
        }
        return data.success;
    }

    return (
        <Route {...rest} render={(props) => (
            localStorage.getItem("token") && localStorage.getItem("user") && check()
                ? <Component {...props} />
                : <Redirect to='/auth/login'/>
        )}/>
    )
}

export default PrivateRoute;