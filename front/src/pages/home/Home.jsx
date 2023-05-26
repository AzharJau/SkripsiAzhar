import React, { useState, useEffect } from "react";
import QueryFilter from "../../components/filter/QueryFilter";
import Pagination from "../../components/pagination/Pagination";
import Cards from "../../components/cards/Cards";
import axios from "axios";
import "./home.css";
import Header from "../../components/header/Header";

export default function Home() {
  // state variables
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [records] = useState(50);
    // Pagination logic
  const LastRecord = currentPage * records;
  const FirstRecord = LastRecord - records;
  const currentRecords = members.slice(FirstRecord, LastRecord);
  const nPages = Math.ceil(members.length / records);

  // Get Members on initial load
  useEffect(() => {
    getMembers();
  }, []);

  const getMembers = async () => {
    const res = await axios.get("http://localhost:5000/api/members");
    setMembers(res.data.reverse());
  };

  // function called to search for member
  const searchMember = async (fullName, memberId, rfId) => {
    let url = "http://localhost:5000/api/members";

    if (memberId && rfId) {
      url += `?memberId=${memberId}&rfId=${rfId}`;
    } else if (memberId) {
      url += `?memberId=${memberId}`;
    } else if (rfId) {
      url += `?rfId=${rfId}`;
    } else if (fullName && rfId && memberId) {
      url += `?fullName=${fullName}&rfId=${rfId}&memberId=${memberId}`;
    } else if (fullName) {
      url += `?fullName=${fullName}`;
    } else if (fullName && memberId) {
      url += `?fullName=${fullName}&memberId=${memberId}`;
    } else if (fullName && rfId) {
      url += `?fullName=${fullName}&rfId=${rfId}`;
    }

    const res = await axios.get(url);
    setMembers(res.data);
  };

  // the jsx code that contains our components
  return (
    <section className="main">
      <Header />
      <QueryFilter searchMember={searchMember} getMembers={getMembers} />
      <Cards members={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
