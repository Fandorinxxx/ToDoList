import React, {Component} from "react";
import {connect} from "react-redux";
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignInAlt, faEnvelope, faLock, faUndo} from "@fortawesome/free-solid-svg-icons";
import {authenticateUser} from "../../services/index";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        email: "",
        password: "",
        error: "",

    };
    credentialChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    validateUser = () => {
        this.props.authenticateUser(this.state.email, this.state.password);
        setTimeout(() => {
            if (this.props.auth.isLoggedIn) {
                this.setState({error:""});
                return this.props.history.push("/home");
            } else {
                this.resetLoginForm();
                this.setState({"error": "Invalid email and password"});
            }
        }, 1000);
    }
    resetLoginForm = () => {
        this.setState(() => this.initialState);
    }

    render() {
        const {email, password, error} = this.state;
        return (
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    {this.props.message && <Alert variant="success">{this.props.message} </Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-3" >
                                <Form.Group as={Col} >
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faEnvelope}/>
                                        </InputGroup.Text>
                                        <FormControl required autoComplete="off" type="text" name="email" value={email}
                                                     onChange={this.credentialChange}
                                                     className={"bg-dark text-white"} placeholder="Enter Email Address"/>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                        <FormControl required autoComplete="off" type="password" name="password"
                                                     value={password} onChange={this.credentialChange}
                                                     className={"bg-dark text-white"} placeholder="Enter Password"/>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" type="button" variant="success" onClick={this.validateUser}
                                    disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Login
                            </Button>{' '}
                            <Button size="sm" type="button" variant="info" onClick={this.resetLoginForm}
                                    disabled={this.state.email.length === 0 && this.state.password.length === 0 &&
                                    this.state.error.length === 0}>
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>

                        </Card.Footer>

                    </Card>

                </Col>

            </Row>
        );

    }


}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};
const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login)
