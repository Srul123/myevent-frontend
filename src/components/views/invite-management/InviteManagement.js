import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SpeedDials from "../../speed-dials/SpeedDials";
import AutocompleteSearchNormal from "../../autocomplete-searchs/AutocompleteSearchNormal";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {useSelector} from "react-redux";
import InvitersTable from "../../lists-and-tables/inviters-table/InvitersTable";
import AutocompleteSearchCheckboxesTags from "../../autocomplete-searchs/AutocompleteSearchCheckboxesTags";
import NativeSelect from "@material-ui/core/NativeSelect";
import AddInviterModal from "../../dialogs/add-inviter-modal/AddInviterModal";
import EditInviterModal from "../../dialogs/edit-inviter-modal/EditInviterModal";


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
    const [openAddInviterDialog, setAddOpenInviterDialog] = React.useState(false);
    const [openSpeedDials, setSpeedDials] = React.useState(false);
    const [openEditInviterDialog, setEditOpenInviterDialog] = React.useState(false);
    const invitersListFilter = useSelector(state => state.invitersReducer.invitersListFiltered);
    const invitersList = useSelector(state => state.invitersReducer.invitersList);
    const user = useSelector(state => state.userReducer.user);
    const eventOwnersList = user.details.eventOwners;

    const groups = useSelector(state => state.groupReducer.groupList);
    const [groupToSearch, setGroupToSearch] = React.useState('');

    const tableHeadData = prepareTableHeadDataForComp();

    const handleSelectEventOwner = (event) => {
        console.log("event is:");
        console.log(event.target.value);
    };


    return (
        <React.Fragment>
            <SpeedDials setOpenInviterDialog={setAddOpenInviterDialog}/>
            <div className={classes.root} style={{marginTop: "80px"}}>
                <Grid container spacing={5}>
                    <AddInviterModal openInviterDialog={openAddInviterDialog}
                                     setOpenInviterDialog={setAddOpenInviterDialog}
                                     setSpeedDials={setSpeedDials}/>
                    <EditInviterModal openInviterDialog={openEditInviterDialog}
                                      setOpenInviterDialog={setEditOpenInviterDialog}/>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid item xs={12} className="top-title-page">
                                <AutocompleteSearchNormal invitesList={invitersList}
                                                          label={"Search for inviter by name or phone number"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <div className="wrapper-filter" style={{marginTop: "2vh", display: "flex"}}>
                                    <div style={{flex: "1"}}>
                                        <FormControl className={classes.formControl} style={{width: "100%"}}>

                                            <AutocompleteSearchCheckboxesTags groups={groups}/>
                                        </FormControl>
                                    </div>
                                    <div style={{flex: "1"}}>
                                        <FormControl className={classes.formControl} style={{width: "80%"}}>
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
                                                {eventOwnersList.map((owner) => <option key={owner.id}
                                                                                        value={owner.id}>{owner.name}</option>)}
                                            </NativeSelect>
                                            <FormHelperText>Filter by event Owner</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <InvitersTable
                            title={"Inviters List"}
                            headCell={tableHeadData}
                            rows={invitersListFilter}
                            setEditOpenInviterDialog={setEditOpenInviterDialog}
                        />
                    </Grid>

                </Grid>

            </div>


        </React.Fragment>
    );
}


