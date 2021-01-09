import React, {useState} from 'react'
import Loader from 'react-loader-spinner'
import moment from 'moment'
import Modal from 'react-modal'
import {InfoForm} from '../forms/InfoForm'

import TableComponent from './TableComponent'

function Table(props) {

    Modal.setAppElement('#root')

    const [displayFormState, setDisplayFormState] = useState(false)
    const [appInfoModal, setAppInfoModal] = useState("")

    const handleCloseModal = () =>{
        setDisplayFormState(false)
    }

    const displayForm = (modalBody) =>{
        setAppInfoModal(modalBody)
        setDisplayFormState(true)
    }


    var tableComponents = []
    var tableHeader = ""

switch(props.tableDataType){
    case "clients" :{
         tableHeader = 
                <tr>
                    <th>
                        <h3>Имя</h3>
                    </th>
                    <th>
                        <h3>Фамилия</h3>
                    </th>
                    <th>
                        <h3>Телефон</h3>
                    </th>
                    <th colSpan="6"></th>
                </tr>
       
        tableComponents = props.tableData.map(component => 
            <TableComponent 
                key={component.id} 
                id={component.id} 
                arg1 ={component.firstName} 
                arg2 = {component.lastName} 
                arg3 = {component.telephoneNumber} 
                handleDeleteClick={props.handleDeleteClick}
                isAdmin={props.isAdmin}/>
        )

        break;
    }
    case "employees" : {
         tableHeader = 
                <tr>
                    <th>
                        <h3>Имя</h3>
                    </th>
                    <th>
                        <h3>Фамилия</h3>
                    </th>
                    <th colSpan="6"></th>
                </tr>
         

        tableComponents = props.tableData.map(component => 
            <TableComponent 
                key={component.id} id={component.id} 
                arg1 ={component.firstName} 
                arg2 = {component.lastName} 
                handleDeleteClick={props.handleDeleteClick}
                isAdmin={props.isAdmin}/>
        )

        break;
    }
    case "schedule" : {
         tableHeader =
                    <tr>
                        <th>
                            <h3>Услуга</h3>
                        </th>
                        <th>
                            <h3>Дата</h3>
                        </th>
                        <th>
                            <h3>Время</h3>
                        </th>
                        <th>
                            <h3>Мастер</h3>
                        </th>
                        <th>
                            <h3><i className="fa fa-check"></i></h3>
                        </th>
                        <th colSpan="6"/>
                    </tr>

       tableComponents = props.secondaryTableData.map(secondComponent => {

                const filtered = props.tableData.filter(appointment => appointment.dayId === secondComponent.dayId)
                return filtered.map(component =>{
                        const employeesFirstName = component.employees.map(employee => employee.firstName.concat(' '))
                        const date = new Date(component.dateTime).toLocaleDateString()
                        const time = new Date(component.dateTime).getTime()

                        const infoModalBody = (
                        <InfoForm 
                            serviceName={component.service.service_name}
                            clientPhone={component.client.telephoneNumber}
                            clientName={component.client.firstName}
                            handleToggleClick = {handleCloseModal}
                            />)

                        return(
                            <TableComponent 
                            key={component.id} 
                            id={component.id}

                            dayId={component.dayId} 
                            arg1={
                                <button 
                                className="btn info-modal-button" 
                                onClick={() => displayForm(infoModalBody)}
                                >
                                    {component.service.service_name}
                                    </button>
                            }
                            arg2={date}
                            arg3={moment(time).format('HH:mm')} 
                            arg4={employeesFirstName} 
                            arg5= {component.confirmed ? <i className="fa fa-check green"></i> : <></>}
                            service={component.service}
                            dateTime={component.dateTime}
                            client={component.client}
                            scheduleElementType="appointments"
                            handleDeleteClick={props.handleDeleteClick}
                            handleUpdateClick={props.handleUpdateClick}
                            isAdmin={props.isAdmin}
                            serviceFlag = {true}/>
                        )
                        
                    })
                }
        )

        break;
    }
    case "services" : {
        tableHeader =
                <tr>
                    <th>
                        <h3>Услуга</h3>
                    </th>
                    <th>
                        <h3>Цена</h3>
                    </th>
                    <th>
                        <h3>Предп. длительность</h3>
                    </th>
                    <th colSpan="6"></th>
                </tr>

            tableComponents = props.tableData.map(component => {

                const estTime = String(component.estimatedTime).replace('PT', '')
                console.log(props.isAdmin)
                    return(
                        <TableComponent 
                        key={component.id} 
                        id={component.id} 
                        arg1 ={component.service_name} 
                        arg2 = {component.price} 
                        arg3 = {estTime} 
                        handleDeleteClick={props.handleDeleteClick} 
                        handleUpdateClick={props.handleUpdateClick}
                        serviceFlag = {true}
                        isAdmin={props.isAdmin}/>)
                    }
            )

        break;      
    }

    default: break;
}


    return (
        <div>
            <Modal 
                isOpen={displayFormState}
                id="form-modal"
                closeTimeoutMS={200}
                onRequestClose={()=>setDisplayFormState(false)}
                onClose={()=>setDisplayFormState(false)}>
                    {appInfoModal}
            </Modal>

            <div className="d-flex justify-content-center my-3">
                <table className="table table-striped">
                    <thead className="thead-dark">
                            {tableHeader}
                    </thead>
                    <tbody id = "dataTable">
                        {props.loadingState ? 
                            <tr>
                                <td colSpan="6">
                                    <Loader type="ThreeDots" color="#250A4D" height="100" width="100" />             
                                </td>
                            </tr>
                                            
                            :tableComponents}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
