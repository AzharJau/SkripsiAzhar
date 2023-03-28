import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Message from "../../components/message/Message";
import "./add.css";

export default function Add() {
  // For navigation during button click
  const navigate = useNavigate();
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
  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

  // Used for updating our state object
  const updateMember = (e) => {
    const fieldName = e.target.name;
    setMember((currentMember) => ({
      ...currentMember,
      [fieldName]: e.target.value,
    }));
  };

  // Show info or error message during calling of the Axios REST API
  const showMessage = ({show = false, type = "", msg = ""}) => {
    setMessage({ show, type, msg });
  };

  // Handle form submit and using FormData API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const memberData = new FormData();
    memberData.append("memberId", member.memberId);
    memberData.append("fullName", member.fullName);
    memberData.append("memberActive", member.memberActive);
    memberData.append("rfidBadgeNumber", member.rfidBadgeNumber);
    if (file) {
      memberData.append("file", file);
    }
    try {
      await axios.post("http://localhost:5000/api/members/", memberData);
      showMessage(true, "info", "Successfully added member information");
      navigate("/")
    } catch (error) {
      showMessage(true, "error", error);
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
                  type="number"
                  name="memberId"
                  id="memberId"
                  value={member.memberId}
                  onChange={updateMember}
                  className="addInputs"
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
                  value={member.rfidBadgeNumber}
                  onChange={updateMember}
                  className="addInputs"
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
          <div>
            {message.show && (
              <Message {...message} removeMessage={showMessage} />
            )}
          </div>
        </form>
      </section>
    </>
  );
}