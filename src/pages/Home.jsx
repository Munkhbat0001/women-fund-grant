import React from "react";
import { Header, Statistics, CTA, Footer } from "../components";
import {
  About,
  Blogs,
  Courses,
  Hero,
  Instructors,
  PopularCourses,
} from "../sections";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Statistics />
      <About />
      <PopularCourses />
      <Courses />
      <Instructors />
      <Blogs />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
