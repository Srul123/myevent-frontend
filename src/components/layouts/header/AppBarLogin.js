import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DrawerWithIcons from '../../drawers/DrawerWithIcons'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppBarLogin() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);


  return (
    <div className={classes.root}>
        <DrawerWithIcons open={open} setOpen={setOpen} />
    </div>
  );
}