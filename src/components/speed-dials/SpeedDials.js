import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: 'fixed',
        left: '90%',
        top: '32vh'
        // '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        //     right: theme.spacing(2),
        // },
        // '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        //     top: theme.spacing(2),
        //     left: theme.spacing(2),
        // },
    },
}));

const actions = [
    { icon: <PermContactCalendarOutlinedIcon />, name: 'Add new inviter',action: "addInviter" },
    { icon: <SaveIcon />, name: 'My groups',action: "openGroups" },
    { icon: <PrintIcon />, name: 'Print',action: "openGroups" },
    { icon: <ShareIcon />, name: 'Share',action: "openGroups" },
    { icon: <FavoriteIcon />, name: 'Like' ,action: "openGroups"},
];

export default function SpeedDials(props) {
    const {setOpenInviterDialog} = props;
    const [openSpeedDials,setSpeedDials] = React.useState(false);
    const classes = useStyles();


    const handleClose = (event, action) => {
        console.log("action");
        console.log(action);
        setSpeedDials(false);
        if(action==="addInviter"){
            setOpenInviterDialog(true);
        }
    };

    const handleOpen = () => {
        setSpeedDials(true);
    };

    return (

                <SpeedDial
                    ariaLabel="SpeedDial example"
                    className={classes.speedDial}
                    hidden={false}
                    icon={<SpeedDialIcon />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={openSpeedDials}
                    direction={'down'}

                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={(event)=>{
                                handleClose(event, action.action)
                            }}
                        />
                    ))}
                </SpeedDial>
    );
}

