import React from "react";
import { useNavigate } from "react-router-dom";
import "./queryfilter.css";

export default function QueryFilter({ searchMember, getMembers }) {

  const navigate = useNavigate();

  return (
    <div className="filter">
      <div className="filterFields">
        <label htmlFor="memberId" className="filterLabel">
          Member ID :
        </label>
        <input
          name="memberId"
          className="filterInputs"
          type="text"
          placeholder="Enter Member ID"

        />
      </div>
      <div className="filterFields">
        <label htmlFor="rfid" className="filterLabel">
          RFID :
        </label>
        <input
          name="rfid"
          className="filterInputs"
          type="text"
          placeholder="Enter RFID"

        />
      </div>
      <div className="filterFields">
        <div className="btn-container">
          <button
            type="button"
            className="queryBtn"

          >
            Search Member
          </button>

          <button
            type="button"
            className="queryBtn"
            onClick={() => navigate("/add")}
          >
            Add Member
          </button>
          
        </div>
      </div>
    </div>
  );
}
