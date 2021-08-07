import './App.css';
import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Welcome from "./components/Welcome";
import Login from "./components/User/Login"
import Home from "./components/Home";
import Register from "./components/User/Register"
import Task from "./components/Task/Task"
import TaskList from "./components/Task/TaskList"

const App = () => {
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
            e.returnValue = "";
        }
        return "";
    };


    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} className={"margin-top"}>
                        <Switch>
                            <Route path="/" exact component={Welcome}/>
                            <Route path="/home" exact component={Home}/>
                            <Route path="/add" exact component={Task}/>
                            <Route path="/edit/:id" exact component={Task}/>
                            <Route path="/list" exact component={TaskList}/>


                            <Route path="/register" exact component={Register}/>
                            <Route path="/login"  exact component={Login}/>
                            <Route path="/logout" exact component={() => (
                                <Login message="User Logged Out Successfully."/>
                            )}/>

                        </Switch>


                    </Col>
                </Row>

            </Container>

        </Router>
    );
}

export default App;
