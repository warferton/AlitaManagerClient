import React, {useState} from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'

import {TextInput} from './formComponents/formComponents'

function ServiceForm(props){

    //pass current service vars
    const currenVariables = props.data

    console.log(currenVariables)
    

    const [service_name, setServiceName] = useState((typeof currenVariables !== 'undefined') ?
                                                    currenVariables.arg1 : '')
    const [price, setPrice] = useState((typeof currenVariables !== 'undefined') ?
                                                    currenVariables.arg2 : '')
    const [estTime, setEstTime] = useState((typeof currenVariables !== 'undefined') ?
                                                    currenVariables.arg3 : '')
                                                    
    const [updateFlag] = useState((typeof currenVariables !== 'undefined') ?
                                                    true : false)

    const [id] = useState((typeof currenVariables !== 'undefined') ?
                                    currenVariables.id : '')
    
    const indicatorHeader = updateFlag ?
                                    "Update " : "Add "


    const crossButton = 
        (<svg 
        width="1.5em" 
        height="1.5em" 
        viewBox="0 0 16 16" 
        className="bi bi-x" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg">
            <path 
            fillRule="evenodd" 
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>)


    return (
        <Formik
            initialValues={{
                id: id,
                service_name: service_name,
                price: price,
                estimatedTime: estTime,
            }}
            validationSchema={
                Yup.object({
                    service_name: Yup.string()
                    .max(30, 'Должен быть меньше 30 знаков')
                    .required('Необходимо заполнить'),

                    price: Yup.number()
                    .max(20000, "Слишком высокое значения")
                    .min(200, "Слишком низкое значение")
                    .required('Необходимо заполнить'),

                    estimatedTime: Yup.string()
                    .required('Необходимо заполнить')

                })
            }
            onSubmit = {(values, {setSubmitting}) =>{
                    
                    values.estimatedTime = 'PT' + values.estimatedTime + 'M'
                    setTimeout(() => {
                        //decide if send POST or PUT reuest
                        if(updateFlag){
                            props.handleUpdate('', values )
                            console.log(values)
                        }
                        else{
                            props.handleSubmit("", values)
                        }
                    
                        setSubmitting(false)
                        setTimeout(() => {
                            props.handleRefresh()
                            props.handleToggleClick()
                        }, 200)
                    }, 300)
            }}
        >
            <Form>
                <button
                onClick={()=> props.handleToggleClick()}
                id="btn-cross"
                className="btn btn-secondary add-btn"
                type = "button"
                >
                    {crossButton}
                </button>

                <h2>{indicatorHeader}Service</h2>

                <TextInput
                id = "text-field-1"
                label = "Service Name"
                name = "service_name"
                type = "text"
                placeholder = "Haircut"
                />

                <TextInput
                id = "text-field-2"
                label = "Price"
                name = "price"
                type = "text"
                placeholder = "400"
            
                />

                <TextInput
                id = "text-field-3"
                label = "Estimated Time"
                name = "estimatedTime"
                type = "string"
                placeholder = "time in minutes"
                
                />

                <button 
                type="submit"
                id="btn-submit"
                className="btn btn-secondary add-btn"
                >Submit
                </button>

            </Form>
        </Formik>
    )

}

export default ServiceForm