import * as React from 'react';
import { Card, CardContent, Typography, Stack, Chip } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function CardStatusSystem() {
  return (
    <React.Fragment>
        <Card className="card">
            <CardContent>
                <Typography sx={{textAlign: 'center'}} variant="h5" component="div">Status</Typography>
                <Stack direction="column" spacing={0.5}>
                    <Chip label="Aplicação API" color="success" icon={<DoneAllIcon/>} />
                    <Chip label="Documentação" color="success" icon={<DoneAllIcon/>} />
                    <Chip label="Website" color="success" icon={<DoneAllIcon/>} />
                    <Chip label="Rotinas" color="success" icon={<DoneAllIcon/>} />
                    <Chip label="Fontes de dados" color="success" icon={<DoneAllIcon/>} />
                </Stack>
            </CardContent>
        </Card>
    </React.Fragment>
  );
}