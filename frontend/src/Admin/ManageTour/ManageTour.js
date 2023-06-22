import React, { useState } from 'react'
import './ManageTour.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getTours } from '../../Redux/Tour/toursAction'
const ManageTour = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const handleSubmit = () => {
        dispatch(getTours(name))
    }
    return (
        <div className='container' style={{ marginTop: '2rem' }}>
            <div className="search-bar">
                <div className="input" >
                    <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='search' />
                    <button onClick={handleSubmit}>search</button>
                </div>
                <div className="add">
                    <button><Link to='/admin/tour/add'>Add Tour</Link></button>
                </div>
            </div>
            <div className="table"></div>
        </div >
    )
}

export default ManageTour