import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerApp from "../../drawers/DrawerApp";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppBarLogin() {
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [stateDrawer, setStateDrawer] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = () => {
    setOpenDrawer(true);
    setStateDrawer({ ...stateDrawer, ["left"]: openDrawer });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            My Event
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
        <DrawerApp stateDrawer={stateDrawer} setStateDrawer={setStateDrawer} />
      </AppBar>
    </div>
  );
}