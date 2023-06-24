import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ManageTour.css";
import { getAllUser } from "../../Redux/User/userAction";
import { useLocation } from "react-router-dom";
import LocationInput from "./AddTourInput/LocationInput";
import ImagesInput from "./AddTourInput/ImagesInput";
import TourDetailInput from "./AddTourInput/TourDetailInput";
import CoverImage from "./AddTourInput/CoverImage";
import GuideInput from "./AddTourInput/GuideInput";
import TourStartLocation from "./AddTourInput/TourStartLocation";
import axios from "axios";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";



const AddTour = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const { users } = useSelector((state) => state.getUser);
  const { tour, source } = location.state || {};
  const isEdit = source === "edit";
  const [coverImage, setCoverImages] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [locations, setLoactions] = useState([]);
  const [loading, setLoading] = useState(false)

  const [inputData, SetInputData] = useState({
    name: tour?.name || "",
    duration: tour?.duration || "",
    maxGroupSize: tour?.maxGroupSize || "",
    difficulty: tour?.difficulty || "",
    price: tour?.price || "",
    summary: tour?.summary || "",
    description: tour?.description || "",
    startDates: tour?.startDates || "",
    guides: "",
  });


  const onFileChange = (e) => {
    setCoverImages(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetInputData({
      ...inputData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "addButton") {
      return;
    }

    let formData = new FormData();
    formData.append("name", inputData.name);
    formData.append("duration", inputData.duration);
    formData.append("maxGroupSize", inputData.maxGroupSize);
    formData.append("difficulty", inputData.difficulty);
    formData.append("price", inputData.price);
    formData.append("summary", inputData.summary);
    formData.append("description", inputData.description);
    formData.append("startDates", inputData.startDates);
    formData.append("guides", inputData.guides);
    formData.append("imageCover", coverImage);
    formData.append("images", firstImage);
    formData.append("images", secondImage);
    formData.append("images", thirdImage);
    locations.forEach((location, index) => {
      formData.append(`locations[${index}][coordinates]`, location.coordinates);
      formData.append(`locations[${index}][address]`, location.address);
      formData.append(`locations[${index}][description]`, location.description);
      formData.append(`locations[${index}][day]`, location.day);
    });

    if (isEdit) {
      try {
        setLoading(true)
        const res = await axios.patch(`/api/v1/tours/${tour._id}`, formData, { withCredentials: true })
        toast.success(res.data.status, { position: 'bottom-center' })
        setLoading(false)
      } catch (error) {
        toast.error(error.response.data.message, { position: 'bottom-center' })
        setLoading(false)
      }
    } else {
      try {
        setLoading(true)
        const res = await axios.post('/api/v1/tours', formData, { withCredentials: true })
        toast.success(res.data.status, { position: 'bottom-center' })
        setLoading(false)
      } catch (error) {
        toast.error(error.response.data.message, { position: 'bottom-center' })
        setLoading(false)
      }

    }

  };
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);



  return (
    <div className="Add-Tour">
      {loading ?
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        :
        <form onSubmit={handleSubmit}>
          <TourDetailInput handleChange={handleChange} inputData={inputData} />
          <CoverImage onFileChange={onFileChange} />
          <ImagesInput setFirstImage={setFirstImage} setSecondImage={setSecondImage} setThirdImage={setThirdImage} />
          <TourStartLocation locations={locations} setLoactions={setLoactions} />
          <LocationInput locations={locations} setLoactions={setLoactions} />
          <GuideInput users={users} handleChange={handleChange} />
          <hr />
          <button type="submit"> {isEdit ? "Update Tour" : "Create Tour"}</button>
        </form>
      }
    </div>
  );
};

export default AddTour;

