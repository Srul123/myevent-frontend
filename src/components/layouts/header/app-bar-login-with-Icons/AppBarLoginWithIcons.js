import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import EventNoteIcon from "@material-ui/icons/EventNote";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import MarkunreadMailboxOutlinedIcon from "@material-ui/icons/MarkunreadMailboxOutlined";
import BorderVerticalOutlinedIcon from "@material-ui/icons/BorderVerticalOutlined";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import SettingsIcon from '@material-ui/icons/Settings';import {Link, NavLink} from "react-router-dom";
import {useDispatch } from "react-redux";

import "./AppBarLoginWithIcons.scss";
import allActions from "../../../../redux/actions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const optionRoutes = [
  {
    title: "Overall Status",
    icon: <PlaylistAddCheckIcon />,
    route: "/myprofile",
  },
  {
    title: "My Event Details",
    icon: <EventNoteIcon />,
    route: "/event-details",
  },
  {
    title: "Inviters Management",
    icon: <PeopleOutlineIcon />,
    route: "invite-management",
  },
  {
    title: "RSVP",
    icon: <MarkunreadMailboxOutlinedIcon />,
    route: "2",
  },
  {
    title: "Seating Arrangement",
    icon: <BorderVerticalOutlinedIcon />,
    route: "3",
  },
];


export default function DrawerWithIcons(props) {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const logout = () =>
      dispatch(allActions.userActions.logoutUser());

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap>
              <Link style={{textDecoration:"none", color:"white"}} to={"/"}>
                My Event
              </Link>
            </Typography>
            <Button color="inherit" onClick={()=> logout()}>Logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }) + " coverDrawer"}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
            {optionRoutes.map((option, index) => (
              <NavLink to={option.route} key={index} className={classes.anchor}>
                  <ListItem button key={index}>
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.title} />
                  </ListItem>
              </NavLink>
            ))}
        </List>
        <Divider />
        <List>
          {[
            {
              title: "Need attention",
              icon: <NotificationsActiveOutlinedIcon />,
            },
            {
              title: "Settings",
              icon: <SettingsIcon />,
            },
          ].map((option, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText primary={option.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
