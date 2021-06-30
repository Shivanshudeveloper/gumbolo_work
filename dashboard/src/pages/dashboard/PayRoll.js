import React from 'react';
// material
import Container from '@material-ui/core/Container';

import {
  Grid,
  Button,
  TextField,
} from '@material-ui/core';

export default function PayRoll() {

  // Dummy hanlde click function to sumbit pay roll form 
  const handlePayRoll = () => {
      console.log("handle pay roll")
  }

  return (
    <>
      <Container style={{ marginTop: '20px' }} maxWidth="md">
                <h2>Pay Roll</h2>
                <Grid style={{ marginTop: '4px', marginBottom: '20px' }} container spacing={3}>
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Employee Name" />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Employee Designation" />
                    </Grid>
                    
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Hours Work" />
                    </Grid>
                    <Grid item xs={6} >
                        <TextField fullWidth id="standard-basic" label="Total Payment" />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField fullWidth id="standard-basic" label="Commisions" />
                    </Grid>

                    <Grid item xs={12} >
                        <TextField fullWidth id="standard-basic" label="Perks" />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="button"
                            color="primary"
                            variant="contained"
                            size="large"
                            onClick={handlePayRoll}
                            sx={{ mr: 1.5 }}
                        >
                        Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
    </>
  );
}
