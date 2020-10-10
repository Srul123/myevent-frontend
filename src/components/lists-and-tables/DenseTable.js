import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const deleteUI = <>
    <Tooltip title="Delete">
        <IconButton aria-label="delete">
            <DeleteIcon/>
        </IconButton>
    </Tooltip>
</>

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name) {
    return {name, deleteUI};
}

const rows = [
    createData('Inbal Heiblum', deleteUI)
];

export default function DenseTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Event Owner</TableCell>
                        {/*<TableCell align="right">Delete</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            {"israel heiblum"}
                        </TableCell>
                    </TableRow>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                                {row.deleteUI}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}