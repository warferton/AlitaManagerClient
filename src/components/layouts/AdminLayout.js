import React from 'react'

import Nav from '../Nav'
import TablePageBody from '../table/TablePageBody'

function AdminLayout(props) {

return (
    <div id="admin-layout">
            <Nav navHeader='Alita Management Tool' isLoggedIn = {props.isLoggedIn} handleLogout ={props.handleLogout}/>
            <TablePageBody apiUrl={props.apiUrl} isAdmin={true}/>
    </div>
)

}

export default AdminLayout