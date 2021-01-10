import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

import axios from 'axios'
import AppointmentForm from '../forms/AppointmentForm'

import Nav from '../Nav'



function HomePage(props){

    const apiUrl = props.apiUrl

    Modal.setAppElement('#root')

    const [displayForm, setDisplayForm] = useState(false)

    const [serviceData, setServiceData] = useState([])


    useEffect(() => {
        let isMounted = true

        axios.get(apiUrl + 'services').then((response) => isMounted && setServiceData(response.data))
        .catch((error) => {console.error(error)})

        return () => {isMounted = false}

    },[apiUrl])

    


    const handleAddAppointment = (data, requestBody) => { //!!HARDCODED URL!! 
                                                         //Absolutely atrocious decision but it should work for now
        const extra = data ? ("/"+data):""

        axios.put(apiUrl
        .concat('schedule')
        .concat(extra)
        .concat("/add/one/"), requestBody).then((response =>{
            if(response.status === 200 || response.status === 201) {
                alert("Запись успешно добавлена!")
            }
        }))
        .catch(error => {
            if(error.response.status === 507){
                alert("Данное время уже зарезервировано")
            }
            else{
                alert("Произошла ошибка при проведении запроса.")
            }
        console.log(error.message)
        }
        )

    }
        

    const form = (
                <AppointmentForm 
                        postUrl = {apiUrl.concat('schedule/appointments')} //!!HARDCODED URL!!
                        services = {serviceData}
                        handleToggleClick={()=>{setDisplayForm(!displayForm)
                                                    console.log(displayForm)}} 
                        handleSubmit={handleAddAppointment}
                        handleRefresh={()=>{}}
                        className="input-form"
                        />
                    )


    return (
        <>
            <Nav navHeader='Alita' logOption="login"/>

            <Modal 
                isOpen={displayForm}
                id="form-modal"
                closeTimeoutMS={200}
                onRequestClose={()=>setDisplayForm(false)}
                onClose={() => setDisplayForm(false)}>

                {form}

            </Modal>
            
            <div className='homePage-btn-container-1'>
                <div className='homePage-btn-container-2'>
                    <button className="create-appointment-button" onClick={() => setDisplayForm(!displayForm)}>
                        <p>Записаться</p>
                    </button>
                </div>
            </div>

        </>
    )

}

export default HomePage