import React from "react";
import "./cards.css";
import { Link } from "react-router-dom";
import moment from 'moment';

export default function Cards({ members }) {
  return (
    <div className="cardsWrapper">
      <div className="cards">
        {members.length === 0 && <p>No member(s) found</p>}
        {members.map((member) => {
          return (
            <div key={member._id} className="card">
              <img
                src={
                  member.imagePic
                    ? "http://localhost:5000/" + member.imagePic
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="profile pic"
              />
              <h3>{member.fullName}</h3>
              <div className="text">
                <p>
                  <span className="label">Member ID:</span>
                </p>
                <p>
                  <span className="info">{member.memberIdLog}</span>
                </p>

                <p>
                  <span className="label">RFID:</span>
                </p>
                <p>
                  <span className="info">{member.rfidBadgeNumberLog}</span>
                </p>

                {member.memberActive ? (
                  <div>
                    <p>
                      <span className="label">Expire :</span>
                    </p>
                    <p>
                      <span className="info">{moment.utc(member.memberActive).local().format('YYYY-MM-DD HH:mm:ss')}</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span className="label">Expire :</span>
                    </p>

                  </div>
                )}

                {member.loginTime ? (
                  <div>
                    <p>
                      <span className="label">LoginTime:</span>
                    </p>
                    <p>
                      <span className="info">{moment.utc(member.loginTime).local().format('YYYY-MM-DD HH:mm:ss')}</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span className="label">LoginTime:</span>
                    </p>

                  </div>
                )}

                <p>
                  <span className="label">Access Status:</span>
                </p>
                <p>
                  <span className="info">{member.accessStatus}</span>
                </p>
              </div>
              <div className="btnContainer">
                <Link to={`edit/${member._id}`} className="cardBtn m-top">
                  Edit
                </Link>
                <Link to={`delete/${member._id}`} className="cardBtn m-top">
                  Delete
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
