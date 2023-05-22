import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      await axios.delete("http://localhost:5000/api/scan/", {
      params: { memberId: { $exists: false } },
    });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="projectHeader">
      <h1>RFID FITNESS CENTER</h1>
      <div className="filterFields">
        <div className="header-btn-container">
        <button
            type="button"
            className="headerBtn"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            type="button"
            className="headerBtn"
            onClick={() => navigate("/log")}
          >
            Logs
          </button>
          <button
            type="button"
            className="headerBtn"
            onClick={() => {
              handleSubmit();
              navigate("/add");
            }}
            
          >
            Add Member
          </button>
        </div>
      </div>
    </div>

  );
}
