import React from "react";
import QueryFilter from "../../components/filter/QueryFilter";
import Cards from "../../components/cards/Cards";
import "./home.css";
import Header from "../../components/header/Header";

export default function Home() {

  return (
    <section className="main">

      <Header />
      <QueryFilter/>
      <Cards/>

    </section>
  );
}
