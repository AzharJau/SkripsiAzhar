import React, { useState, useEffect } from "react";
import QueryFilter from "../../components/filter/QueryFilter";

import Cards from "../../components/cards/Cards";
import axios from "axios";
import "./log.css";
import Header from "../../components/header/Header";

export default function Log() {
  // state variables
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get Members on initial load
  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const res = await axios.get("http://localhost:5000/api/logs");
    setMembers(res.data.reverse());
    setLoading(false);
  };

  // function called to search for member
  const searchMember = async (memberId, rfId) => {
    let url;
    if (memberId && rfId) {
      url = `http://localhost:5000/api/logs?memberId=${memberId}&rfId=${rfId}`;
    } else if (memberId) {
      url = `http://localhost:5000/api/logs?memberId=${memberId}`;
    } else if (rfId) {
      url = `http://localhost:5000/api/logs?rfId=${rfId}`;
    }
    const res = await axios.get(url);
    setMembers(res.data);
  };

  // the jsx code that contains our components
  return (
    <section className="main">
      {loading && <div>Loading page....</div>}
      <Header />
      <QueryFilter searchMember={searchMember} getMembers={getMembers} />
      <Cards members={members} />

    </section>
  );
}
