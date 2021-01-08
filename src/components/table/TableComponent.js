import React from 'react'


function TableComponent(props){


    let buttons = <td></td>

    const updateButton =
                 <td key="btn1">
                    <button id = "update-btn" className = "btn btn-secondary btn-lg" onClick={() => 
                        props.handleUpdateClick(props)}>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </button>
                </td>

    const deleteButton = 
                <td key="btn2">
                    <button id = "delete-btn" className = "btn btn-secondary btn-lg" onClick={() => 
                        props.handleDeleteClick(props.id, props.scheduleElementType)}>
                            <i className="fa fa-trash"></i>
                        </button>
                </td>

    
            
        

    return (
        <tr>
            {props.arg1 &&
            <td>
                <p>{props.arg1}</p>
            </td>}

            {props.arg2 &&
            <td>
                <p>{props.arg2}</p>
            </td>}

            {props.arg3 &&
            <td>
                <p>{props.arg3}</p>
            </td>}

            {props.arg4 &&
            <td>
                <p>{props.arg4}</p>
            </td>}
            
            {props.arg5 &&
            <td>
                <p>{props.arg5}</p>
            </td>
            }

           { console.log(props.isAdmin)}


           {props.isAdmin ? 
           [props.serviceFlag && updateButton, deleteButton]
           :
           buttons}

        </tr>
    )
}

export default TableComponent