import React from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import {useSelector} from "react-redux";

function GroupsTable (props) {
    const { openGroupDialog, setOpenGroupsDialog } = props;
    const groups = useSelector((state) => state.groupReducer.groupList);
    const [alertPopup, setAlertPopup] = React.useState({
        open: false,
        vertical: "top",
        horizontal: "center",
    });

    const closeAlert = () => {
        setAlertPopup({ ...alertPopup, open: false });
    };

    const riseAlert = () => {
        setAlertPopup({ open: true, ...{ vertical: "top", horizontal: "center" } });
    };

    const handleClose = () => {
        setOpenGroupsDialog(false);
    };

    const handleDelete = (params) => {};

    return (
            <TableContainer component={Paper}>
                <Table size="medium" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <div
                                    style={{
                                        display: "flex",
                                        width: "450px",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <TextField
                                        style={{ width: "450px" }}
                                        id="standard-required"
                                        label="Add new group"
                                        onChange={(event) => {
                                            console.log("testing");
                                        }}
                                    />
                                    <span>
                        {
                            <Tooltip title="Add owner">
                                <IconButton
                                    aria-label="add"
                                    onClick={() => {
                                        console.log("test");
                                    }}
                                >
                                    <PersonAddOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        }
                      </span>
                                </div>
                            </TableCell>
                        </TableRow>
                        {groups.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <div
                                        style={{
                                            display: "flex",
                                            width: "450px",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <div>{row.groupName}</div>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => handleDelete(row)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[2, 10, 25]}
                                rowsPerPage={2}
                                page={1}
                                onChangePage={() => {
                                    console.log("pager change");
                                }}
                                count={groups.length}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
}

export default GroupsTable;