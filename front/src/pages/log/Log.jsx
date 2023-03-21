import React from "react";
import QueryFilter from "../../components/filter/QueryFilter";

import Cards from "../../components/cards/Cards";
import "./log.css";
import Header from "../../components/header/Header";

export default function Log() {

  return (
    <section className="main">

      <Header />
      <QueryFilter/>
      <Cards />

    </section>
  );
}
