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

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <Hero /> */}
      <GrantList />
      {/* <Statistics />
      <About />
      <PopularCourses />
      <Courses />
      <Instructors />
      <Blogs />
      <CTA /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Home;
