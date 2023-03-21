
import React from "react";
import Header from "../../components/header/Header";
import "./add.css";

export default function Add() {

  return (
    <>
      <Header />
      <div className="header">
        <h1>Add Member</h1>
      </div>
      <section className="managePage">
        <form className="editForm" >
          <div className="fields">
            <div className="imgColumn">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
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

                  className="addInputs"
                />
              </div>

              <div className="fieldRow">
                <label htmlFor="address" className="fieldLabel">
                  Expire
                </label>
                <input
                  type="Datetime-local"
                  name="memberActive"
                  id="memberActive"

                  className="addInputs"
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

            >
              Back
            </button>
          </div>

        </form>
      </section>
    </>
  );
}
