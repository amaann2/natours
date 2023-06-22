import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTour } from "../../Redux/Tour/toursAction";
import './ManageTour.css'
import { getAllUser } from "../../Redux/User/userAction";
const AddTour = () => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.getUser);

    const [coverImage, setCoverImages] = useState(null)
    const [firstImage, setFirstImage] = useState(null)
    const [secondImage, setSecondImage] = useState(null)
    const [thirdImage, setThirdImage] = useState(null)
    const [inputData, SetInputData] = useState({
        name: "",
        duration: "",
        maxGroupSize: "",
        difficulty: "",
        price: "",
        summary: "",
        description: "",
        startDates: "",
        guides: "",

    });
    const onFileChange = (e) => {
        setCoverImages(e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        SetInputData({
            ...inputData,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('name', inputData.name)
        formData.append('duration', inputData.duration)
        formData.append('maxGroupSize', inputData.maxGroupSize)
        formData.append('difficulty', inputData.difficulty)
        formData.append('price', inputData.price)
        formData.append('summary', inputData.summary)
        formData.append('description', inputData.description)
        formData.append('startDates', inputData.startDates)
        formData.append('guides', inputData.guides)

        formData.append('imageCover', coverImage);
        formData.append('images', firstImage);
        formData.append('images', secondImage);
        formData.append('images', thirdImage);


        dispatch(createTour(formData))
        SetInputData({
            name: "",
            duration: "",
            maxGroupSize: "",
            difficulty: "",
            price: "",
            summary: "",
            description: "",
            startDates: "",
            guides: "",
        })
    }
    useEffect(() => {

        dispatch(getAllUser())
    }, [dispatch])

    const filter = users.filter(user => user.role === 'guide' || user.role === 'lead-guide')


    return <div className="Add-Tour">
        <form onSubmit={handleSubmit}>
            <h4>Tour Detail</h4>
            <hr />
            <input type="text" name="name" value={inputData.name} placeholder="Name" required onChange={handleChange} />
            <input type="text" name="summary" value={inputData.summary} placeholder="Summary" required onChange={handleChange} />
            <input type="text" name="description" value={inputData.description} placeholder="Description" onChange={handleChange} />
            <input type="number" name="price" value={inputData.price} placeholder="Price" required onChange={handleChange} />
            <input type="number" name="maxGroupSize" value={inputData.maxGroupSize} placeholder="maxGroupSize" required onChange={handleChange} />
            <input type="number" name="duration" value={inputData.duration} placeholder="duration" required onChange={handleChange} />
            <select name="difficulty" onChange={handleChange} >
                <option value="" selected required >select difficulty level</option>
                <option value="easy" >Easy</option>
                <option value="medium" >Medium </option>
                <option value="difficult" >Difficult </option>
            </select>

            <input type='date' name="startDates" placeholder="start dates" required value={inputData.startDates} onChange={handleChange} />

            <h4>Tour Cover Image</h4>
            <hr />
            <input type="file" onChange={onFileChange} />

            <h4>Tour Images</h4>
            <hr />
            <input type="file" name="images" id="" placeholder="image Cover" onChange={e => setFirstImage(e.target.files[0])} />
            <input type="file" name="images" id="" placeholder="image Cover" onChange={e => setSecondImage(e.target.files[0])} />
            <input type="file" name="images" id="" placeholder="image Cover" onChange={e => setThirdImage(e.target.files[0])} />

            <h4>Tour Location</h4>
            <hr />
            <input type="text" name="coordinates" placeholder="coordinates" onChange={handleChange} />
            <input type="text" name="coordinates" placeholder="coordinates" onChange={handleChange} />
            <input type="text" name="description" placeholder="description" onChange={handleChange} />
            <input type="text" name="address" placeholder="address" onChange={handleChange} />
            <input type="text" name="day" placeholder="day" onChange={handleChange} />

            <h4>Tour Guides</h4>
            <hr />
            <select name="guides" onChange={handleChange}  >
                {filter.map((user) => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                ))}
            </select>
            <hr />
            <button >Submit</button>


        </form>
    </div>;
};

export default AddTour;

// formData.append('imageCover')
// formData.append('images')
// formData.append('images')
// formData.append('images')
// formData.append('startDates')
// formData.append('startLocation')
// formData.append('locations')
// formData.append('guides')