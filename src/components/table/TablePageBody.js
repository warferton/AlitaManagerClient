import React, {Component} from 'react'
import axios from 'axios'
import Modal from 'react-modal'

import Table from './Table'
import TableDataButtonGroup from './TableBtnGroup'
import TableToolGroup from './TableToolGroup'

import EmployeeForm from '../forms/EmployeeForm'
import AppointmentForm from '../forms/AppointmentForm'
import ClientForm from '../forms/ClientForm'
import ServiceForm from '../forms/ServiceForm'


class TablePageBody extends Component{
    constructor(props){
        super()
        this.state={
            loading: false,
            dataType : "",
            data : [],
            secondaryData : [],
            services : [],
            apiUrl: props.apiUrl,
            elementDeleted: false,
            displayForm: false,
            formProps: {},
            isAdmin : props.isAdmin
        }

        this.handleChangeDataTypeClick = this.handleChangeDataTypeClick.bind(this)
        this.handleToggleFormClick = this.handleToggleFormClick.bind(this)
        this.handleDeleteComponentClick = this.handleDeleteComponentClick.bind(this)
        this.handleAddOneElementClick = this.handleAddOneElementClick.bind(this)
        this.handleUpdateComponentClick = this.handleUpdateComponentClick.bind(this)
        this.fetchData = this.fetchData.bind(this)

    }


    fetchData() {
        this.setState({
            loading: true
        })

            if(this.state.dataType === "schedule"){
                const appointmentUrl = "/appointments"
                const workdayUrl = "/workdays"
                const servicesUrl = "services"

                const appointmentsGet = axios.get(this.state.apiUrl.concat(this.state.dataType).concat(appointmentUrl))
                const workdayGet = axios.get(this.state.apiUrl.concat(this.state.dataType).concat(workdayUrl))
                const servicesGet = axios.get(this.state.apiUrl.concat(servicesUrl))

                axios.all([appointmentsGet, workdayGet, servicesGet]).then(
                    axios.spread((...allData) => {
                        this.setState({
                            data: allData[0].data,
                            secondaryData: allData[1].data,
                            services: allData[2].data,
                            loading: false
                        })
                    })
                ).catch(err => {throw new Error('FETCH_ERROR')})
                
            }
            else{
                axios.get(this.state.apiUrl.concat(this.state.dataType))
                .then(responseData => {
                    this.setState({
                        data : responseData.data,
                        loading: false
                    })
                }).catch(err => {throw new Error('FETCH_ERROR')})
                
            }
        
    }

    componentDidMount(){
        if(this.state.dataType !== ""){
            this.fetchData()
        }
    }
    
    componentWillUnmount() {
    // fixes Warning: Can't perform a React state update on an unmounted component:

    //returns null when escapses component, it will no longer hold any data in memory

        this.setState = (state,callback)=>{
            return;
    }
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevState.dataType !== this.state.dataType){
            this.fetchData()
        }
        if(this.state.elementDeleted === true){
            this.fetchData()
            this.setState({elementDeleted: false})
        }
    }

    //
    handleChangeDataTypeClick(newDataType){
           this.setState({
                    dataType: newDataType
                })
                console.log(newDataType)
        }

    //    
    handleToggleFormClick(formProps){
        this.setState({
            displayForm: !this.state.displayForm,
            formProps: formProps
        })
    }
    
    //
    handleAddOneElementClick(data, requestBody){
        const extra = data ? ("/"+data):""

        axios.put(this.state.apiUrl
        .concat(this.state.dataType)
        .concat(extra)
        .concat("/add/one/"), requestBody)

    }
    //
    handleUpdateComponentClick(data, requestBody){
        const extra = data ? ("/"+data):""

        axios.post(this.state.apiUrl
        .concat(this.state.dataType)
        .concat(extra)
        .concat("/update/"), requestBody)

    }


    //
    handleDeleteComponentClick(dataElementId, dataType){
        const extra = dataType ? ("/"+dataType):""
        
        axios.delete(this.state.apiUrl
        .concat(this.state.dataType)
        .concat(extra)
        .concat("/delete/id/")
        .concat(dataElementId))

        setTimeout(()=>{
                this.setState({
                elementDeleted: true
            })
        }, 300)
        
    }

    render(){

        const form = (
                        (this.state.dataType === 'clients') ? 
                        (<ClientForm 
                        postUrl = {this.state.apiUrl.concat(this.state.dataType)}
                        handleToggleClick={this.handleToggleFormClick} 
                        handleSubmit={this.handleAddOneElementClick}
                        handleRefresh={this.fetchData}
                        className="input-form"/>) : 
                        
                        ((this.state.dataType === 'schedule') ? 
                        (<AppointmentForm 
                        isLoggedIn={true}
                        data={this.state.formProps}
                        postUrl = {this.state.apiUrl.concat(this.state.dataType)}
                        services = {this.state.services}
                        handleToggleClick={this.handleToggleFormClick} 
                        handleSubmit={this.handleAddOneElementClick}
                        handleUpdate={this.handleUpdateComponentClick}
                        handleRefresh={this.fetchData}
                        className="input-form"/>):  
                        
                        ((this.state.dataType === 'employees') ? 
                        (<EmployeeForm 
                        postUrl = {this.state.apiUrl.concat(this.state.dataType)}
                        handleToggleClick={this.handleToggleFormClick} 
                        handleSubmit={this.handleAddOneElementClick}
                        handleRefresh={this.fetchData}
                        className="input-form"/>) : 

                        ((this.state.dataType === 'services') ? 
                        (<ServiceForm 
                        postUrl = {this.state.apiUrl.concat(this.state.dataType)}
                        data={this.state.formProps}
                        handleToggleClick={this.handleToggleFormClick} 
                        handleSubmit={this.handleAddOneElementClick}
                        handleUpdate={this.handleUpdateComponentClick}
                        handleRefresh={this.fetchData}
                        className="input-form"/>) : null))
                        )
                    )
        
            
        return(
            <div>
                <Modal 
                isOpen={this.state.displayForm}
                id="form-modal"
                closeTimeoutMS={200}
                onRequestClose={()=>this.setState({displayForm: false})}
                onClose={()=>this.setState({displayForm: false})}>
                    {form}
                </Modal>
                <TableDataButtonGroup 
                isAdmin = {this.state.isAdmin}
                tableDataType={this.state.dataType} 
                handleClick={this.handleChangeDataTypeClick}/>

                {this.state.dataType==="" ? null : 
                <div>
                    <TableToolGroup 
                    tableDataType={this.state.dataType} 
                    handleClick={this.handleToggleFormClick}
                    handleRefresh={this.fetchData}/>
                    <Table 
                    isAdmin={this.state.isAdmin} 
                    tableData={this.state.data} 
                    secondaryTableData={this.state.secondaryData} 
                    tableDataType={this.state.dataType} 
                    handleDeleteClick={this.handleDeleteComponentClick} 
                    loadingState={this.state.loading}
                    handleUpdateClick={this.handleToggleFormClick} />
                 </div>}

            </div>
        )
    }
}

export default TablePageBody