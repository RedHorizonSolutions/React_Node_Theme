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
import React, { useState, useRef } from "react";

// reactstrap components
import {
  Button,
  Container,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Row,
} from "reactstrap";
import { forgotPassword } from "network/ApiAxios";
import AuthHeader from "components/Headers/AuthHeader.js";
import NotificationAlert from "react-notification-alert";
import config from "config";

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    "Email sent! Check it to reset your password."
  );
  const [userID, setUserID] = useState(null);

  const notificationAlertRef = useRef(null);


  const notify = (type, title, message) => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            {title}
          </span>
          <span data-notify="message">
            {message}
          </span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 10,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const sendEmail = async () => {
    if (email === "admin@argon.com") {
      setError("Can't reset password for test user!");
      return;
    }
    const response = await forgotPassword(email);
    const { data } = response;
    if (data.success) {
      console.log(data);
    //   if (config.DEMO) {
    //     setToastMessage(
    //       "This is a demo, so we will not send you an email. Instead, click on this link to reset your password:"
    //     );
    //     setUserID(data.userID);
    //   }
      notify("success", "Success!", toastMessage);
      setEmail("");
    } else {
      setError(data.errors[0].msg);
    }
  };

  return (
    <>
      {alert}
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <AuthHeader
        title="Welcome!"
        lead="Use these awesome forms to login or create new account in your project for free."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardBody className="px-lg-5 py-lg-5">
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  {error ? (
                    <div className="text-muted font-italic">
                      <small>
                        error:{" "}
                        <span className="text-red font-weight-700">
                          {error}
                        </span>
                      </small>
                    </div>
                  ) : null}
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="primary"
                      type="button"
                      onClick={sendEmail}
                    >
                      Reset Password
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
