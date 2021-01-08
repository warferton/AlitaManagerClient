import React from 'react'

function TableToolGroup(props){



const addIcon = (props.tableDataType === "schedule") ? 
    (<svg 
        width="1.5em" 
        height="1.5em" 
        viewBox="0 0 16 16" 
        className="bi bi-calendar-plus" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" 
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            <path fillRule="evenodd" 
            d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/>
    </svg>) : 

    (props.tableDataType === "services") ?

        (
            <svg 
            
            xmlns="http://www.w3.org/2000/svg" 
            width="1.5em" 
            height="1.5em" 
            fill="currentColor" 
            className="bi bi-patch-plus-fll" 
            viewBox="0 0 16 16">
                <path 
                fillRule="evenodd" 
                d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"/>
        </svg>) :
        
        (<svg 
            width="1.5em" 
            height="1.5em" 
            viewBox="0 0 16 16" 
            className="bi bi-person-plus" 
            fill="currentColor" 
            xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" 
                d="M8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10zM13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
        </svg>)

    return (
        <>
            <div className="table-tools">
                <button title="Add Element"
                className="btn btn-secondary btn-lg add-btn "
                onClick={() => props.handleClick()}>
                   {addIcon}
                </button>


                {/* No code implementation yet */}
                
                {/* <div className="search-container">
                    <input 
                    type="search" 
                    className="search-field" 
                    placeholder="Find..."
                    value = {searchValue}
                    readOnly={true} 
                    onChange={(e) =>{
                        setSearchValue(e.target.value);
                    }}
                    />
                    <button 
                    className="btn btn-secondary btn-lg search-btn"
                    title="Search"
                    onClick ={(e) => props.handleSearch(searchValue)}
                    >
                        <svg width="1em" 
                        height="1em" 
                        viewBox="0 0 16 16" 
                        className="bi bi-search" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" 
                            d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                            <path fillRule="evenodd" 
                            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>
                    </button>
                </div> */}

                <button
                    onClick={() => props.handleRefresh()}
                    className="btn btn-secondary btn search-btn"
                    title='Refresh the table'>
                    <svg 
                        width="2em" 
                        height="2em" 
                        viewBox="0 0 16 16" 
                        className="bi bi-arrow-clockwise" 
                        fill="currentColor" 
                        xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                    </svg>
                </button>
            </div>
        </>
    )
}

export default TableToolGroup