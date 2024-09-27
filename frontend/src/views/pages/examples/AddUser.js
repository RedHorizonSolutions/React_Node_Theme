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

import React from "react";

// nodejs library that concatenates classes
import classnames from "classnames";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";
import NotificationAlert from "react-notification-alert";
import { register } from "network/ApiAxios";
import Select2 from "react-select2-wrapper";

const AddUser = props => {
  const [nameFocus, setNameFocus] = React.useState(false);
  const [emailAddressFocus, setemailAddressFocus] = React.useState(false);
  const [passwordFocus, setpasswordFocus] = React.useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);

  const [toastMessage, setToastMessage] = React.useState(
    "Email sent! Check it to confirm your account. "
  );

  const [name, setName] = React.useState("");
  const [emailAddress, setemailAddress] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [role, setRole] = React.useState("member");

  const notificationAlertRef = React.useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    if (user) {
      const {userType} = user;
      if (userType != "admin") props.history.push("/admin/dashboard");
    }
  }, []);

  const notify = (type, title, message) => {
    let options = {
      place: "tc",
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            {title}
          </span>
          <span data-notify="message">{message}</span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 10,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const registerUser = async () => {
    if (!(name && emailAddress && password && confirmPassword)) {
      setError(
        "Make sure to fill all the inputs and agree to the privacy policy"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const response = await register(name, emailAddress, password, role);
    const { data } = response;
    if (!data.success) {
      setError(data.msg);
      return;
    }
    setError("");
    setName("");
    setemailAddress("");
    setpassword("");
    setConfirmPassword("");
    notify("success", "Success!", toastMessage);
  };

  return (
    <>
      {alert}
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <SimpleHeader name="Add user" parentName="Add user" />
      <Container className="mt--6" fluid>
        <Row>
          <Col lg="12">
            <div className="card-wrapper">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Register a new user</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <InputGroup
                            className={classnames("input-group-merge", {
                              focused: nameFocus,
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-user" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Name"
                              type="text"
                              onFocus={(e) => setNameFocus(true)}
                              onBlur={(e) => setNameFocus(false)}
                              onChange={(e) => setName(e.target.value)}
                              value={name}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <InputGroup
                            className={classnames("input-group-merge", {
                              focused: emailAddressFocus,
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="fas fa-envelope" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Email address"
                              type="email"
                              onFocus={(e) => setemailAddressFocus(true)}
                              onBlur={(e) => setemailAddressFocus(false)}
                              onChange={(e) => setemailAddress(e.target.value)}
                              value={emailAddress}
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                      <FormGroup>
                          <Select2
                            className="form-control"
                            defaultValue="1"
                            options={{
                              placeholder: "Select",
                            }}
                            data={[
                              { id: "admin", text: "admin" },
                              { id: "creator", text: "creator" },
                              { id: "member", text: "member" },
                            ]}
                            value={role}
                            onSelect={e => setRole(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                      <FormGroup>
                          <InputGroup
                            className={classnames("input-group-merge", {
                              focused: passwordFocus,
                            })}
                          >
                            <Input
                              placeholder="Password"
                              type="password"
                              onFocus={(e) => setpasswordFocus(true)}
                              onBlur={(e) => setpasswordFocus(false)}
                              onChange={(e) =>
                                setpassword(e.target.value)
                              }
                              value={password}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <i className="fas fa-eye" />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <InputGroup
                            className={classnames("input-group-merge", {
                              focused: confirmPasswordFocus,
                            })}
                          >
                            <Input
                              placeholder="Confirm Password"
                              type="password"
                              onFocus={(e) => setConfirmPasswordFocus(true)}
                              onBlur={(e) => setConfirmPasswordFocus(false)}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              value={confirmPassword}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <i className="fas fa-eye" />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
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
                    <div className="text-muted">
                      <Button
                        className="mt-4"
                        color="info"
                        type="button"
                        onClick={registerUser}
                      >
                        Create account
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddUser;
