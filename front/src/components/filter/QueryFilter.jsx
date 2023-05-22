import React from "react";
import { useState } from "react";
import "./queryfilter.css";

export default function QueryFilter({ searchMember, getMembers }) {
  // State information for the filter by MemberId or RFID or both
  const [memberId, setMemberId] = useState("");
  const [rfid, setRfId] = useState("");
  const [fullName, setFullName] = useState("");
  // For page navigation during button click


  // Display the filter jsx
  return (
    <div className="filter">
      <div className="filterFields">
        <label htmlFor="fullName" className="filterLabel">
          Full Name:
        </label>
        <input
          name="fullName"
          className="filterInputs"
          type="text"
          placeholder="Enter full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <label htmlFor="memberId" className="filterLabel">
          Member ID :
        </label>
        <input
          name="memberId"
          className="filterInputs"
          type="text"
          placeholder="Enter Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
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
          value={rfid}
          onChange={(e) => setRfId(e.target.value)}
        />
      </div>
      <div className="filterFields">
        <div className="btn-container">
        
          <button
            type="button"
            className="queryBtn"
            onClick={() => searchMember(fullName, memberId, rfid)}
          >
            Search Member
          </button>

          
        </div>
      </div>
    </div>
  );
}
