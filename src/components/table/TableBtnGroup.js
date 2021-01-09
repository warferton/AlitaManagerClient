import React from 'react';

function TableDataButtonGroup(props){
    const selectedStyle = {
            backgroundColor: "#04CEFF",
            color: "black",
            textShadow:"1px 1.5px black"
    }

    return(
        <div>
            
            <div className="btn-group" id="section-select">
                {props.isAdmin &&
                    <button className="btn btn-secondary btn-lg"
                    style={props.tableDataType==="clients" ? selectedStyle : null}
                    onClick={() => props.handleClick("clients")}
                    ><b>Клиенты</b></button>
                }

                    <button className="btn btn-secondary btn-lg"
                    style={props.tableDataType==="schedule" ? selectedStyle : null}
                    onClick={() => props.handleClick("schedule")}
                    ><b>Записи</b></button>

                {props.isAdmin &&
                    <button className="btn btn-secondary btn-lg"
                    style={props.tableDataType==="employees" ? selectedStyle : null}
                    onClick={() => props.handleClick("employees")}
                    ><b>Сотрудники</b></button>
                }

            </div>

                <div className="svc-btn-container">
                    <button className="btn btn-secondary btn-sm btn-svc"
                    onClick={() => props.handleClick("services")}
                    >Услуги</button>
                </div>

        </div>
    )
}
export default TableDataButtonGroup