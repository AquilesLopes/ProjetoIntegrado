import * as React from 'react';
import { CardContent, Fade, List, Tooltip } from '@mui/material';
import women_pc from '../../assets/img/women_pc.png';
import vector from '../../assets/img/vector.svg';

const itens = [
  {id: 1, description: 'Todo comunicação criptografada com SSL;'},
  {id: 2, description: 'Autenticação simples via parâmetro POST, que retorna um token JWT;'},
  {id: 3, description: 'Respostas completas em uma única requisição;'},
  {id: 4, description: 'Liberado para qualquer tipo de navegador (CORS);'},
  {id: 5, description: 'Exemplos de solicitações e respostas;'},
  {id: 6, description: 'Atualização diária com a base de dados da Secretaria de Inspeção do Trabalho - SIT;'},
  {id: 7, description: 'Documentação detalhada de cada requisição.'}
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
                        <p className="grid-api-title"> 
                        <Tooltip title="Application Programming Interface (Interface de programação de aplicações)" 
                          TransitionComponent={Fade} 
                          disableFocusListener arrow>
                          <span className="grid-api-title"> API </span>
                        </Tooltip>
                        sem complicações
                        </p>
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