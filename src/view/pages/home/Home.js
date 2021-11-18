import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { logout, useCurrentUser } from "../../../authentication";
import { Container, Row, Col, Card } from "react-bootstrap";
const Home = () => {
  const [user, loading, error] = useCurrentUser();
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserName();
  }, [user, loading]);
  const fetchUserName = async () => {
    try {
      const token = user.Aa;
      console.log("token > ", token);
      const headers = {
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        "Access-Control-Allow-Origin": "*",
        token: token,
      };
      await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET",
        headers: headers,
      }).then(handleResponse);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if (response.status === 401) {
          console.log("Error 401 Unauthorized Access!!!");
        }
        const error = (data && data.message) || response.statusText;
        console.log(data);
        return Promise.reject(error);
      }
      console.log(data);
      setUserId(data.user_id);
      setEmail(data.firebase.identities.email[0]);
      return data;
    });
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
                  <h1>Home</h1>
                  <p>You're Logged in.</p>
                  <p>Email: {email}</p>
                  <p>UserId: {userId}</p>
                </div>

                <Row>
                  <button className="btn btn-primary" onClick={logout}>
                    Logout
                  </button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="1" md="4"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
