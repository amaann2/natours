import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../Redux/User/userAction";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { Avatar, Box, Typography } from "@mui/material";
import UserAction from "./UserAction";

const User = () => {
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.getUser);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    if (error) toast.error(error);
    dispatch(getAllUser());
  }, [dispatch, error]);


  const columns = [
    {
      field: "photo",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => <Avatar src={`/img/users/${params.row.photo}`} />,
      sortable: false,
      filterable: false,
    },
    { field: "name", headerName: "name", width: 200 },
    { field: "email", headerName: "email", width: 250 },
    {
      field: "role",
      headerName: "role",
      width: 160,
      type: "singleSelect",
      valueOptions: ["user", "admin", "lead-guide", "guide"],
      editable: true,
    },
    { field: "_id", headerName: "id", width: 220 },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      width: 100,
      renderCell: (params) => <UserAction {...{ params, rowId, setRowId }} />,
    },
    [rowId],
  ];
  return (
    <div className="container" style={{ marginTop: "2rem" }}>
      <Box
        sx={{
          height: 530,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          sx={{ textAlign: "center", mt: 2, mb: 2 }}
        >
          Users
        </Typography>
        {loading ? (
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
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[2, 3, 4]}
            pageSize={5}
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
            onCellEditStop={(params) => {
              setRowId(params.id);
            }}
          />
        )}
      </Box>
    </div>
  );
};

export default User;
