import React from "react";
import "./delete.css";
import Header from "../../components/header/Header";

export default function Delete() {

  return (
    <>
      <Header />
      <div className="header">
        <h1>Delete Member</h1>
      </div>
      <section className="managePage">
        <form className="editForm">
          <div className="fields">
            <div className="imgColumn">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
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
            >
              Back
            </button>
          </div>

        </form>
      </section>
    </>
  );
}
