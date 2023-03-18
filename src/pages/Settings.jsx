import React from "react";
import { Card, CardHeader, ListGroup, ListGroupItem, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";

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
                    placeholder="First Name"
                    onChange={() => { }}
                  />
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <label htmlFor="feLastName">Last Name</label>
                  <Input
                    id="feLastName"
                    placeholder="Last Name"
                    onChange={() => { }}
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
                    placeholder="Email Address"
                    onChange={() => { }}
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
                    onChange={() => { }}
                    autoComplete="current-password"
                  />
                </Col>
              </Row>
              <FormGroup>
                <label htmlFor="feAddress">Address</label>
                <Input
                  id="feAddress"
                  placeholder="Address"
                  onChange={() => { }}
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
