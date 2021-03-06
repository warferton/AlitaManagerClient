import React, {useState} from 'react'
import {Formik, Form, FieldArray} from 'formik'
import * as Yup from 'yup'

import {TextInput, SelectInput, CheckBoxInput, DatePickerField} from './formComponents/formComponents'

function GuestAppointmentForm(props){

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

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

    const serviceOptions = props.services.map(
        service => <option key={service.id} value={service.servcieName} data={service}>{service.service_name}</option>
    )

    const employeeOptions = props.employees.map(
        employee => <option key={employee} value={employee}>{employee}</option>
    )

    //pass current appointment vars
    const currenVariables = props.data

    console.log(currenVariables)

    const [updateFlag] = useState((typeof currenVariables !== 'undefined') ?
                                                    true : false)

     const [id] = useState((typeof currenVariables !== 'undefined') ?
                                    currenVariables.id : '')

    const [dateTime] = useState((typeof currenVariables !== 'undefined') ? 
                                                currenVariables.dateTime : null)

    const [client] = useState((typeof currenVariables !== 'undefined') ? currenVariables.client : {})
                                    
    const [service, setService] = useState((typeof currenVariables !== 'undefined') ?
                                    currenVariables.service : {})

    const [employees, setEmployees] = useState((typeof currenVariables !== 'undefined') ?
                                    currenVariables.employees : {})

    const [serviceTime, setServiceTime]= useState(service.estimatedTime)

    const [selectValueService, setSelectValueService] = useState(service.service_name)

    const [selectValueEmployee, setSelectValueEmployee] = useState()


    const handleSelectServiceChange = (event)=>{
        const {value} = event.target
        setServiceTime('')
        if(value !== '')
        {
            const svc = props.services.find(service => service.service_name === value)
            const estTime = svc.estimatedTime.replace('PT', '')
            
            setServiceTime(estTime)
            setService(svc)
        }
        setSelectValueService(value)

    }


    return(
        <Formik
            initialValues={{
                id: id,
                date_time: dateTime,
                service: selectValueService,
                client:{
                    first_name: client.firstName, 
                    telephone_number: client.telephoneNumber
                },
                employees:[{
                    first_name: ""
                }]
            }}
            validationSchema={
                Yup.object({
                    
                    date_time: Yup.string()
                    .required('Необходимо заполнить')
                    .nullable()
                    ,
                
                    service: Yup.string().required("Необходимо выбрать")
                    .notOneOf(['', 'Выбрать'])
                    .nullable()
                    ,

                    client: Yup.object().shape({
                        first_name: Yup.string().max(15, "Должно быть меньше 15 знаком").ensure(), 
                        telephone_number: Yup.string().required("Необходимо заполнить")
                        .matches(phoneRegExp, "Должно быть номером телефона")
                        .min(11, 'Должно быть минимум 11 знаков')
                        .max(12, 'Должно быть максимум 13 знаков')
                        .ensure(),
                    }),

                    employees: Yup.array().of(Yup.object({
                        first_name: Yup.string().notOneOf(['', 'Выбрать']).nullable().required("Необходимо Выбрать")
                    }).nullable()
                    ).compact()
                    
                })
            }
            onSubmit ={(values, {setSubmitting})=>{
                setTimeout(() => {
                    values.service = service;/////>>>>>
                    if(updateFlag) {
                        props.handleUpdate('appointments', values);
                    }
                    else{
                        props.handleSubmit("appointments", values)
                    }
                    setSubmitting(false)
                    values.service = service.service_name
                    setTimeout(() => {
                        props.handleRefresh()

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

                    <h2>{updateFlag ? "Изменить" : "Добавить"} запись</h2>

                    <div className="datepicker-container">
                        <h3>Дата&Время</h3>
                        <DatePickerField 
                            id="text-filed-1"
                            label = ""
                            name="date_time"
                            />
                    </div>

                    <div className="service-container">
                        <h3>Выбрать Услугу</h3>
                        <SelectInput label="Услуга" name="service" id="select-field-2"
                            value ={selectValueService} onChange={(e) =>{
                                handleSelectServiceChange(e)
                                values.service = e.target.value
                                }
                            }>
                            <option value="">Выбрать</option>
                            {serviceOptions}
                        </SelectInput>

                        <TextInput
                        id="text-filed-3"
                        label = "Длительность"
                        name = "estimatedTime"
                        type="text"
                        value={serviceTime}
                        readOnly = {true}
                        />
                    </div>
                    <div>
                        <h3>Личная Инф.</h3>
                        <TextInput
                            id="text-filed-4"
                            label = "Телефон"
                            name = "client.telephone_number"
                            type="phone"
                            placeholder = "8-123-456-78-90"
                            /> 
                        <TextInput
                            id="text-filed-4"
                            label = "Имя (Не обязательно)"
                            name = "client.first_name"
                            type="text"
                            /> 
                    </div>
                    {props.isLoggedIn &&
                        <CheckBoxInput id="text-field-5" name="confirmed">Подтвержденная запись?</CheckBoxInput>
                    }
                    <FieldArray
                        name="employees"
                        >
                        {({insert, remove, push})=> (
                            <div>
                                <h3>Указать мастера</h3>
                                {values.employees.length > 0 &&
                                values.employees.map((employee, index) =>(
                                    <div className ="row" key={index}>
                                        <div className="col">

                                            <SelectInput label="Имя" name={`employees.${index}.first_name`} id="text-filed-5"
                                                // value ={selectValueEmployee} onChange={(e) =>{
                                                //     const indx = e.target.name.substring(10)
                                                //     console.log(indx)
                                                //     values.employees.[indx].first_name = e.target.value
                                                //     console.log(values.employees)
                                                //     }}
                                                >
                                                <option value="">Выбрать</option>
                                                {employeeOptions}
                                            </SelectInput>

                                            {/* <TextInput
                                            id="text-filed-5"
                                            label = "Имя"
                                            name = {`employees.${index}.firstName`}
                                            type="text"
                                            placeholder = "Alice"
                                            /> */}
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
                                onClick={() => push({})}>
                                    Добавить мастера
                                </button>
                            </div>
                        )}
                    </FieldArray>

                    <button 
                    className="btn btn-secondary add-btn"
                    id="btn-submit"
                    type = "submit"
                    >
                        {updateFlag ? "Изменить" :"Добавить"}
                    </button>
                </Form>
            )}
            
        </Formik>
    )

}

export default GuestAppointmentForm