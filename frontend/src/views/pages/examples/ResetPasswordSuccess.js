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

import React, { useEffect } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AuthHeader from "components/Headers/AuthHeader.js";

const ResetPasswordSuccess = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.history.push("/auth/login");
    }, 5000);
  }, []);

  return (
    <>
      <AuthHeader
        title="Welcome!"
        lead="Use these awesome forms to login or create new account in your project for free."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center mb-4">
                  <h1>
                    Password reset confirmed! You will be redirected to login...
                  </h1>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPasswordSuccess;
