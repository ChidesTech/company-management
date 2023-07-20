import React from 'react'

const Pagination = ({ nPages , currentPage, setCurrentPage } : any) => {

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    

    const nextPage = () => {
            if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav style={{cursor : "pointer"}}>
            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <span className="page-link" 
                        onClick={prevPage} 
                        >
                        
                        Previous
                    </span>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} 
                        className= {`page-item ${currentPage == pgNumber ? 'page-link-active' : ''} `} >

                        <span onClick={() => setCurrentPage(pgNumber)}  
                            className='page-link' >
                            
                            {pgNumber}
                        </span>
                    </li>
                ))}
                <li className="page-item">
                    <span className="page-link" 
                        onClick={nextPage}
                        >
                        
                        Next
                    </span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination