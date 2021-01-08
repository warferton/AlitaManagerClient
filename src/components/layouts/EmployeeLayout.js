import React from 'react'

import TablePageBody from '../table/TablePageBody'
import Nav from '../Nav'


function EmployeeLayout(props) {


    return(
        <div id= "employee-layout">
            <Nav navHeader='Alita Management Tool' isLoggedIn = {props.isLoggedIn} handleLogout ={props.handleLogout}/>
            <TablePageBody apiUrl={props.apiUrl} isAdmin={false}/>
        </div>
    )
}

export default EmployeeLayout