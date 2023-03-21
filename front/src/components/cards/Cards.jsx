import React from "react";
import "./cards.css";
import { Link } from "react-router-dom";



export default function Cards({ members }) {
  return (
    <div className="cardsWrapper">
      <div className="cards">

            <div className="card">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
                alt="profile pic"
              />
              <h3>Azhar</h3>
              <div className="text">
                <p>
                  <span className="label">Member ID:</span>
                </p>
                <p>
                  <span className="info">1231312313</span>
                </p>

                <p>
                  <span className="label">RFID:</span>
                </p>
                <p>
                  <span className="info">whatever</span>
                </p>
                <p>
                  <span className="label">Expire :</span>
                </p>
                <p>
                  <span className="info">25-06-2023</span>
                </p>
              </div>
              <div className="btnContainer">
                <Link className="cardBtn m-top">
                  Edit
                </Link>
                <Link className="cardBtn m-top">
                  Delete
                </Link>
              </div>
            </div>

      </div>
    </div>
  );
}
