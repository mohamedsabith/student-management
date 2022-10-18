import React from "react";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar/Navbar";
import StudentTable from "../components/Table/StudentTable";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth>
        <StudentTable />
      </Container>
    </>
  );
};

export default HomePage;
