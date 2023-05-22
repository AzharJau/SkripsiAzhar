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
  const [recordsPerPage] = useState(50);
    // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = members.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(members.length / recordsPerPage);

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
    let url;
    if (memberId && rfId) {
      url = `http://localhost:5000/api/members?memberId=${memberId}&rfId=${rfId}`;
    } else if (memberId) {
      url = `http://localhost:5000/api/members?memberId=${memberId}`;
    } else if (rfId) {
      url = `http://localhost:5000/api/members?rfId=${rfId}`;
    } else if (fullName && rfId && memberId) {
      url = `http://localhost:5000/api/members?fullName=${fullName}&rfId=${rfId}&memberId=${memberId}`;
    } else if (fullName) {
      url = `http://localhost:5000/api/members?fullName=${fullName}`;
    } else if (fullName && memberId) {
      url = `http://localhost:5000/api/members?fullName=${fullName}&memberId=${memberId}`;
    } else if (fullName && rfId) {
      url = `http://localhost:5000/api/members?fullName=${fullName}&rfId=${rfId}`;
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
