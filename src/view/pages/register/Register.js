import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
  useCurrentUser,
} from "../../../authentication";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUserAlt,
  faAt,
} from "@fortawesome/free-solid-svg-icons";
const Register = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [user, loading] = useCurrentUser();
  const history = useHistory();

  useEffect(() => {
    if (user) history.replace("/");
  }, [user, loading]);

  function togglePassword() {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  }
  function toggleConfirmPassword() {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
    } else {
      setConfirmPasswordType("password");
    }
  }
  function createAccount() {
    console.log("createAccount");
    clearValidate();
    let passValidate = true;
    if (!name) {
      setNameErr("Name is required.");
      passValidate = false;
    }
    if (!email) {
      setEmailErr("Email is required");
      passValidate = false;
    }
    if (!password) {
      setPasswordErr("Password is required");
      passValidate = false;
    } else if (password.trim().length < 8) {
      setPasswordErr("Password must be 8 charactors or more.");
      passValidate = false;
    }
    if (!confirmPassword) {
      setConfirmPasswordErr("Confirm Password is required.");
      passValidate = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordErr("Password is not matched.");
      passValidate = false;
    }
    if (!passValidate) {
      return;
    }
    registerWithEmailAndPassword(name, email, password).then((login_result) => {
      console.log("login_result > ", login_result);
      if (login_result.user) {
      } else {
        if (login_result.code === "auth/email-already-in-use") {
          setPasswordErr(login_result.message);
        }
      }
    });
  }

  function clearValidate() {
    setNameErr("");
    setEmailErr("");
    setPasswordErr("");
    setConfirmPasswordErr("");
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
                  <h1>Register</h1>
                </div>
                <Row>
                  <Form.Group className="pb-3">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupName">
                        <FontAwesomeIcon
                          icon={faUserAlt}
                          style={{ width: "17px" }}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        aria-describedby="inputGroupName"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={nameErr !== "" ? true : false}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {nameErr}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="pb-3">
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupEmail">
                        <FontAwesomeIcon
                          icon={faAt}
                          style={{ width: "17px" }}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        aria-describedby="inputGroupEmail"
                        id="email"
                        name="email"
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
                  <Form.Group className="pb-3">
                    <InputGroup hasValidation>
                      <InputGroup.Text
                        id="inputGroupConfirmPassword"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleConfirmPassword()}
                      >
                        <FontAwesomeIcon
                          icon={
                            confirmPasswordType === "password"
                              ? faEyeSlash
                              : faEye
                          }
                          style={{ width: "17px" }}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        type={confirmPasswordType}
                        placeholder="Confirm Password"
                        aria-describedby="inputGroupConfirmPassword"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        isInvalid={confirmPasswordErr !== "" ? true : false}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {confirmPasswordErr}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-3 d-grid gap-2">
                    <Button
                      variant="primary"
                      className="px-4 btn-block"
                      onClick={() => createAccount()}
                    >
                      Create Account
                    </Button>
                    <div className="text-center">or</div>
                    <Button
                      variant="danger"
                      className="px-4 btn-block"
                      onClick={() => signInWithGoogle()}
                    >
                      Signup with Google
                    </Button>
                  </Form.Group>
                </Row>
                <div>
                  <Link to="/">Back to Login Page</Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
