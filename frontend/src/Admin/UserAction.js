import { Box, CircularProgress, Fab } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Check, Save } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
const UserAction = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSucess] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { role, _id } = params.row;

      const res = await axios.patch(
        `/api/v1/users/${_id}`,
        { role },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.status);
      if (res) {
        setSucess(true);
        setRowId(null);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (rowId === params.id && success) setSucess(false);
  }, [rowId, params.id, success]);
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "green",
            "&:hover": { bgcolor: "green[700]" },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: "green[500]",
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default UserAction;
