import React from 'react'

function AccessRestricted() {
    return(
        <div className="alert alert-danger p-5 m-3">
            <h2>Unauthorized Access!</h2>
            <h1>Error 403</h1>
            <span className="p-4">
            You do not have the authority to access this resource.
            </span>
        </div>
    )
}

export default AccessRestricted

