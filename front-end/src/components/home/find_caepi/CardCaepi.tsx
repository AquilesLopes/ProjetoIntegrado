import * as React from 'react';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { caepiValid, formatDate, formatDateTime } from '../../../util/util';


export default function CardCaepi({caepi} : any) {
  const colorCA = caepiValid(caepi.status) ? 'green' : 'red';

  return (
    <React.Fragment>
      <Card className="card">
          <CardContent> 
              <Typography sx={{textAlign: 'center', color: colorCA}}><b>{caepi.equipment.name}</b></Typography>
              <Typography component="p"><small>Registro nº {caepi.number}</small></Typography>
              <Typography sx={{color: colorCA}} component="p"><small>Status: {caepi.status}
                          {caepiValid(caepi.status)  ? ' até ' + formatDate(caepi.validity) : ''}</small> 
              </Typography>
              <Typography component="p"><small>Marca: {caepi.equipment.brand}</small></Typography>
              <Typography component="p"><small>Cor: {caepi.equipment.color}</small></Typography>
              <Typography component="p"><small>Origem: {caepi.equipment.origin}</small></Typography>
              <Typography component="p"><small>Norma Técnica: {caepi.report.standard}</small></Typography>
              <Typography component="p"><small>Relatório Técnico nº {caepi.report.reportNumber}</small></Typography>
              <Typography component="p"><small>Processo: {caepi.report.process}</small></Typography>
              <Typography component="p"><small>Restrição: {caepi.report.restriction}</small></Typography>
              <Typography component="p"><small>Referência: {caepi.report.reference}</small></Typography>
              <Typography component="p"><small>Aprovado para: {caepi.report.approvedFor}</small></Typography>

              <Divider light sx={{marginTop: '5px', marginBottom: '5px'}} />
              <Typography component="p">
                  <small>
                    Fonte: Base de dados do Departamento de Segurança e Saúde no Trabalho, 
                    publicada em {formatDateTime(caepi.update)}
                  </small>
              </Typography>
          </CardContent>
      </Card>
    </React.Fragment>
  );
}