import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ListItemText from '@mui/material/ListItemText';
import { CardContent, Grid, List, ListItem, Typography } from '@mui/material';
import woman_epi from '../../assets/img/woman_epi.png';

const itens = [
  {id: 1, description: 'Pesquise certificados por qualquer número de registro;'},
  {id: 2, description: 'Liste paginação filtrando por fabricante ou laboratório;'},
  {id: 3, description: 'Integre com sua aplicação através de nossa API-Restful;'},
  {id: 4, description: 'Identifique facilmente o status, a validade e o relatório do equipamento.'},
]

export default function CardSimplePractical() {
  return (
    <React.Fragment>
        <Grid container className="grid" spacing={{ xs: 1, md: 4}}>
            <Grid className="grid-img" xs={12} md={4}>
              <img src={woman_epi} />
            </Grid>
            <Grid item xs={12} md={6}>
                  <CardContent sx={{textAlign: 'center'}}>
                      <Typography variant="h6" component="div">Simplicidade</Typography>
                      <Typography>
                        Todos os dados que você precisa, no menor número de requisições possível.
                      </Typography>
                  </CardContent>

                  <CardContent>
                      <List dense={false}>
                        {itens.map(item => (
                          <ListItem key={item.id}>
                            <ListItemIcon>
                              <LabelImportantIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={item.description}
                            />
                          </ListItem>
                        ))}
                      </List>
                  </CardContent>
            </Grid>
        </Grid>
    </React.Fragment>
  );
}