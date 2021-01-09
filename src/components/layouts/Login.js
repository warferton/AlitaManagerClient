import React from 'react'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'

import {TextInput} from '../forms/formComponents/formComponents'

function Login(props){

        return (
            <Formik
                initialValues={{
                    username:'',
                    password:''
                }}
                validationSchema={
                    Yup.object({
                        username: Yup.string()
                        .required('Username is required')
                        .ensure(),

                        password: Yup.string()
                        .required('Password is required')
                        .ensure()

                    })
                }
                onSubmit = {(values, {setSubmitting}) =>{
                        setTimeout(() => {
                            props.handleLogin(values)
                            setSubmitting(false)
                        }, 300)
                }}
                >
            <Form>
            <div className="login-container">

                <div className="user-icon-container">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    width="64" 
                    height="64" 
                    fill="currentColor" 
                    className="bi bi-person-circle" 
                    viewBox="0 0 16 16">
                        <path 
                        id = "icon-circle"
                        d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
                        <path 
                        fillRule="evenodd" 
                        d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                        <path 
                        fillRule="evenodd" 
                        d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
                    </svg>

                </div>
                    <TextInput
                    id = "username-field"
                    placeholder="Имя пользователя"
                    name="username" 
                    type = "text"
                    />
                    
                    <TextInput
                    id = "password-field"
                    placeholder="Пароль"
                    name="password" 
                    type = "password"
                    />

                    <button 
                    className="btn-login" 
                    type="submit"
                    >Войти</button>

                    {
                        props.error &&

                        <div className="error alert alert-danger">
                            Неправильное имя пользователя или пароль
                        </div>
                    }
                    
                </div>
            </Form>
        </Formik>
        )
    }

export default Login