import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    
    submit: {
        margin: theme.spacing(3, 0, 2),
        marginTop: 60,
        width: 150
    },

});

//   Creating a login Component ---------

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }
    
    onSubmitHandle = (e) => {
        e.preventDefault()
        const { userName, password } = this.state;
        const { history } = this.props;
        axios.post('http://18.220.240.163:8080/rest/authenticate/login', { userName, password })
            .then(res => {
                localStorage.setItem('Token', res.data.result.accessToken)
                history.push('/categories');
            })
    
        }
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs" style={{ padding: -100 }}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Login
                    <hr style={{width: '71px'}}></hr>
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="text"
                        label="UserName"
                        name="userName"
                        autoComplete="text"
                        value={this.state.userName}
                        onChange={(e) => this.handleChange(e)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        autoComplete="current-password"
                        onChange={(e) => this.handleChange(e)}
                    />
                    <Button
                        type="submit"
                        halfWidth
                        variant="contained"
                        justifyContent='center'
                        color="primary"
                        onClick={this.onSubmitHandle}
                        className={classes.submit}>
                        Login IN
                    </Button>

                </div>
            </Container>

        );
    }
}
export default (withStyles(useStyles)(Login));

