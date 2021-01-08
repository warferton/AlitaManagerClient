import React from 'react'





function Nav(props){
    
                        
    
    return(
        <nav className="navbar-navbar-inverse ">
            <div className="container-fluid">
                <div className="navbar-header">

                        <h1 id="brand">{props.navHeader.toUpperCase()}</h1>

                </div>
            </div>
        </nav>
    )
}

export default Nav