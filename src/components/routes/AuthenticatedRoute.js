import React from 'react'
import {Redirect} from 'react-router-dom'


export function AuthenticatedRoute(props){

    const isAuthenticated = props.isAuthenticated
    const Component = props.component


    return  isAuthenticated ? 

    (<Component/>) 

        : 

    (<Redirect to="/error&restricted"/>)

}