import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {NavLink} from "react-router-dom";
import axios from "axios";
import AlertsMessage from "../../alerts/AlertsMessage";
import LoaderSpinner from "../../loader-spinner/LoaderSpinner";
import {useDispatch} from "react-redux";
import allActions from "../../../redux/actions";
import {
    isAuthenticatedUser,
    validateInputsSignIn,
} from "../../../services/validationsFunctions";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [riseAlert, setRiseAlert] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const setLoginUser = (user) =>
        dispatch(allActions.userActions.loginUser(user));
    const getInvitersList = () =>
        dispatch(allActions.invitersActions.getInvitersList());
    const getGroupList = () =>
        dispatch(allActions.groupsActions.getGroupList());

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const errorToAlerts = validateInputsSignIn(email, password);
        if (errorToAlerts.length > 0) {
            setRiseAlert(true);
            setMessages(errorToAlerts);
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:5000/users/`);
            const data = response.data;
            let isAuthenticated = isAuthenticatedUser(email, password, data);
            if (!isAuthenticated) {
                setRiseAlert(true);
                setMessages([
                    "Your details are worong, please provide an authorized email and password!",
                ]);
                setLoading(false);
                return;
            } else if (isAuthenticated) {
                setLoginUser(isAuthenticated);
                getInvitersList();
                getGroupList();
                setLoading(false);
                props.history.push("/myprofile");
                // history.push("/myprofile");
                return;
            }
        } catch (error) {
            console.log("Error in SignIn component");
            console.log(error);
        }
    };

    if (loading) {
        return <LoaderSpinner/>;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid>
                        <Grid item xs>
                            <NavLink to="/">Forgot password?</NavLink>
                        </Grid>
                        <Grid item>
                            <NavLink to="/signup">{"Don't have an account? Sign Up"}</NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
            {riseAlert && (
                <div style={{overflow: "auto"}}>
                    <AlertsMessage messages={messages}/>
                </div>
            )}
        </Container>
    );
}
