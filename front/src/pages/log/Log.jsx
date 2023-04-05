import React, { useState, useEffect } from "react";
import QueryFilter from "../../components/filter/QueryFilter";

import Cardslog from "../../components/cards/Cardslog";
import axios from "axios";
import "./log.css";
import Header from "../../components/header/Header";

export default function Log() {
  // state variables
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMembers();
    }, 1000); // polling setiap 1 detik

    return () => {
      clearInterval(intervalId);
    };
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
      <Cardslog members={members} />

    </section>
  );
}
