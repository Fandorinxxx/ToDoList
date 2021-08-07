import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUndo, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {registerUser} from "../../services/index";
import MyToast from "../MyToast";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.message = "";
    }

    initialState = {
        email: "",
        password: "",
    }
    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    registerUser = () => {
        let userObject = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.registerUser(userObject);
        this.resetRegisterForm();
        setTimeout(() => {
            if (this.props.user.message != null) {
                this.setState({show: true, message: this.props.user.message});
                setTimeout(() => {
                    this.setState({show: false});
                    this.props.history.push("/login");
                }, 2000);
            } else {
                this.setState({"error": "This email is busy"});
                this.setState({show: false});
            }
        }, 2000);

    };

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const { email, password, error} = this.state;

        return (
            <div>
                <div style={{display: this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={this.state.message}
                             type={"success"}
                    />
                </div>
                <Row className="justify-content-around">
                    <Col xs={5}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Card className={"border border-dark bg-dark text-white"}>
                            <Card.Header>
                                <FontAwesomeIcon icon={faUserPlus}/> Register
                            </Card.Header>
                            <Card.Body>
                                  <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <InputGroup>

                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope}/>
                                            </InputGroup.Text>

                                            <FormControl
                                                required
                                                autoComplete="off"
                                                type="text"
                                                name="email"
                                                value={email}
                                                onChange={this.userChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Email Address"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <InputGroup>

                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faLock}/>
                                            </InputGroup.Text>

                                            <FormControl
                                                required
                                                autoComplete="off"
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={this.userChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Password"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>

                            </Card.Body>
                            <Card.Footer style={{textAlign: "right"}}>
                                <Button
                                    size="sm"
                                    type="button"
                                    variant="success"
                                    onClick={this.registerUser}
                                    disabled={
                                        this.state.email.length === 0 ||
                                        this.state.password.length === 0
                                    }
                                >
                                    <FontAwesomeIcon icon={faUserPlus}/> Register
                                </Button>{" "}
                                <Button
                                    size="sm"
                                    type="button"
                                    variant="info"
                                    onClick={this.resetRegisterForm}
                                >
                                    <FontAwesomeIcon icon={faUndo}/> Reset
                                </Button>
                            </Card.Footer>
                        </Card>

                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (userObject) => dispatch(registerUser(userObject)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);


