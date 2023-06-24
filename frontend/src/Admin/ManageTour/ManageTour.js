import React, { useEffect, useState } from "react";
import "./ManageTour.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "../../Redux/Tour/toursAction";
import { TailSpin } from "react-loader-spinner";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
const ManageTour = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tours, loading } = useSelector((state) => state.tours);
  const [search, setSearch] = useState(" ");
  const [filterTour, setFilterTour] = useState(tours);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch, deleteLoading]);

  const handleEditClick = (tour, source) => {
    navigate("/admin/tour/add", { state: { tour, source } });
  };

  const handleDeleteClick = async (id) => {
    window.alert("Are you want to delete? Confirm Delete");
    try {
      setDeleteLoading(true);
      const res = await axios.delete(`/api/v1/tours/${id}`, {
        withCredentials: true,
      });
      if (res.status === 204) {
        toast.success("Deleted");
      }
      setDeleteLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setDeleteLoading(false);
    }
  };
  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    const filteredData = tours.filter((tour) =>
      tour.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterTour(filteredData);
  };

  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      {loading && deleteLoading ? (
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
      ) : (
        <>
          <div className="search-bar">
            <div className="input">
              <input
                type="text"
                name="name"
                placeholder="search"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <div className="add">
              <button>
                <Link to="/admin/tour/add">Add New Tour</Link>
              </button>
            </div>
          </div>
          <div className="table">
            <table>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>price</th>
                <th></th>
                <th></th>
              </tr>
              {filterTour.map((tour) => (
                <tr key={tour?._id}>
                  <td>{tour?._id}</td>
                  <td>{tour?.name}</td>
                  <td>{tour?.startLocation?.description}</td>
                  <td>{tour?.price}</td>
                  <td
                    onClick={() => handleEditClick(tour, "edit")}
                    style={{ cursor: "pointer" }}
                  >
                    <BiEdit />
                  </td>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(tour._id)}
                  >
                    <AiFillDelete />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageTour;
