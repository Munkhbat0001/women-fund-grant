import React, { useContext } from "react";
import { Header, Statistics, CTA, Footer } from "../components";
import {
  About,
  Blogs,
  Courses,
  Hero,
  Instructors,
  PopularCourses,
} from "../sections";
import GrantList from "../sections/GrantList";
import Purple from "../sections/Purple";
import GrantCardList from "../sections/GrantCardList";
import Features from "../sections/Features";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <Hero /> */}
      {/* <Purple /> */}
      {/* <GrantList /> */}

      {/* ---------------------------- */}
      <GrantCardList />
      {/* ------------------------ */}
      {/* <Features /> */}
      {/* <Statistics /> */}
      {/* <About /> */}
      {/* <PopularCourses />
      <Courses /> */}
      {/* <Instructors /> */}
      {/* <Blogs /> */}
      {/* <CTA /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Home;
