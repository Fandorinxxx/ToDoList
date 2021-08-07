import {connect} from "react-redux";
import {Alert} from "react-bootstrap";
import authToken from "../utils/authToken";



const Home = (props) => {
    if (localStorage.jwtToken) {
        authToken(localStorage.jwtToken);
    }
    return (
        <Alert style={{ background: "#808080",color:"#fffff80"}}>
            Welcome {props.auth.username}
        </Alert>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};
export default  connect(mapStateToProps)(Home)