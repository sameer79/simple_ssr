import React, {useEffect} from 'react';
import { withRouter } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SideBar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [properties, setProperties] = React.useState({});

  const handleClick = (route) => {
    setOpen(!open);
    if (route) {
        props.history.push(route)
    }
  };

  // const fetchProperties =  async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/product/properties');
  //     const responseData = await response.json();
  //     setProperties(responseData);
  //   }catch(err) {
  //     console.log("Not able to fetch properties...", err)
  //   }
  // }

  useEffect(() => {
    // fetchProperties();
    return () => {}
  }, [])
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={() => handleClick('/')}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button  onClick={() => handleClick()}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Discovery" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} onClick={() => handleClick('/discovery/dashboard')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}

export default withRouter(SideBar);
