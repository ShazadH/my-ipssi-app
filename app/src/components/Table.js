import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import FormDialog from "./FormDialogs";
import AddFormDialog from "./AddFormDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    padding: "20px",
  },
});

export default function DenseTable() {
  const classes = useStyles();

  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState("");
  const [closeNotification, setCloseNotification] = useState(false);

  const toggleEditProductFormDialogs = () => {
    setVisible(!visible);
  };

  const onDeleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/products/${id}`);
    setNotification(`Le produit a bien ete supprime !`);
    setCloseNotification(true);
    setData(undefined);
  };

  useEffect(() => {
    if (closeNotification) {
      setTimeout(() => {
        setCloseNotification(false);
      }, 2000);
    }
  }, [closeNotification]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/products");
      setData(result.data);
    };

    if (data === undefined) {
      fetchData();
    }
  }, [data]);

  return (
    <>
      {notification && (
        <Snackbar open={closeNotification} autoHideDuration={2000}>
          <div severity="success">{notification}</div>
        </Snackbar>
      )}
      <div>
        <AddFormDialog setData={setData} />
      </div>
      <TableContainer classes={{ root: classes.root }} component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">warranty_years</TableCell>
              <TableCell align="right">available</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((d) => (
                <TableRow key={d._id}>
                  <TableCell component="th" scope="row">
                    {d.name}
                  </TableCell>
                  <TableCell align="right">{d.type}</TableCell>
                  <TableCell align="right">{d.price}</TableCell>
                  <TableCell align="right">{d.rating}</TableCell>
                  <TableCell align="right">{d.warranty_years}</TableCell>
                  <TableCell>{d.available.toString()}</TableCell>
                  <TableCell>
                    <FormDialog
                      open={visible}
                      onClose={toggleEditProductFormDialogs}
                      product={d}
                      setData={setData}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDeleteProduct(d._id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
