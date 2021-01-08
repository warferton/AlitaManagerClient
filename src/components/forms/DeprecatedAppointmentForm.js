import React, {useState} from 'react'
import {Formik, Form, FieldArray} from 'formik'
import * as Yup from 'yup'

import {TextInput, SelectInput, DatePickerField} from './formComponents/formComponents'

function AppointmentForm(props){

    const crossButton = (
        <svg 
        width="1.5em" 
        height="1.5em" 
        viewBox="0 0 16 16" 
        className="bi bi-x" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg">
            <path 
            fillRule="evenodd" 
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
    )

    // const inputRef = useRef(null)

    const serviceOptions = props.services.map(
        service => <option key={service.id} value={service.servcieName} data={service}>{service.service_name}</option>
    )
    

    const [serviceTime, setServiceTime]= useState('')
    const [selectValue, setSelectValue] = useState('')
    const [service, setService] = useState({})


    const handleSelectChange = (event)=>{
        const {value} = event.target
        setServiceTime('')
        if(value !== '')
        {
            const svc = props.services.find(service => service.service_name === value)
            const estTime = svc.estimatedTime.replace('PT', '')
            
            setServiceTime(estTime)
            setService(svc)
        }
        setSelectValue(value)

    }

    return(
        <Formik
            initialValues={{
                date_time: null,
                service: selectValue,
                employees:[{
                    firstName:'', 
                    lastName:''
                }]
            }}
            validationSchema={
                Yup.object({
                    
                    date_time: Yup.string()
                    .required('Required')
                    .nullable()
                    ,
                
                    service: Yup.string().required().notOneOf(['', 'Select service'])
                    .nullable()
                    ,

                    employees: Yup.array().of(Yup.object()
                    .shape({
                        firstName: Yup.string().ensure().required('Required'),
                        lastName: Yup.string().ensure()
                    })
                    ).compact()
                    
                })
            }
            onSubmit ={(values, {setSubmitting})=>{
                setTimeout(() => {
                    console.log(values.date_time)
                    values.service = service;
                    props.handleSubmit("appointments", values)
                    setSubmitting(false)
                    setTimeout(() => {
                        props.handleRefresh()
                        props.handleToggleClick()
                    }, 100)
                }, 300)
            }}
        
        >
            {({values}) => (
                <Form >
                    <button 
                    onClick = {() => props.handleToggleClick()}
                    id="btn-cross"
                    className="btn btn-secondary btn-add"
                    type = "button"
                    >
                        {crossButton}
                    </button>

                    <h2>Add Appointment</h2>

                   <DatePickerField 
                    id="text-filed-1"
                    label = "Date"
                    name="date_time"
                    />

                    <SelectInput label="Service" name="service" id="select-field-2"
                                value ={selectValue} onChange={(e) =>{
                                    handleSelectChange(e)
                                    values.service = e.target.value
                                    }
                                }>
                        <option value="">Select service</option>
                        {serviceOptions}
                    </SelectInput>

                    <TextInput
                    id="text-filed-3"
                    label = "Duration"
                    name = "estimatedTime"
                    type="text"
                    value={serviceTime}
                    readOnly = {true}
                    />

                    <FieldArray
                        name="employees"
                        >
                        {({insert, remove, push})=> (
                            <div>
                                {values.employees.length > 0 &&
                                values.employees.map((employee, index) =>(
                                    <div className ="row" key={index}>
                                        <div className="col">
                                            <TextInput
                                            id="text-filed-3"
                                            label = "First Name"
                                            name = {`employees.${index}.firstName`}
                                            type="text"
                                            placeholder = "Alice"
                                            />
                                        </div>
                                        <div className="col">
                                            <TextInput
                                            id="text-filed-3"
                                            label = "Last Name"
                                            name = {`employees.${index}.lastName`}
                                            type="text"
                                            placeholder = "Doe"
                                            />
                                        </div>
                                        <div className="col">
                                            <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => remove(index)}
                                            >
                                                {crossButton}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => push({firstName:'', lastName:''})}>
                                    Add Employee
                                </button>
                            </div>
                        )}
                    </FieldArray>

                    <button 
                    className="btn btn-secondary add-btn"
                    id="btn-submit"
                    type = "submit"
                    >
                        Add
                    </button>
                </Form>
            )}
            
        </Formik>
    )

}

export default AppointmentForm