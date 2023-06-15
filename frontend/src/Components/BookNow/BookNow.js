import React from 'react'
import './booknow.css'
const BookNow = () => {
    return (
        <div className="book-now">

            <div className='container' id='book-now'>
                <div className="row">
                    <div className="col-2" >
                        <h3 className='book-now-heading'>Embark on Your Next Adventure! Book Now and Create Memories That Last a Lifetime.</h3>
                    </div>
                    <div className="col-2" >
                        <button className='btn-book-now'>Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookNow