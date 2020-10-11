import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SpeedDials from "../../speed-dials/SpeedDials";
import CheckboxSelectionGrid from "../../lists-and-tables/CheckboxSelectionGrid";
import AutocompleteSearchNormal from "../../autocomplete-searchs/AutocompleteSearchNormal";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useSelector} from "react-redux";
import InvitersTable from "../../lists-and-tables/InvitersTable";
import AutocompleteSearchCheckboxesTags from "../../autocomplete-searchs/AutocompleteSearchCheckboxesTags";
import NativeSelect from "@material-ui/core/NativeSelect";
import InviterDialog from "../../dialogs/InviterDialog";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function prepareTableHeadDataForComp() {
    const headCells = [
        {id: 'fullName', numeric: false, disablePadding: true, label: 'Name'},
        {id: 'groupName', numeric: false, disablePadding: false, label: 'Group'},
        {id: 'alreadyApprove', numeric: false, disablePadding: false, label: 'Approved arrival'},
        {id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Phone'},
        {id: 'emailAddress', numeric: false, disablePadding: false, label: 'email'},
        {id: 'numberOfGuests', numeric: true, disablePadding: false, label: 'Quantity'},
        {id: 'needRide', numeric: false, disablePadding: false, label: 'Need ride'},
    ];
    return headCells;
}

export default function InviteManagement() {

    const classes = useStyles();
    const [eventOwner, setEventOwner] = React.useState('');
    const [openInviterDialog, setOpenInviterDialog] = React.useState(false);
    const [openSpeedDials, setSpeedDials] = React.useState(false);
    const invitersListFilter = useSelector(state => state.invitersReducer.invitersListFiltered);
    const invitersList = useSelector(state => state.invitersReducer.invitersList);
    const user = useSelector(state => state.userReducer.user);
    const eventOwnersList = user.details.eventOwners;

    const groups = useSelector(state => state.groupReducer.groupList);
    const [groupToSearch, setGroupToSearch] = React.useState('');

    const tableHeadData = prepareTableHeadDataForComp();

    const handleSelectEventOwner = (event) =>{
        console.log("event is:");
        console.log(event.target.value);
    };


    return (
        <React.Fragment>
            <SpeedDials openSpeedDials={openSpeedDials} setSpeedDials={setSpeedDials} setOpenInviterDialog={setOpenInviterDialog}  />
            <div className={classes.root} style={{marginTop: "80px"}}>
                <Grid container spacing={5}>
                    <InviterDialog openInviterDialog={openInviterDialog} setOpenInviterDialog={setOpenInviterDialog} setSpeedDials={setSpeedDials}/>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid item xs={12} className="top-title-page">
                                <AutocompleteSearchNormal invitesList={invitersList}
                                                          label={"Search for inviter by name or phone number"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {/*<FormControl className={classes.formControl}>*/}
                                <div className="wrapper-filter" style={{marginTop: "2vh", display:"flex"}}>
                                    <div style={{flex:"1"}}>
                                        <AutocompleteSearchCheckboxesTags groups={groups}/>
                                    </div>
                                    <div  style={{flex:"1"}}>
                                        <FormControl className={classes.formControl}>
                                            <NativeSelect
                                                value={eventOwner}
                                                onChange={(event) => {
                                                    setEventOwner(event.target.value);
                                                    handleSelectEventOwner(event);
                                                }}
                                                name="eventOwner"
                                                className={classes.selectEmpty}
                                                inputProps={{'aria-label': 'eventOwner'}}
                                            >
                                                <option value="*">All</option>
                                                {eventOwnersList.map((owner) => <option key={owner.id}  value={owner.id}>{owner.name}</option>)}
                                            </NativeSelect>
                                            <FormHelperText>Filter by event Owner</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                                {/*</FormControl>*/}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <InvitersTable title={"Inviters List"} headCell={tableHeadData} rows={invitersListFilter}/>
                    </Grid>

                </Grid>

            </div>


        </React.Fragment>
    );
}


