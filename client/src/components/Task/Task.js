import React, {Component} from "react";
import {connect} from "react-redux";
import {saveTask, fetchTask, updateTask} from "../../services/task/taskAction";
import {Card, Form, Button, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faPlusSquare, faUndo, faList, faEdit} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {show: false, enabledTask: false, description: ""};
    }

    initialState = {
        id: "",
        userid: "",
        description: "",
        date: "",
        enabledTask: false,
    };

    componentDidMount() {
        const taskId = +this.props.match.params.id;
        if (taskId) {
            this.findTaskById(taskId);
        }
    }

    findTaskById = (taskId) => {
        this.props.fetchTask(taskId);
        setTimeout(() => {
            let task = this.props.taskObject.task;
            if (task != null) {
                this.setState({
                    id: task.id,
                    userid: task.userid,
                    date: task.date,
                    description: task.description,
                    enabledTask: task.enabledTask,
                });
            }
        }, 1000)
    };

    resetTask = () => {
        this.setState(() => this.initialState);
    }

    submitTask = (event) => {
        event.preventDefault();
        const task = {
            description: this.state.description,
            enabledTask: this.state.enabledTask,
            id: localStorage.getItem("id"),
        };
        this.props.saveTask(task);
        setTimeout(() => {
            if (this.props.taskObject.task != null) {
                this.setState({show: true, method: "post"});
                setTimeout(() => {
                    this.setState({show: false})
                }, 3000);
            } else {
                this.setState({show: false});
            }
        }, 2000);
        this.setState(this.initialState);

    }
    updateTsk = (event) => {
        event.preventDefault();
        const task = {
            id: this.state.id,
            userid: this.state.userid,
            date: this.state.date,
            description: this.state.description,
            enabledTask: this.state.enabledTask,
        }
        this.props.updateTask(task);
        setTimeout(() => {
            if (this.props.taskObject.task != null) {
                this.setState({show: true, method: "put"});
                setTimeout(() => {
                    this.setState({show: false})
                }, 2000);
            } else {
                this.setState({show: false});
            }

        }, 1000);
        this.setState(this.initialState);
    };
    taskChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    };
    taskList = () => {
        return this.props.history.push("/list");
    };

    toggleChange = () => {
        this.setState({
            enabledTask: !this.state.enabledTask,
        });
    }

    render() {
        const {description} = this.state;
        return (
            <div>
                <div style={{display: this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show}
                             message={
                                 this.state.method === "put"
                                     ? "Task Updated Successfully."
                                     : "Task Saved Successfully."
                             }
                             type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/>{" "}
                        {this.state.id ? "Update Task" : "Add New Task"}
                    </Card.Header>
                    <Form onReset={this.resetTask}
                          onSubmit={this.state.id ? this.updateTsk : this.submitTask}
                          id="taskFormId">
                        <Card.Body>

                            <Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        required
                                        autoComplete="off"
                                        type="test"
                                        name="description"
                                        value={description}
                                        onChange={this.taskChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Task Description"
                                    />

                                    <Form.Check
                                        type="checkbox" label="Enabled" onChange={this.toggleChange}
                                        checked={this.state.enabledTask}
                                        value={this.state.enabledTask}/>


                                </Form.Group>

                            </Row>
                        </Card.Body>
                        <Card.Footer style={{textAlign: "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/>{" "}
                                {this.state.id ? "Update" : "Save"}
                            </Button>{" "}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{" "}
                            <Button
                                size="sm"
                                variant="info"
                                type="button"
                                onClick={() => this.taskList()}
                            >
                                <FontAwesomeIcon icon={faList}/> Task List
                            </Button>
                        </Card.Footer>

                    </Form>

                </Card>


            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        taskObject: state.task,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveTask: (task) => dispatch(saveTask(task)),
        fetchTask: (taskId) => dispatch(fetchTask(taskId)),
        updateTask: (task) => dispatch(updateTask(task)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);