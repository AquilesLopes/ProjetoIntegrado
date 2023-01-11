import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ListItemText from '@mui/material/ListItemText';
import { CardContent, Grid, List, ListItem, Typography } from '@mui/material';
import blue_shield from '../../assets/img/blue_shield.svg';
import { isMobile } from '../../util/util';
import women_pc from '../../assets/img/women_pc.png';
import vector from '../../assets/img/vector.svg';

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
      <React.Fragment>
          <div className="grid-api">
              <div className="grid-api-img">
                <img className="img-card-pc" src={women_pc} />
              </div>
              <div className="grid-api-content">
                    <CardContent>
                        <p className="grid-api-title">API sem complicações</p>
                        <p className="grid-api-sub-title">
                           Documentação completa e direto ao ponto, sem enrolação.
                        </p>
                    </CardContent>
                    <CardContent>
                        <List dense={false}>
                          {itens.map(item => (
                            <p className="grid-api-item-list" key={item.id}>
                              <img src={vector} /> {item.description}
                            </p>
                          ))}
                        </List>
                    </CardContent>
              </div>
          </div>
      </React.Fragment>
    </React.Fragment>
  );
}