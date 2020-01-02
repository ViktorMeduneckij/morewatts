import React, { useState, useEffect } from "react";
import { Button, Dialog } from "@material-ui/core";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Cookies from "js-cookie";
import { MW_MEMBERS } from "../../constants";

const AdminToolbar = ({ addEvent, editEvent, deleteEvent, type }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [display, setDisplay] = useState(null);

  const [eventId, setEventId] = useState(
    window.location.pathname.split("/").pop()
  );

  const deleteEventFromPlatform = () => {
    fetch(`/api/v.1.0/event/delete/${eventId}`).then(navigate("/"));
  };

  useEffect(() => {
    const userName = Cookies.get("name");
    const admin = MW_MEMBERS.filter(
      member => member.name === userName && member.admin === true
    );

    if (admin.length > 0) {
      setDisplay(true);
    }
  });

  return (
    display == true &&
    display === true && (
      <div className="flex items-center py-4 mb-3 container--lg text-white">
        {addEvent && (
          <div className="mr-5">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/event/add")}
            >
              Pridėti treniruotę
            </Button>
          </div>
        )}
        {editEvent && (
          <div className="mr-5">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/event/edit/${eventId}?type=${type}`)}
            >
              Redaguoti treniruotę
            </Button>
          </div>
        )}
        {deleteEvent && (
          <div className="mr-5">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setDeleteModalOpen(true)}
            >
              Naikinti treniruotę
            </Button>
          </div>
        )}
        <Dialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Ar tikrai naikinti?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Panaikinus treniruote ji dings is platformos.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteModalOpen(false)} color="secondary">
              Ne
            </Button>
            <Button onClick={deleteEventFromPlatform} color="primary" autoFocus>
              Taip
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  );
};

AdminToolbar.propTypes = {
  addEvent: PropTypes.bool,
  editEvent: PropTypes.bool,
  deleteEvent: PropTypes.bool,
  type: PropTypes.string,
};

export default AdminToolbar;
