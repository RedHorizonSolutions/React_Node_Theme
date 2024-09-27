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

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {confirmRegister} from "network/ApiAxios";
import {Card, CardBody, Col} from "reactstrap";

const ConfirmEmail = props => {

    const {id} = useParams();
    const [valid, setValid] = useState(true);

    useEffect(() => {
        console.log(id);
        if (id === null) {
            console.log("aici");
            setValid(false);
        } else {
            const runAsync = async () => {
                const response = await confirmRegister(id);
                const {data} = response;
                console.log(data);
                if (!data.success) {
                    setValid(false);
                } else {
                    setTimeout(() => {
                        props.history.push('/auth/login');
                    }, 3000);
                }
            }
            runAsync();
        }
    }, [id, props.history]);

    return (
        <>
            <Col lg="6" md="8" style={{margin: "auto auto", paddingTop: 150}}>
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-center mb-4">
                            <h1>{valid ? "Email confirmed! You will be redirected to login..." : "Something went wrong!"}</h1>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
};

export default ConfirmEmail;