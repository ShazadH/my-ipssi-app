import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props) {
  const { product, setData } = props;

  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(product);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    axios
      .put(`http://localhost:5000/products/${editProduct._id}`, editProduct)
      .then((res) => {
        setEditProduct(res.data);
        setData(undefined);
      })
      .catch((err) => console.log(err));
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Modify
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id={editProduct._id}>{editProduct.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>Modify your product</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product's name"
            defaultValue={editProduct.name}
            type="text"
            fullWidth
            onChange={(e) =>
              setEditProduct({ ...editProduct, name: e.target.value })
            }
          />

          <TextField
            margin="dense"
            id="name"
            label="Type"
            defaultValue={editProduct.type}
            type="text"
            onChange={(e) =>
              setEditProduct({ ...editProduct, type: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Price"
            defaultValue={editProduct.price}
            type="text"
            onChange={(e) =>
              setEditProduct({ ...editProduct, price: e.target.value })
            }
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Rating"
            defaultValue={editProduct.rating}
            onChange={(e) =>
              setEditProduct({ ...editProduct, rating: e.target.value })
            }
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Warranty_years"
            defaultValue={editProduct.warranty_years}
            onChange={(e) =>
              setEditProduct({ ...editProduct, warranty_years: e.target.value })
            }
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="available"
            defaultValue={editProduct.available}
            onChange={(e) =>
              setEditProduct({ ...editProduct, available: e.target.value })
            }
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleEdit()}
            color="primary"
          >
            Edit
          </Button>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
