import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import ContactsIcon from "@material-ui/icons/Contacts";
import SnackbarWithPosition from "../../alerts/SnackbarWithPosition";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import TextField from "@material-ui/core/TextField";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function GroupsModal(props) {
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
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openGroupDialog}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <ContactsIcon />{" "}
          <span style={{ position: "relative", bottom: "0.5vh" }}>Groups</span>
        </DialogTitle>
        <DialogContent dividers>
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
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <SnackbarWithPosition
        alertPopup={alertPopup}
        closeAlert={closeAlert}
        message="Saved"
        severity="success"
      />
    </div>
  );
}
