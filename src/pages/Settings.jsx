import React from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";

// Firebase
import firebase from "firebase/app";
import { db } from "../firebase";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.firstName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
    const firstName = user.firstName;
  });
}

const Settings = () => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">User Settings</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feFirstName">First Name</label>
                  <Input
                    id="feFirstName"
                    placeholder="Ave"
                    onChange={() => {}}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <Input
                    id="feLastName"
                    placeholder="Last Name"
                    onChange={() => {}}
                  />
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                  <label htmlFor="feEmail">Email</label>
                  <Input
                    type="email"
                    id="feEmail"
                    placeholder={user.email}
                    onChange={() => {}}
                    autoComplete="email"
                  />
                </Col>
                {/* Password */}
                <Col md="6" className="form-group">
                  <label htmlFor="fePassword">Password</label>
                  <Input
                    type="password"
                    id="fePassword"
                    placeholder="Password"
                    onChange={() => {}}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <Input
                  id="feAddress"
                  placeholder="Address"
                  onChange={() => {}}
                />
              </FormGroup>

              <Button theme="accent">Update Account</Button>
            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

export default Settings;
