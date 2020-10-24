import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PeopleIcon from '@material-ui/icons/People';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        margin: theme.spacing(1, 0),
    },
    speedDial: {
        position: 'fixed',
        left: '90%',
        top: '32vh'
    },
}));

const actions = [
    { icon: <PermContactCalendarOutlinedIcon />, name: 'Add new inviter',action: "addInviter" },
    { icon: <PeopleIcon />, name: 'My groups',action: "openGroups" },
    { icon: <CloudUploadIcon />, name: 'Load inviters from external platform',action: "openGroups" },
];

export default function SpeedDials(props) {
    const {setOpenInviterDialog, setOpenGroupsDialog} = props;
    const [openSpeedDials,setSpeedDials] = React.useState(false);
    const classes = useStyles();


    const handleClose = (event, action) => {
        setSpeedDials(false);
        if(action==="addInviter"){
            setOpenInviterDialog(true);
        }
        if(action==="openGroups"){
            setOpenGroupsDialog(true);
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

