import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import InputBase from "@material-ui/core/InputBase";
import FormControl from "@material-ui/core/FormControl";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },

});


export default function EventOwnersTable(props) {
    const {eventOwners, setEventOwners, defaultUser} = props;
    let eventOwnersToShow = JSON.parse(JSON.stringify(eventOwners));
    eventOwnersToShow = eventOwnersToShow.filter(owner => {
        return (owner.id !== 0 && owner.id !== 1);
    });
    const classes = useStyles();
    const [newOwner, setNewOwner] = React.useState("");
    const [enableAddNewUser, setEnableAddNewUser] = React.useState(true);
    const lastIndex = eventOwners.length;



    const handleDelete = (eventOwnerToDelete) => {
        let arrayOfOwners = eventOwners.filter((owner) => owner.id !== eventOwnerToDelete.id);
        setEventOwners(arrayOfOwners);
    };

    const editEventOwnerName = (event, row) => {
        let arrayOfOwners = eventOwners.map((owner) => {
            if (row.id === owner.id) {
                const editedOwner = {};
                editedOwner.id = owner.id;
                editedOwner.name = event.target.value.trim();
                return editedOwner;
            } else {
                return owner;
            }
        });
        setEventOwners(arrayOfOwners);
    };

    const handleOnClickAddNewEventOwner = () => {
        const newOwnerToAdd = {
            name: newOwner.trim(),
            id: lastIndex + 1
        }
        setEventOwners([...eventOwners, newOwnerToAdd]);
        setNewOwner("");
        setEnableAddNewUser(true);
    };


    return (
        <TableContainer component={Paper}>
            <Typography variant="h4" component="h4">
                Event Owners
            </Typography>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <span>
                                  {defaultUser}
                                </span>
                                <span>
                                    {"Default owner"}
                                </span>
                            </div>
                        </TableCell>
                    </TableRow>
                    {eventOwners.length > 0 && (
                        eventOwnersToShow.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <Tooltip title="Edit name" placement={'bottom-start'}>
                                            <FormControl>
                                                <InputBase
                                                    onChange={(event) => editEventOwnerName(event, row)}
                                                    value={row.name}
                                                />
                                            </FormControl>
                                        </Tooltip>

                                        <Tooltip title="Delete">
                                            <IconButton aria-label="delete" onClick={() => handleDelete(row)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )))}
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <TextField id="standard-required" value={newOwner} label="Add new event owner"
                                           onChange={(event => {
                                               setNewOwner(event.target.value);
                                               if (String(event.target.value).length > 1) {
                                                   setEnableAddNewUser(false);
                                               } else {
                                                   setEnableAddNewUser(true);
                                               }
                                           })}/>

                                <span>
                                   {
                                       enableAddNewUser ?
                                           (<IconButton aria-label="add" onClick={handleOnClickAddNewEventOwner}
                                                        disabled={true}>
                                               <PersonAddOutlinedIcon/>
                                           </IconButton>) :
                                           (<Tooltip title="Add owner">
                                               <IconButton aria-label="add" onClick={handleOnClickAddNewEventOwner}>
                                                   <PersonAddOutlinedIcon/>
                                               </IconButton>
                                           </Tooltip>)
                                   }

                                </span>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}