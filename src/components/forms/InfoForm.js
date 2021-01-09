import React from 'react'

export function InfoForm(props){

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
        <div className="info-modal">
            <button
                style={{float: 'right'}}
                onClick={props.handleToggleClick}
                id="btn-cross"
                className="btn btn-secondary add-btn"
                type = "button"
                >
                    {crossButton}
            </button>


            <h3>Информация по записи</h3>

            <label htmlFor="serviceName">Услуга</label>
            <input type="text" readOnly={true} name='serviceName' className="form-control text-input" value={props.serviceName}/>

            <label htmlFor="phone">Телефон Клиента</label>
            <input type="text" readOnly={true} name='phone' className="form-control text-input" value={props.clientPhone}/>

            <label htmlFor="clientName">Имя Клиентв</label>
           <input type="text" name="clientName" readOnly={true} className="form-control text-input" value={props.clientName}/>
        </div>
    )

}