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
import React, {useState, useRef} from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
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
import AuthHeader from "components/Headers/AuthHeader.js";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// react component used to create sweet alerts
import {register} from "network/ApiAxios";
import config from "config";

const Register = () => {
  const [focusedName, setfocusedName] = useState(false);
  const [focusedEmail, setfocusedEmail] = useState(false);
  const [focusedPassword, setfocusedPassword] = useState(false);
  const [focusedConfirmPassword, setfocusedConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("Email sent! Check it to confirm your account. ");
  const [alert, setalert] = useState(false);

  const {DEMO} = config;

  const [demo, setDemo] = useState(DEMO);

  const notificationAlertRef = useRef(null);


  const notify = (type, title, message, userID) => {
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
            {demo ?
                            <a href={config.DOMAIN_NAME + '/auth/confirm-email/' + userID}>
                                {config.DOMAIN_NAME + '/auth/confirm-email/' + userID}
                            </a> : null}
          </span>
        </div>
      ),
      type: type,
      icon: "ni ni-bell-55",
      autoDismiss: 10,
    };
    notificationAlertRef.current.notificationAlert(options);
  };

  const registerUser = async () => {
    if (!(name && email && password && confirmPassword && checkbox)) {
        setError("Make sure to fill all the inputs and agree to the privacy policy");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }
    const response = await register(name, email, password, "admin");
    const {data} = response;
    if (!data.success) {
        setError(data.msg);
        return;
    }
    console.log(config);
    if (demo) {
        setToastMessage("This is a demo, so we will not send you an email. Instead, click on this link to verify your account: ")
    }
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCheckbox(false);
    notify("success", "Success!", toastMessage, data.userID);
};

  return (
    <>
      {alert}
      <div className="rna-wrapper">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <AuthHeader
        title="Create an account"
        lead="Use these awesome forms to login or create new account in your project for free."
      />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary border-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-4">
                  <small>Sign up with</small>
                </div>
                <div className="text-center">
                  <Button
                    className="btn-neutral btn-icon mr-4"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={
                          require("assets/img/icons/common/github.svg").default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Github</span>
                  </Button>
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={
                          require("assets/img/icons/common/google.svg").default
                        }
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or sign up with credentials</small>
                </div>
                <Form role="form">
                  <FormGroup
                    className={classnames({
                      focused: focusedName,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        value={name} onChange={e => setName(e.target.value)}
                        onFocus={() => setfocusedName(true)}
                        onBlur={() => setfocusedName(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        value={email} onChange={e => setEmail(e.target.value)}
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        value={password} onChange={e => setPassword(e.target.value)}
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedConfirmPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                        onFocus={() => setfocusedConfirmPassword(true)}
                        onBlur={() => setfocusedConfirmPassword(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  {error ?
                    <div className="text-muted font-italic">
                      <small>
                        error:{" "}
                        <span className="text-red font-weight-700">{error}</span>
                      </small>
                    </div> : null }
                  <Row className="my-4">
                    <Col xs="12">
                      <div className="custom-control custom-control-alternative custom-checkbox">
                        <input
                          className="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                          checked={checkbox}
                          onChange={() => setCheckbox(!checkbox)}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheckRegister"
                        >
                          <span className="text-muted">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center">
                    <Button className="mt-4" color="info" type="button" onClick={registerUser}>
                      Create account
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
}

export default Register;
