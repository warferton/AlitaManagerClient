import React from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'

import {TextInput} from './formComponents/formComponents'

function EmployeeForm(props){

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

        

    return(
        <>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: ''
                }}
                validationSchema ={
                    Yup.object({
                        firstName: Yup.string()
                        .max(30, 'Must be less then 30 characters long')
                        .required('Required'),

                        lastName: Yup.string()
                        .max(30, 'Must be less then 30 characters long')
                        .required('Required')
                    })
                }
                onSubmit = {(values, {setSubmitting}) =>{
                    setTimeout(() => {
                        props.handleSubmit("",values);
                        setSubmitting(false)
                        setTimeout(()=>{
                            props.handleRefresh()
                            props.handleToggleClick()
                        },10)
                        
                    }, 300)
                }}
                
            >
                <Form>
                        <button 
                        onClick={()=>props.handleToggleClick()}
                        id="btn-cross"
                        className="btn btn-secondary add-btn"
                        type="button">
                            {crossButton}
                        </button>

                        <h2>Add Employee</h2>

                        <TextInput
                        id="text-field-1"
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="John"
                        />

                        <TextInput
                        id="text-field-2"
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Smith"
                        />

                    <button 
                        type="submit" 
                        id="btn-submit"
                        className="btn btn-secondary btn add-btn"
                        >Submit
                    </button>
                </Form>
            </Formik>
        </>
    )
}

export default EmployeeForm