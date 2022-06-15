import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import EditIcon from '../../assets/icon/edit.svg';
import DeleteIcon from '../../assets/icon/delete.svg';

const templateAllData = [
  {
    id: 1,
    name: 'ICO Smart Contract',
    category: 'Defi',
    createOn: Date.now(),
  },
  {
    id: 2,
    name: 'Smart Contract Test',
    category: 'NFT',
    createOn: Date.now(),
  },
  {
    id: 3,
    name: 'A Smart Contract',
    category: 'Defi',
    createOn: Date.now(),
  },
];

const styles = {
  titleTable: {
    color: '#fff !important',
    fontStyle: 'normal !important',
    textTransform: 'capitalize !important',
  },
};

const AllSmartContract = () => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead aria-label="">
          <TableRow
            component="tr"
            sx={{
              backgroundColor: '#474748',
            }}>
            <TableCell sx={{ ...styles.titleTable }} component="th">
              Name
            </TableCell>
            <TableCell sx={{ ...styles.titleTable }} component="th">
              Category
            </TableCell>
            <TableCell sx={{ ...styles.titleTable }} component="th">
              Create On
            </TableCell>
            <TableCell sx={{ ...styles.titleTable }} component="th"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templateAllData.map((row) => (
            <TableRow key={row.name}>
              <TableCell style={{ width: 200 }}>{row.name}</TableCell>
              <TableCell style={{ width: 200 }}>{row.category}</TableCell>
              <TableCell style={{ width: 200 }}>{row.createOn}</TableCell>
              <TableCell style={{ width: 10 }}>
                <EditIcon />
              </TableCell>
              <TableCell style={{ width: 10 }}>
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllSmartContract;
