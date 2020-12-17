import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AddFormDialog(props) {
  const { setData } = props;

  const [open, setOpen] = useState(false);
  const [addProduct, setAddProduct] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    await axios.post(`http://localhost:5000/products/`, addProduct);
    setOpen(false);
    setData(undefined);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Ajouter un produit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Ajouter un produit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product's name"
            type="text"
            fullWidth
            onChange={(e) =>
              setAddProduct({ ...addProduct, name: e.target.value })
            }
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Type"
            type="text"
            onChange={(e) =>
              setAddProduct({ ...addProduct, type: e.target.value })
            }
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Price"
            type="text"
            onChange={(e) =>
              setAddProduct({ ...addProduct, price: e.target.value })
            }
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Rating"
            onChange={(e) =>
              setAddProduct({ ...addProduct, rating: e.target.value })
            }
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Warranty_years"
            onChange={(e) =>
              setAddProduct({ ...addProduct, warranty_years: e.target.value })
            }
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="available"
            onChange={(e) =>
              setAddProduct({ ...addProduct, available: e.target.value })
            }
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleAdd()}
            color="primary"
          >
            Add
          </Button>
          <Button variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
