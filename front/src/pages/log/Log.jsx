import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import Cardslog from "../../components/cards/Cardslog";
import axios from "axios";
import "./log.css";
import Header from "../../components/header/Header";

export default function Log() {
  // state variables
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(50);
    // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = members.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(members.length / recordsPerPage);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getMembers();
    }, 1000); // polling setiap 1 detik

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getMembers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/logs");
      const filteredMembers = res.data.filter(
        (member) => member.accessStatus !== undefined
      );
      setMembers(filteredMembers.reverse());
      console.log(filteredMembers);
    } catch (error) {
      console.log(error);
    }
  };

  // the jsx code that contains our components
  return (
    <section className="main">
      <Header />
      <Cardslog members={currentRecords} />
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}
