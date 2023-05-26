import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit.css";
import Header from "../../components/header/Header";

export default function Edit() {
  // For navigation during button click
  const navigate = useNavigate();
  // Extract the ID from the browser url
  const { id } = useParams();
  // Our member state information
  const [member, setMember] = useState({
    memberId: "",
    fullName: "",
    memberActive: "",
    rfidBadgeNumber: "",
    imagePic: "",
  });
  // The profile picture file
  const [file, setFile] = useState(null);

  // Get the member information by passing the ID into our MongoDB Atlas database
  useEffect(() => {
    const getMember = async () => {
      const res = await axios.get("http://localhost:5000/api/members/" + id);
      setMember(res.data);
    };
    getMember();
  }, [id]);

  // Update our state object
  const updateMember = (e) => {
    const fieldName = e.target.name;
    setMember((currentMember) => ({
      ...currentMember,
      [fieldName]: e.target.value,
    }));
  };

  const handleDeleteImage = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:5000/api/members/profile-image/" + member._id);
      console.log("Successfully deleted member information");
      clearMemberImage();
      setFile(null);
    } catch (error) {
      console.log("error");
    }
  };
  
  const clearMemberImage = () => {
    setMember((prevMember) => ({
      ...prevMember,
      imagePic: ''
    }));
  };

  // Handle form submit
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
      await axios.put(
        "http://localhost:5000/api/members/" + member._id,
        memberData
      );
      console.log("Successfully edited member information");
      navigate("/")
    } catch (error) {
      console.log("error");
    }
  };

  // The user interface for the Edit page
  return (
    <>
      <Header />
      <div className="header">
        <h1>Edit Member</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : member.imagePic
                    ? "http://localhost:5000/images/" + member.imagePic
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel ">
                <i className="fa-solid fa-circle-plus addProfileIcon"></i>
                Add Profile Pic
              </label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
                
              />
              <label className="fileDeleteLabel" onClick={handleDeleteImage}>
                <i className="fa-solid fa-trash addProfileIcon"></i>
                Delete Profile Pic
              </label>
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
                  onChange={updateMember}
                  className="editInputs"
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
                  className="editInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="memberActive" className="fieldLabel">
                 Member Active
                </label>
                <input
                  type="datetime-local"
                  name="memberActive"
                  id="memberActive"
                  value={member.memberActive ? member.memberActive.slice(0, 16) : ''}
                  onChange={updateMember}
                  className="editInputs"
                  required
                />
              </div>

              <div className="fieldRow">
                <label htmlFor="rfidBadgeNumber" className="fieldLabel">
                  RFID Badge Number
                </label>
                <input
                  type="text"
                  name="rfidBadgeNumber"
                  id="rfidBadgeNumber"
                  value={member.rfidBadgeNumber}
                  onChange={updateMember}
                  className="editInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Edit
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
