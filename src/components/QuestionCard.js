import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Edit from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import axios from 'axios'

const styles = theme => ({
    card: {
      maxWidth: 580,
      marginBottom: 5
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardheader: {
        fontSize: 20,
    },
    answerCard: {
        padding: 40,
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
    padding: theme.spacing(1),
    },
    bottomRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 500
      },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    textField : {
        width: 500
    },
    select: {
        width: 200
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    dialogue: {
        width: 580
    }
  })


class QuestionCard extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            expanded: false,
            answers: [],
            AnchorEl: null,
            dialogOpen: false,
            editedQuestion: '',
            editedTitle: ''
        }

    }

    componentDidMount() {
        const { id } = this.props
        const endpoint = `http://localhost:5000/api/answers/questions/${id}`;

        this.setState({
            editedQuestion: this.props.question,
            editedTitle: this.props.title
        })

        axios
          .get(endpoint)
          .then(res => {
            console.log("Askers data:", res.data);
            this.setState({
                answers: res.data
            })
          })
          .catch(err => {
            console.log("Can't retrieve asker info", err);
          });
    }

    handleExpandClick= () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    handlePopoverOpen = (event) => 
        this.setState({
            anchorEl: event.currentTarget
            });
    
    handlePopoverClose = () => 
        this.setState({
            anchorEl: null
            });
    
    //Handlers for dialogue
    handleClickOpen = () =>
        this.setState({
            dialogOpen: true
        })
    
    handleClose = () =>
        this.setState({
            dialogOpen: false
        })
    
    //handle change for form inputs on dialog
    handleChange = e => 
      this.setState({
        [e.target.name]: e.target.value
      })
    


      render() {
          const open = Boolean(this.state.anchorEl);
          const { classes } = this.props,
                { title, question, userInfo : {username} } = this.props,
                { expanded, answers, anchorEl, dialogOpen, editedTitle, editedQuestion } = this.state

          return(
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar}>
                        R
                    </Avatar>
                    }
                    action={
                    <>
                    <IconButton aria-label="Settings">
                        <Edit onClick={this.handleClickOpen} />
                    </IconButton>
                    <Dialog open={dialogOpen} onClose={this.handleClose} className={classes.dialog} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Edit Question</DialogTitle>
                        <DialogContent >
                        <form className={classes.form}>
                            <TextField
                            value={editedTitle}
                            name='editedTitle'
                            label="Title"
                            placeholder=""
                            multiline
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            />
                            <div className={classes.bottomRow}>
                            <TextField
                            value={editedQuestion}
                            name='editedQuestion'
                            label="My question is..."
                            placeholder=""
                            multiline
                            className={classes.textField}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            />                           
                            </div>
                            </form>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} variant="contained" color="secondary">
                            Delete
                        </Button>
                        <Button onClick={this.handleClose} variant="contained" color="primary">
                            Submit
                        </Button>
                        </DialogActions>
                    </Dialog>
                    </>
                    }
                    
                    title={username}
                    subheader="Topic 1"
                />
                <CardContent>
                    <Typography variant="h4" color="textSecondary" component="p" gutterBottom>
                    {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {question}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {/* <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                    <ShareIcon />
                    </IconButton> */}
                    <Typography>
                        See answers: ({answers.length})
                    </Typography>
                    <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Show more"
                    >
                    <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {answers.map( ({ answer, username }) =>
                    <CardContent className={classes.answerCard}>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="avatar" className={classes.avatar}>
                                R
                            </Avatar>
                            }
                            action={
                                <IconButton aria-label="Settings">
                                <AccountCircle 
                                onMouseEnter={this.handlePopoverOpen}
                                onMouseLeave={this.handlePopoverClose}
                                />
                                <Popover
                                    id="mouse-over-popover"
                                    className={classes.popover}
                                    classes={{
                                    paper: classes.paper,
                                    }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                    onClose={this.handlePopoverClose}
                                    disableRestoreFocus
                                >
                                    <Typography>View Profile</Typography>
                                </Popover>
                            </IconButton>
                            }
                            title={username}
                            // subheader="Topic 1"
                        />
                        <Typography paragraph>
                            {answer}
                        </Typography>
                    </CardContent>
                )}
                </Collapse>
                </Card>
            );
            }
  }

  export default withStyles(styles)(QuestionCard)
