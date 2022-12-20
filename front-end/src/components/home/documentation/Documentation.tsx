import * as React from 'react';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import CardContentCaepi from './CardContentCaepi';
import ExampleCaepi from './ExampleCaepi';

export default function Documentation() {
  return (
    <React.Fragment>
      <Card className="card">
          <CardContent sx={{textAlign: 'center'}}>
              <Typography variant="h4" component="div">API RESTFul</Typography>
              <Typography>
              Fornece dados de completos sobre os certificados.
              API fácil de implementar, com respostas e parâmetros objetivos. 
              </Typography>
          </CardContent>

          <Grid container spacing={{ xs: 1, md: 2 }}>
            <Grid item xs={12} md={6}>
                <CardContentCaepi />
            </Grid>
            <Grid item xs={12} md={6}>
                <ExampleCaepi />
            </Grid>
          </Grid>
      </Card>
    </React.Fragment>
  );
}