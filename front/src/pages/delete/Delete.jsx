import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./delete.css";
import Message from "../../components/message/Message";
import Header from "../../components/header/Header";

export default function Delete() {
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

  // Function to show or hide messages
  const showMessage = (show = false, type = "", msg = "") => {
    setMessage({ show, type, msg });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:5000/api/members/" + member._id);
      showMessage(true, "info", "Successfully deleted member information");
      navigate("/")
      clearMemberInfo();
    } catch (error) {
      showMessage(true, "error", error);
    }
  };

  // Clear member info after deletion
  const clearMemberInfo = () => {
    setMember({
      memberId: "",
      fullName: "",
      memberActive: "",
      rfidBadgeNumber: "",
      imagePic: "",
    });
  };

  // The user interface for the Delete page
  return (
    <>
      <Header />
      <div className="header">
        <h1>Delete Member</h1>
      </div>
      <section className="managePage">
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="fields">
            <div className="imgColumn">
              <img
                src={
                  member.imagePic
                    ? `http://localhost:5000/${member.imagePic}`
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="Profile Pic"
              />
            </div>
            <div className="fieldsColumn">
              <div className="fieldRow">
                <label htmlFor="MemberId" className="fieldLabel">
                  Member ID
                </label>
                <input
                  type="text"
                  name="memberId"
                  id="memberId"
                  value={member.memberId}
                  readOnly={true}
                  className="deleteInputs"
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
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
              <div className="fieldRow">
                <label htmlFor="memberActive" className="fieldLabel">
                 MemberActive
                </label>
                <input
                  type="text"
                  name="memberActive"
                  id="memberActive"
                  value={member.memberActive}
                  readOnly={true}
                  className="deleteInputs"
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
                  readOnly={true}
                  className="deleteInputs"
                />
              </div>
            </div>
          </div>

          <div className="btnContainer">
            <button type="submit" className="bottomButton">
              Delete
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
