import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, useTheme } from '@material-ui/core/styles';

import QuestionsList from './QuestionsList'
import AllQuestionsList from './AllQuestionsList'
import QuestionForm from './QuestionForm'


const styles = theme => ({
  root: {
    display: 'flex',
    // width: '96%'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  spaceBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
  },
  dashboardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 680,
    [theme.breakpoints.down('md')]: {
          width: '100%'
        },
    },
  column : {
    flexGrow: 1,
    padding: theme.spacing(1),
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'scroll',
    // [theme.breakpoints.down('md')]: {
    //     width: '100%'
    //   },
    maxHeight: 860
  },
  shortColumn : {
    flexGrow: 1,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        width: '100%'
      },
  },
  flex : {
      display: 'flex',
      flexDirection: 'column'
  }
})

// const drawer = (
    // <div>
    //   <div 
    //   className={classes.toolbar} 
    //   />
    //   <Divider />
    //   <List>
    //     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //       <ListItem button key={text}>
    //         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //         <ListItemText primary={text} />
    //       </ListItem>
    //     ))}
    //   </List>
    //   <Divider />
    //   <List>
    //     {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //       <ListItem button key={text}>
    //         <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
    //         <ListItemText primary={text} />
    //       </ListItem>
    //     ))}
    //   </List>
    // </div>
//   );

class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mobileOpen: false
        }
    }

  handleDrawerToggle = () =>
    this.setState({
        mobileOpen: !this.state.mobileOpen
  })

  render() {

    const { container, classes, data:{userInfo}, addQuestion } = this.props,
            { mobileOpen } = this.state

    return (
        <div 
        className={classes.root}
        >
          <CssBaseline />
          <AppBar position="fixed" 
          className={classes.appBar}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.spaceBetween}>
                <Typography variant="h6" noWrap>
                    {userInfo.username}'s Dashboard
                </Typography>
                <Button color="inherit">Logout</Button>
              </div>
            </Toolbar>
          </AppBar>
          
          <main 
          className={classes.content}
          >
            <div 
            className={classes.toolbar} 
            />
            <div className={classes.dashboardContent}>

                        <QuestionForm addQuestion={addQuestion} />
                    
                    <h1>My Questions</h1>
                    
                    <Paper className={classes.column}>
                        <QuestionsList data={this.props.data}/>
                    </Paper>
   
            </div>
          </main>
        </div>
      );
  }
}

export default withStyles(styles)(Dashboard)