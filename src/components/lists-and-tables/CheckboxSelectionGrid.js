import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {useDemoData} from '@material-ui/x-grid-data-generator';

export default function CheckboxSelectionGrid(props) {
    const table = {};
    table.columns = [
        {
            field: "fullName",
            headerName: "Name"
        },
        {
            field: "phoneNumber",
            headerName: "Phone"
        },
        {
            field: "emailAddress",
            headerName: "Email"
        },
        {
            field: "groupName",
            headerName: "Group"
        },
        {
            field: "numberOfGuests",
            headerName: "Accompanying"
        },
        {
            field: "needRide",
            headerName: "Ride"
        },
        {
            field: "alreadyApprove",
            headerName: "Approved Arrival?"
        }
    ];
    table.rows = props.invitersList;

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid checkboxSelection {...table}   style={{ height: 350, width: '100%' }}/>
        </div>
    );
}