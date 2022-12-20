import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ListItemText from '@mui/material/ListItemText';
import { CardContent, Grid, List, ListItem, Typography } from '@mui/material';
import blue_shield from '../../assets/img/blue_shield.svg';
import { isMobile } from '../../util/util';

const itens = [
  {id: 1, description: 'Todo comunicação criptografada com SSL;'},
  {id: 2, description: 'Autenticação simples via parâmetro POST, que retorna um token JWT;'},
  {id: 3, description: 'Respostas completas em uma única requisição;'},
  {id: 4, description: 'Liberado para no navegador (CORS);'},
  {id: 5, description: 'Exemplos de respostas;'},
  {id: 6, description: 'Documentação detalhada de cada requisição.'}
]

export default function CardInfoApi() {
  return (
    <React.Fragment>
        <Grid container direction={isMobile ? "row" : "row-reverse"} 
              className="grid" spacing={{ xs: 1, md: 4}}>
            <Grid item className="grid-img" xs={12} md={4}>
              <img src={blue_shield} />
            </Grid>
            <Grid item xs={12} md={6}>
                  <CardContent sx={{textAlign: 'center'}}>
                      <Typography variant="h6" component="div">API sem complicações</Typography>
                      <Typography>
                        Documentação completa e direto ao ponto, sem enrolação.
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