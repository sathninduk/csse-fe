import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import CardTemp from './Card';


export default function GridView(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 1, sm: 2, md: 2 }}>
        {props.data.map((value) => (
            <CardTemp key={value.id} title={value.title} secondDes={value.secondaryDescription} description={value.tertiaryDescription} buttons={value.buttons} />
        ))}
      </Grid>
    </Box>
  );
}
