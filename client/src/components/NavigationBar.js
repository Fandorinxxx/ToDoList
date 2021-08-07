import {connect} from "react-redux";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



import {logoutUser} from "../services/index";
import {
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavigationBar = (props) => {
    const logout = () => {
        props.logoutUser();
    };

    const guestLinks = (
        <>
            <div className="me-auto"> </div>
            <Nav className="navbar-right"  >
                <Link to={"register"} className="nav-link">
                    <FontAwesomeIcon icon={faUserPlus}/> Register </Link>
                <Link to={"login"} className="nav-link">
                    <FontAwesomeIcon icon={faSignInAlt}/> Login </Link>
            </Nav>
        </>


    );
    const userLinks = (
        <>
            <Nav className="me-auto">
                <Link to={"add"} className="nav-link"> Add ToDo </Link>
                <Link to={"list"} className="nav-link">List Todo </Link>
            </Nav>
            <Nav className="navbar-right">
                <Link to={""} className="nav-link" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                </Link>
            </Nav>
        </>
    );


    return (
        <Navbar bg="dark" variant="dark">
            <Link to={props.auth.isLoggedIn ? "home" : ""} className="navbar-brand">
                <img src="/images/todo-manager-icon.png"
                     width="25" height="25" alt="brand"/> {" "} To Do
            </Link>
            {props.auth.isLoggedIn ? userLinks : guestLinks}
        </Navbar>
    );


};
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);