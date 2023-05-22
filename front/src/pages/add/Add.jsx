import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import "./add.css";

export default function Add() {
  // For navigation during button click
  const navigate = useNavigate();
  const [scans, setScans] = useState([]);

  const fetchScans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/members", {
        params: { memberId: { $exists: false } },
      });
      setScans([response.data[response.data.length - 1].uid]);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchScans();
    }, 1000); // polling setiap 1 detik

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // State object of our member
  const [member, setMember] = useState({
    memberId: "",
    fullName: "",
    memberActive: "",
    rfidBadgeNumber: "",
    imagePic: "",
  });

  // represents the profile picture uploaded
  const [file, setFile] = useState(null);


  // Used for updating our state object
  const updateMember = (e) => {
    const fieldName = e.target.name;
    setMember((currentMember) => ({
      ...currentMember,
      [fieldName]: e.target.value,
    }));
  };


  // Handle form submit and using FormData API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberData = new FormData();
    memberData.append("memberId", member.memberId);
    memberData.append("fullName", member.fullName);
    memberData.append("memberActive", member.memberActive);
    memberData.append("rfidBadgeNumber", member.rfidBadgeNumber || scans);
    if (file) {
      memberData.append("file", file);
    }
    try {
      await axios.post("http://localhost:5000/api/members/", memberData);
      console.log("Successfully added member information");
      navigate("/")
    } catch (error) {
      console.log("error");
    }
  };

  // Displays the form for Adding
  return (
    <>
      <Header />
      <div className="header">
        <h1>Add Member</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon">
                  Add Profile Pic
                </i>
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            <div className="fieldsColumn">
              <div className="fieldRow">
                <label htmlFor="memberId" className="fieldLabel">
                  Member ID
                </label>
                <input
                  type="text"
                  name="memberId"
                  id="memberId"
                  value={member.memberId}
                  default={scans}
                  onChange={updateMember}
                  className="addInputs"
                  required
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="fullName" className="fieldLabel">
                Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={member.fullName}
                  onChange={updateMember}
                  className="addInputs"
                  required
                />
              </div>

              <div className="fieldRow">
                <label htmlFor="memberActive" className="fieldLabel">
                  Expire
                </label>
                <input
                  type="Datetime-local"
                  name="memberActive"
                  id="memberActive"
                  value={member.memberActive}
                  onChange={updateMember}
                  className="addInputs"
                  required
                />
              </div>

              <div className="fieldRow">
                <label htmlFor="rfidBadgeNumber" className="fieldLabel">
                  RFID Badge Number
                </label>
                <input
                  type="number"
                  name="rfidBadgeNumber"
                  id="rfidBadgeNumber"
                  value={member.rfidBadgeNumber || scans}
                  onChange={updateMember}
                  className="addInputs"
                  required
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Add
            </button>
            <button
              type="button"
              className="bottomButton"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
        </form>
      </section>
    </>
  );
}