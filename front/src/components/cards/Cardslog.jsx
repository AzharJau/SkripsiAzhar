import React from "react";
import "./cards.css";
import moment from 'moment';

export default function Cards({ members }) {
  return (
    <div className="cardsWrapper">
      <div className="cardslog">
        {members.length === 0 && <p>No member</p>}
        {members.map((member) => {
          const matchedData = member.memberData.find(
            (data) =>
              data.rfidBadgeNumber === member.rfidBadgeNumberLog
          );
          const {
            fullName,
            memberId,
            memberActive,
            imagePic,
          } = matchedData || {};
          return (
            <div key={member._id} className="card">
              <img
                src={
                  imagePic
                    ? "http://localhost:5000/images/" + imagePic
                    : "http://localhost:5000/images/defaultPic.png"
                }
                alt="profile pic"
              />
              <h3>{fullName ? fullName : '************' }</h3>
              <div className="text">
                <p>
                  <span className="label">Member ID:</span>
                </p>
                <p>
                  <span className="info">{memberId ? memberId : '************' }</span>
                </p>

                <p>
                  <span className="label">RFID:</span>
                </p>
                <p>
                  <span className="info">{member.rfidBadgeNumberLog ? member.rfidBadgeNumberLog : '************'}</span>
                </p>

                {memberActive ? (
                  <div>
                    <p>
                      <span className="label">Expire :</span>
                    </p>
                    <p>
                      <span className="info">{moment.utc(memberActive).local().format('YYYY-MM-DD HH:mm:ss')}</span>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      <span className="label">Expire :</span>
                    </p>
                    <p>
                  <span className="info">************</span>
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
                    <p>
                  <span className="info">************</span>
                    </p>
                  </div>
                )}

                <p>
                  <span className="label">Access Status:</span>
                </p>
                <p>
                  <span className="info">{member.accessStatus? member.accessStatus : '************'}</span>
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
