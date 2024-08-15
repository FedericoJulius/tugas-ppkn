import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import './Dialog.css';  // Ensure this path matches the location of your CSS file

export default function CustomDialog({ open, handClose }) {
  const sources = [
    "https://www.vecteezy.com",
    "https://pngtree.com",
    "https://www.pngwing.com",
    "https://pinterest.com"
  ];

  const [listOpen, setListOpen] = useState(false);

  const handleToggle = () => {
    setListOpen(!listOpen);
  };

  return (
    <Dialog
      open={open}
      onClose={handClose}
      PaperProps={{
        sx: {
          backgroundColor: 'black',
          color: 'white',
        },
      }}
    >
      <DialogTitle>Fitur website</DialogTitle>
      <DialogContent>
        <p>Tekan dua kali untuk melihat deskripsi kertas</p>
        <p>Tekan dan gerakan untuk menggerakan kertas</p>
      </DialogContent>
      <DialogTitle>Salur</DialogTitle>
      <DialogContent>
        <details className='details' open={listOpen} onToggle={handleToggle}>
          <summary className='details-summary'>Website Salur gambar</summary>
          <div className='details-content'>
            <ul>
              {sources.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </details>
      </DialogContent>
      <DialogActions>
        <Button onClick={handClose} className='dialogButton'>Tutup</Button>
      </DialogActions>
    </Dialog>
  );
}
