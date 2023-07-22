// @ts-nocheck

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import edit from "@assets/icons/edit.svg";
import deletes from "@assets/icons/delete.svg";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { ICommonTableProps } from "@interfaces/ICommonTableProps";

const CommonTable = (props: ICommonTableProps): JSX.Element => {
  const { tableContent, tableHeadingData, path, onEdit, onDelete } = props;
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const rowsPerPage: number = 5;

  const pageCount: number = Math.ceil(tableContent.length / rowsPerPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Heading */}
          <TableHead>
            <TableRow>
              {Object.values(tableHeadingData).map(
                (heading: string, index: number) => (
                  <TableCell key={index} sx={{ fontWeight: 600 }}>
                    {heading}
                  </TableCell>
                )
              )}
              <TableCell
                sx={{ fontWeight: 600, marginRight: "20px" }}
                align="center"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Table body content */}
          <TableBody>
            {tableContent
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((content: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.entries(content).map(([key, value], index) => {
                    if (key !== "id") {
                      return (
                        <TableCell key={index} component="td" scope="row">
                          {value as React.ReactNode}
                        </TableCell>
                      );
                    }
                    return null;
                  })}
                  <TableCell align="center" sx={{ marginRight: 0 }}>
                    <img
                      style={{ cursor: "pointer" }}
                      src={edit}
                      alt=""
                      onClick={() => onEdit(content.id)}
                    />
                    <img
                      src={deletes}
                      alt=""
                      style={{ marginLeft: "10px", cursor: "pointer" }}
                      onClick={() => onDelete(content.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Stack spacing={2}>
          <Pagination
            count={pageCount}
            variant="outlined"
            shape="rounded"
            sx={{ mt: 2 }}
            page={page + 1}
            onChange={(event, newPage) => handlePageChange(newPage - 1)}
          />
        </Stack>
      </Box>
    </>
  );
};

export default CommonTable;
