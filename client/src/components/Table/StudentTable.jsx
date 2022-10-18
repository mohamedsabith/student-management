import * as React from "react";
import { useNavigate } from "react-router-dom"
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function StudentTable() {
  const Navigate = useNavigate()
  return (
    <>
      <Button
        variant="contained"
        size="medium"
        sx={{
          boxShadow: "none",
          marginTop: 3,

          borderRadius: 1,
        }}
        startIcon={<AddIcon />}
        onClick={()=>Navigate("/add-student")}
      >
        ADD STUDENT
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student id</StyledTableCell>
              <StyledTableCell>Student Photo</StyledTableCell>
              <StyledTableCell>Student Name</StyledTableCell>
              <StyledTableCell>Date Of Admission</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>View</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2, 2, 2, 2, 2, 2, 2, 2].map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  111111111111111111111111
                </StyledTableCell>
                <StyledTableCell>Mohamed Sabith</StyledTableCell>
                <StyledTableCell>qqqqqqqqqq</StyledTableCell>
                <StyledTableCell>12/12/2011</StyledTableCell>
                <StyledTableCell>97461616899</StyledTableCell>
                <StyledTableCell>
                  <Button variant="outlined" startIcon={<VisibilityIcon />}>
                    More Details
                  </Button>
                </StyledTableCell>

                <StyledTableCell>
                  <Button variant="outlined"  color="error" startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
