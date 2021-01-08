import React from 'react'

function ResourceNotFound() {
    return(
        <div className="alert alert-danger p-5 m-3">
            <h2>Page Not Found!</h2>
            <h1>Error 404</h1>
            <span className="p-4">
            There is no page with this URL address.
            </span>
        </div>
    )
}

export default ResourceNotFound