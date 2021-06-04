import React, { useState } from "react";
import { FormControl, Button, TextField } from "@material-ui/core";
import { navigate } from "@reach/router";
import Cookies from "js-cookie";

const Login = () => {
  const [title, setTitle] = useState(null);
  const [password, setPassword] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mama im a criminal.
    if (!title || !password) {
      setShowError(true);
    } else {
      if (
        title.toLowerCase() === "donatas" &&
        password.toLowerCase() === "drakonukovos"
      ) {
        Cookies.set("isAdmin", true);
        navigate("/");
      } else {
        setShowError(true);
      }
    }
  };

  return (
    <div className="w-full flex justify-center py-6">
      <FormControl style={{ minWidth: 200 }}>
        <TextField
          id="name"
          variant="outlined"
          label="Vardas"
          onChange={(e) => setTitle(e.target.value)}
          value={title || ""}
        />
        <div className="my-5">
          <TextField
            id="password"
            variant="outlined"
            type="password"
            label="Slaptazodis"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Prisijungti
        </Button>
        {showError && (
          <p className="mt-5 bg-red-300 p-3 text-l text-red-700 font-bold">
            Neteisingai
          </p>
        )}
      </FormControl>
    </div>
  );
};

export default Login;
