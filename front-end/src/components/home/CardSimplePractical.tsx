import * as React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import ListItemText from '@mui/material/ListItemText';
import { CardContent, Grid, List, ListItem, Typography } from '@mui/material';
import man_pc from '../../assets/img/man_pc.png';
import vector from '../../assets/img/vector.svg';
import { isMobile } from '../../util/util';

const itens = [
  {id: 1, description: 'Pesquise certificados por qualquer número de registro;'},
  {id: 2, description: 'Liste paginação filtrando por fabricante ou laboratório;'},
  {id: 3, description: 'Integre com sua aplicação através de nossa API-Restful;'},
  {id: 4, description: 'Identifique facilmente o status, a validade e o relatório do equipamento.'},
]

export default function CardSimplePractical() {
  return (
    <React.Fragment>
        <div className="grid-simplicity">
            <div className="grid-simplicity-content">
                  <CardContent>
                      <p className="grid-simplicity-title">Simplicidade</p>
                      <p className="grid-simplicity-sub-title">
                        Todos os dados que você precisa, no menor número de requisições possível.
                      </p>
                  </CardContent>
                  <CardContent>
                      <List dense={false}>
                        {itens.map(item => (
                          <p className="grid-simplicity-item-list" key={item.id}>
                             <img src={vector} /> {item.description}
                          </p>
                        ))}
                      </List>
                  </CardContent>
            </div>
            <div className="grid-simplicity-img">
              <img className="img-card-pc" src={man_pc} />
            </div>
        </div>
    </React.Fragment>
  );
}