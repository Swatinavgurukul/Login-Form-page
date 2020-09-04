import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.css'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { withSnackbar } from 'notistack';
import MuiAlert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
    },
    submit: {
        margin: theme.spacing(3, 0, 1),
        width: 80,
    },
    root: {
        mixWidth: 0,
    },

});



// Component Create a Form ---------

class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Name: '',
            ImageUrl: '',
            Categories: [],
            Sub_Categories: [],
            Topics: [],
            category_Id: [],
            subCategory_Id: [],
            topic_Id: [],
            startDate: "",
            endDate: "",
            open: false,

        };
    }

    componentDidMount() {
        const token = localStorage.getItem('Token')
        // api for geting categories options
        axios.get('http://18.220.240.163:8080/rest/admin/categories', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const allCategories = res.data.result.list;
                this.setState({
                    Categories: allCategories,
                })
            })

        // api for geting sub-categories options
        axios.get('http://18.220.240.163:8080/rest/admin/subcategories', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const allSubCategories = res.data.result.list;
                this.setState({
                    Sub_Categories: allSubCategories,
                })
            })

        // api for geting topic options
        axios.get('http://18.220.240.163:8080/rest/admin/topics', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                const allTopics = res.data.result.list;
                this.setState({
                    Topics: allTopics,
                })
            })
    }

    // Categories HandleChange function

    categoriesHandleChange = (event, newValue) => {
        console.log(newValue, "navgirurj")
        if (newValue) {
            const category_Id = parseInt(newValue.id)
            this.setState({
                category_Id: category_Id
            })
        }
    }

    // Sub-Categories HandleChange function

    subCategoriesHandleChange = (event, newValue) => {
        if (newValue) {
            const subCategory_Id = parseInt(newValue.id)
            this.setState({
                subCategory_Id: subCategory_Id
            })
        }
    }

    // topic HandleChange function
    topicHandleChange = (event, newValue) => {
        if (newValue) {
            const topic_Id = parseInt(newValue.id)
            this.setState({
                topic_Id: topic_Id
            })
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }


    Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    // Snackbar handleClick
    handleClick = () => {
        this.setState({
            open: true
        })
    };

    // Snackbar handleClose
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            open: false
        })

    };
    //  Submit Form onClick-----

    onClick = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('Token')
        let { Name, ImageUrl, category_Id, subCategory_Id, topic_Id, startDate, endDate } = this.state
          if (Name && ImageUrl && category_Id && subCategory_Id && topic_Id && startDate && endDate) {
            axios.post('http://18.220.240.163:8080/rest/admin/matches', { Name, ImageUrl, category_Id, subCategory_Id, topic_Id, startDate, endDate }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then((res) => {
                if (res.data.success === true) {
        
                    this.props.enqueueSnackbar("Details succesfuly sended", {
                        variant: "success",
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                    })
                } else {
                  this.props.enqueueSnackbar('Something is wrong pleasse try again!', {
                    variant: 'error', anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    }
                  });
                }
              })
          } else {
            this.props.enqueueSnackbar('Please fill all filed!', {
              variant: 'error', anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
              }
            });
          }
      }


    render() {

        const { classes } = this.props;
        const { Name, startDate, endDate, } = this.state;
        console.log(Name, startDate, endDate, "uytrew")
        return (
            <Container component="main" maxWidth="xs" style={{ padding: -100 }}>
                <CssBaseline />
                <div className={classes.paper} >
                    
                    <Card className={classes.root} variant="outlined">
                        <CardContent>
                            {/* Title------ */}
                            <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                                Categories
                            <hr style={{ width: '138px' }}></hr>
                            </Typography>
                            {/* Name------ */}
                            <TextField
                                required
                                margin="normal"
                                fullWidth
                                id="text"
                                label="Name"
                                name="Name"
                                autoComplete="text"
                                value={this.state.Name}
                                onChange={(e) => this.handleChange(e)}
                                autoFocus
                            />
                            {/* Image Url---------*/}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="text"
                                label="ImageUrl"
                                name="ImageUrl"
                                autoComplete="text"
                                value={this.state.ImageUrl}
                                onChange={(e) => this.handleChange(e)}
                                autoFocus
                            />
                            <div style={{ width: 360 }}>
                                {/* List of categories------- */}
                                <Autocomplete
                                    id="disable-portal"
                                    onChange={this.categoriesHandleChange}
                                    options={this.state.Categories}
                                    getOptionLabel={option => option.name}
                                    disablePortal
                                    renderInput={params => <TextField {...params} label="Categories" margin="normal" />}
                                />
                                {/*  List of sub-categories------ */}
                                <Autocomplete
                                    id="disable-portal"
                                    openOnFocus={true}
                                    onChange={this.subCategoriesHandleChange}
                                    options={this.state.Sub_Categories}
                                    getOptionLabel={option => option.name}
                                    disablePortal
                                    renderInput={params => <TextField {...params} label="Sub-Categories" margin="normal" />}
                                />
                                {/* Topics ----*/}
                                <Autocomplete
                                    id="disable-portal"
                                    onChange={this.topicHandleChange}
                                    options={this.state.Topics}
                                    getOptionLabel={option => option.name}
                                    disablePortal
                                    renderInput={params => <TextField {...params} label="Topics" margin="normal" />}
                                />

                            </div>
                            
                            {/* Start Date----- */}
                            <Typography component="h4" variant="p" style={{ marginTop: '10px' }}>
                                Start Date
                            </Typography>

                            <TextField style={{ width: 360 }}
                                type="datetime-local"
                                id="startDate"
                                name="startDate"
                                min="2018-01-01T00:00"
                                max="2018-12-31T00:00"
                                margin="normal"
                                value={this.state.startDate}
                                onChange={(e) => this.handleChange(e)}
                            />

                            {/* End Date -------*/}

                            <Typography component="h4" variant="p" style={{ marginTop: '10px' }}>
                                End Date
                            </Typography>
                            
                            <TextField style={{ width: 360 }}
                                type="datetime-local"
                                id="endDate"
                                name="endDate"
                                min="2018-01-01T00:00"
                                max="2018-12-31T00:00"
                                margin="normal"
                                value={this.state.endDate}
                                onChange={(e) => this.handleChange(e)}
                            />


                             

                        </CardContent>

                    </Card>

                    {/* submit button-------- */}
                    <center>
                        <Button 
                            type="submit"
                            variant="contained"
                            justifyContent='center'
                            color="primary"
                            onClick={this.onClick}
                            className={classes.submit}
                            >
                            Submit
                        </Button>

                    </center>
                </div>
            </Container>

        );
    }
}
export default withSnackbar(withStyles(useStyles)(Categories));
