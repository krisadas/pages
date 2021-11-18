import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Card,
} from "react-bootstrap";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
  useCurrentUser,
} from "../../../authentication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordErr, setPasswordErr] = useState("");
  const [user, loading, error] = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace("/home");
    }
  }, [user, loading]);

  function login() {
    clearValidate();
    let passValidate = true;
    validateEmail();
    validatePassword();
    if (emailErr !== "" || passwordErr !== "") {
      return;
    }
    signInWithEmailAndPassword(email, password).then((login_result) => {
      console.log("login_result > ", login_result);
      if (login_result.id) {
        //Success
        history.replace("/home");
      } else {
        //Fail
        if (login_result.code) {
          if (login_result.code === "auth/user-not-found") {
            setEmailErr(login_result.message);
          } else if (login_result.code === "auth/wrong-password") {
            setPasswordErr(login_result.message);
          }
        }
      }
    });
  }
  function validateEmail() {
    setEmailErr("");
    if (!email) {
      setEmailErr("Email is Required");
    } else if (!/^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email.trim())) {
      setEmailErr("Invalid Email");
    }
  }
  function validatePassword() {
    setPasswordErr("");
    if (!password) {
      setPasswordErr("Password is required");
    }
  }
  function clearValidate() {
    setEmailErr("");
    setPasswordErr("");
  }
  function togglePassword() {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }
  return (
    <>
      <Container>
        <Row className="pt-3">
          <Col sm="1" md="4"></Col>
          <Col sm="10" md="4">
            <Card>
              <Card.Body>
                <div>
                  <h1>Login</h1>
                </div>

                <Row>
                  <Form.Group className="pb-3">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupUsername">
                        <FontAwesomeIcon
                          icon={faUserAlt}
                          style={{ width: "17px" }}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        autoComplete="username"
                        aria-describedby="inputGroupUsername"
                        id="username"
                        name="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={emailErr !== "" ? true : false}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {emailErr}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="pb-3">
                    <InputGroup hasValidation>
                      <InputGroup.Text
                        id="inputGroupPassword"
                        style={{ cursor: "pointer" }}
                        onClick={() => togglePassword()}
                      >
                        <FontAwesomeIcon
                          icon={
                            passwordType === "password" ? faEyeSlash : faEye
                          }
                          style={{ width: "17px" }}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type={passwordType}
                        placeholder="Password"
                        autoComplete="current-password"
                        aria-describedby="inputGroupPassword"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={passwordErr !== "" ? true : false}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {passwordErr}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-1 d-grid gap-2">
                    <Button
                      color="primary"
                      className="px-4 btn-block"
                      onClick={() => login()}
                    >
                      Login
                    </Button>
                  </Form.Group>
                  <div className="text-center">or</div>
                  <Form.Group className="mt-1 mb-3 d-grid gap-2">
                    <Button
                      className="px-4 btn-block btn-danger"
                      onClick={signInWithGoogle}
                    >
                      Login with Google
                    </Button>
                  </Form.Group>
                </Row>
                <div>
                  <Link to="/register">Register</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="1" md="4"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
