import React from "react";
import "./edit.css";
import Header from "../../components/header/Header";

export default function Edit() {

  return (
    <>
      <Header />
      <div className="header">
        <h1>Edit Member</h1>
      </div>
      <section className="managePage">
        <form className="editForm">
          <div className="fields">
            <div className="imgColumn">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                alt="Profile Pic"
              />
              <label htmlFor="fileInput" className="fileUploadLabel">
                <i className="fa-solid fa-circle-plus addProfileIcon"></i>Add
                Profile Pic
              </label>
              <input
                type="file"
                id="fileInput"
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
                  className="editInputs"
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
            >
              Back
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
