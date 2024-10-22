import React from "react";
import { Stack, Box, Typography } from '@mui/material';


import Frutasft from '../../imgLogomarca/frutasft.jpg'
import Frutas from '../../images/frutas.png'
import Frotas43 from '../../imgLogomarca/priclogo1.png'
import Newdellicasse from '../../imgLogomarca/priclog2.png'
export const MyEmptyCrad = () => {

    return (
        <Stack 
          direction="row" 
          spacing={0} 
          className="card" 
          sx={{ maxWidth: 540, mb: 3, borderRadius: 2, boxShadow: 2 }}
        >
          {/* Imagem */}
          <Box 
            sx={{ width: '40%', overflow: 'hidden', borderRadius: '8px 0 0 8px' }}
          >
            <img 
              src={Frutasft}
              alt="Card image" 
              style={{ width: '100%', height: 'auto' }} 
            />
          </Box>
    
          {/* Conteúdo */}
          <Box 
            sx={{ width: '60%', p: 2 }}
            className="card-body"
          >
            <Typography variant="h5" gutterBottom>
              Card Title
            </Typography>
            <Typography variant="body1" sx={{ mb: 1.5 }}>
              This is a wider card with supporting text below as a natural lead-in to additional content. 
              This content is a little bit longer.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last updated 3 mins ago
            </Typography>
          </Box>
        </Stack>
      );
}