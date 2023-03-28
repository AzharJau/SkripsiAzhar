import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./edit.css";
import Message from "../../components/message/Message";
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
  // Messages used to display if successful or error during updating
  const [message, setMessage] = useState({
    show: false,
    msg: "",
    type: "",
  });

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

  // Function to show or hide messages
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const studenData = new FormData();
    studenData.append("memberId", member.memberId);
    studenData.append("fullName", member.fullName);
    studenData.append("memberActive", member.memberActive);
    studenData.append("rfidBadgeNumber", member.rfidBadgeNumber);
    if (file) {
      studenData.append("file", file);
    }
    try {
      await axios.put(
        "http://localhost:5000/api/members/" + member._id,
        studenData
      );
      showMessage(true, "info", "Successfully edited member information");
    } catch (error) {
      showMessage(true, "error", error);
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
                    ? `http://localhost:5000/${member.imagePic}`
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon"></i>Add
                Profile Pic
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
                  type="Datetime-local"
                  name="memberActive"
                  id="memberActive"
                  value={member.memberActive}
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
