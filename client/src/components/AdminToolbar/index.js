import React from "react";
import Cookies from "js-cookie";

const AdminToolbar = () => {
  return (
    <div className="bg-blue-500 flex items-center py-4 mb-3 container--lg text-white">
      <a href="/event/add">Pridėti treniruotę</a>
    </div>
  );
};

export default AdminToolbar;
