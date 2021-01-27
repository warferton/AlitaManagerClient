import React, {useState} from 'react'
import {useField, Field} from 'formik'
import DatePicker from 'react-datepicker'
import setHours from "date-fns/setHours"
import setMinutes from "date-fns/setMinutes"
import addMonths from "date-fns/addMonths"

import 'react-datepicker/dist/react-datepicker.css'

import { registerLocale } from "react-datepicker";
import ro from 'date-fns/locale/ro';
registerLocale("ro", ro)

export const TextInput = ({label, ...props}) =>{
    const [field, meta] = useField(props)
    return(
        <div className="form-group">
            <label htmlFor={props.name || props.id}>{label}</label>
            <input className="form-control text-input" {... field} {... props}/>
            
            {meta.touched && meta.error ? (
                <div className="error alert alert-danger">{meta.error}</div>
                ): null }
        </div>
    )
}

export const CheckBoxInput = ({children, ...props}) =>{
    const [field, meta] = useField({...props, type: 'checkbox'})
    return (
        <div className="form-group form-check">
            <label className='checkbox-label'>
                <input type="checkbox" className="form-checkbox-input"{... field} {... props}/>
                {children}
            </label>

            {meta.touched && meta.error ? (
                <div className="error alert alert-danger">{meta.error}</div>
                ): null }
        </div>
    )

}

export const SelectInput = ({label, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <div className="form-group form-select">
            <label htmlFor={props.id || props.name}> {label} </label>
            <select {...field} {...props} />
            {meta.touched && meta.error ?(
                <div className="error alert alert-danger"> {meta.error} </div>
            ) : null}
            
        </div>
    )
}


export const DatePickerField = (props) => {

    const { label, name, ...rest} = props
    const [meta] = useField(props)
    const [startDate, setStartDate] = useState( new Date())
    

    return(
        <div className= "form-group form-date">
            <label htmlFor={name}>{label}</label>
            <Field name={name}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form
                        // const {value} = field
                        return (
                            <DatePicker
                            id = {name}
                            {...field}
                            {...rest}
                            showTimeSelect
                            minDate={new Date()}
                            maxDate={addMonths(new Date(), 1)}
                            showDisabledMonthNavigation
                            dateFormat="yyyy-MM-dd | HH:mm"
                            selected = {startDate}
                            minTime={setHours(setMinutes(new Date(), 0), 8)}
                            maxTime={setHours(setMinutes(new Date(), 30), 22)}
                            locale="ro"
                            onChange = { val => {
                                setFieldValue(name, val)
                                setStartDate(val)
                            }}
                            />
                        )
                    }
                }  
            </Field>
            {meta.touched && meta.error ? (
                                <div className="error alert alert-danger">{meta.error}</div>
                                ): null }
        </div>
    )
}

