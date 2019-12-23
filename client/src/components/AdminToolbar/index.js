import React from "react";
import { Button } from "@material-ui/core";
import { navigate } from "@reach/router";

const AdminToolbar = () => {
  return (
    <div className="hidden md:flex items-center py-4 mb-3 container--lg text-white">
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/event/add")}
      >
        Pridėti treniruotę
      </Button>
    </div>
  );
};

export default AdminToolbar;
