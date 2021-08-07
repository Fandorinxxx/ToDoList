import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteTask} from "../../services/index";
import "./../../assets/css/Style.css";
import MyToast from "../MyToast";
import {
    Card,
    Table,
    ButtonGroup,
    Button,
    InputGroup,
    FormControl, Form,
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faList,
    faEdit,
    faTrash,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "axios";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            search: "",
            currentPage: 1,
            tasksPerPage: 5,
            sortDis: "asc",
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc"
                ? this.setState({sortDir: "desc"})
                : this.setState({sortDir: "asc"});
            this.findAllTasks(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllTasks(this.state.currentPage);
    }

    findAllTasks(currentPage) {
        currentPage -= 1;
        axios
            .get(
                "http://localhost:8085/rest/tasks?pageNumber=" +
                currentPage +
                "&pageSize=" +
                this.state.tasksPerPage +
                "&sortBy=description&sortDir=" +
                this.state.sortDir +
                "&id=" + localStorage.getItem("id")
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    tasks: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
                localStorage.removeItem("jwtToken");
                this.props.history.push("/");
            });
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(taskId);
        setTimeout(() => {
            if (this.props.taskObject != null) {
                this.setState({show: true});
                setTimeout(() => {
                        this.setState({show: false})
                    }, 3000
                );
                this.findAllTasks(this.state.currentPage);
            } else {
                this.setState({show: false});
            }
        }, 1000);
    }
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllTasks(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage,
        });
    };
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            if (this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllTasks(firstPage);
            }
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            if (this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllTasks(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.tasksPerPage
        );
        if (this.state.currentPage < condition) {
            if (this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllTasks(condition);
            }
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.tasksPerPage)
        ) {
            if (this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllTasks(this.state.currentPage + 1);
            }
        }
    };

    searchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    cancelSearch = () => {
        this.setState({search: ""});
        this.findAllTasks(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios
            .get(
                "http://localhost:8085/rest/tasks/search/" +
                this.state.search +
                "?page=" +
                currentPage +
                "&size=" +
                this.state.tasksPerPage+
                "&id=" + localStorage.getItem("id")
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    tasks: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    };

    render() {
        const {tasks, currentPage, totalPages, search} = this.state;
        return (
            <div>
                <div style={{display: this.state.show ? "block" : "none"}}>
                    <MyToast
                        show={this.state.show}
                        message={"Task Deleted Successfully."}
                        type={"danger"}
                    />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{float: "left"}}>
                            <FontAwesomeIcon icon={faList}/> Task List
                        </div>
                        <div style={{float: "right"}}>
                            <InputGroup size="sm">
                                <FormControl
                                    placeholder="Search"
                                    name="search"
                                    value={search}
                                    className={"info-border bg-dark text-white"}
                                    onChange={this.searchChange}
                                />
                                <Button
                                    size="sm"
                                    variant="outline-info"
                                    type="button"
                                    onClick={this.searchData}
                                >
                                    <FontAwesomeIcon icon={faSearch}/>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline-danger"
                                    type="button"
                                    onClick={this.cancelSearch}
                                >
                                    <FontAwesomeIcon icon={faTimes}/>
                                </Button>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th onClick={this.sortData}>Description
                                    <div
                                        className={
                                            this.state.sortDir === "asc"
                                                ? "arrow arrow-up"
                                                : "arrow arrow-down"
                                        }
                                    >
                                        {" "}
                                    </div>
                                </th>
                                <th>
                                    Enabled{" "}

                                </th>

                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tasks.length === 0 ? (
                                <tr align="center">
                                    <td colSpan="7">No Tasks Available.</td>
                                </tr>
                            ) : (
                                tasks.map((task) => (
                                    <tr key={task.id}>
                                        <td style={{wordBreak: "break-word"}}>
                                            {task.description}
                                        </td>
                                        <td>
                                            <Form.Check readOnly
                                                        type="checkbox"
                                                        checked={task.enabledTask}/>
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Link
                                                    to={"edit/" + task.id}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </Link>{" "}
                                                <Button
                                                    size="sm"
                                                    variant="outline-danger"
                                                    onClick={() => this.deleteTask(task.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash}/>
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                    {tasks.length > 0 ? (
                        <Card.Footer>
                            <div style={{float: "left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{float: "right"}}>
                                <InputGroup size="sm">

                                    <Button
                                        type="button"
                                        variant="outline-info"
                                        disabled={currentPage === 1 ? true : false}
                                        onClick={this.firstPage}
                                    >
                                        <FontAwesomeIcon icon={faFastBackward}/> First
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline-info"
                                        disabled={currentPage === 1 ? true : false}
                                        onClick={this.prevPage}
                                    >
                                        <FontAwesomeIcon icon={faStepBackward}/> Prev
                                    </Button>

                                    <FormControl
                                        className={"page-num bg-dark"}
                                        name="currentPage"
                                        value={currentPage}
                                        onChange={this.changePage}
                                    />

                                    <Button
                                        type="button"
                                        variant="outline-info"
                                        disabled={currentPage === totalPages ? true : false}
                                        onClick={this.nextPage}
                                    >
                                        <FontAwesomeIcon icon={faStepForward}/> Next
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline-info"
                                        disabled={currentPage === totalPages ? true : false}
                                        onClick={this.lastPage}
                                    >
                                        <FontAwesomeIcon icon={faFastForward}/> Last
                                    </Button>

                                </InputGroup>
                            </div>
                        </Card.Footer>
                    ) : null}
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
        deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
