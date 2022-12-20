import * as React from 'react';
import { CardContent, Divider, Typography } from '@mui/material';
import { CONFIG } from '../../../util/config';

const caepi = {
  number: 'Número de registro do Certificado de Aprovação - CA',
  status: 'Status do CA - VÁLIDO | EXPEDIDO | SUSPENSO | CANCELADO | VENCIDO',
  update: 'Data e hora da publicação pelo Departamento de Segurança e Saúde no Trabalho no formato yyyy-MM-ddTHH:mm:ss',
  validity: 'Data de vencimento do EPI no formato yyyy-MM-dd',
  equipment: {
    name: 'Nome do Equipamento de Proteção Individual - EPI',
    description: 'Descrição do EPI',
    brand: 'Marca do EPI',
    color: 'Cor do EPI',
    origin: 'Origem do EPI - Nacional | Importado',
    manufacturer: {
      name: 'Nome do Fabricante',
      cnpj: 'CNPJ do Fabricante'
    }
  },
  report: {
    standard: 'Norma Técnica',
    reportNumber: 'Número do Relatório Técnico',
    process: 'Número do processo no Departamento de Segurança e Saúde no Trabalho',
    restriction: 'Restrição do EPI',
    reference: 'Normas de Referência',
    approvedFor: 'EPI aprovado para ...',
    observation: 'Observação do EPI',
    laboratory: {
      name: 'Nome do Laboratório',
      cnpj: 'CNPJ do Laboratório'
    }
  },
  urls: [
    {url: 'URL usada com protocolo GET', description: 'Descreve o que a URL recupera'}
  ]
}

export default function CardContentCaepi() {
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" sx={{textAlign: 'center'}} component="div">Estrutura de dados CAEPI</Typography>
        <Typography>Após o login adicione o Token no header da requisição.</Typography>
        <Typography><code>{CONFIG.urlBase}/api/v1/caepi/{"{NÚMERO_REGISTRO_CA}"}</code></Typography>
        <Typography><code>Protocolo</code>: <small><b>GET</b></small></Typography>
        <Typography><code>Authorization</code>: <small>Bearer ...Seu Token...</small></Typography>
        <Divider light sx={{marginTop: '5px', marginBottom: '5px'}} />
        <Typography><code>number</code>: <small>{caepi.number}</small></Typography>
        <Typography><code>status</code>: <small>{caepi.status}</small></Typography>
        <Typography><code>update</code>: <small>{caepi.update}</small></Typography>
        <Typography><code>validity</code>: <small>{caepi.validity}</small></Typography>
        <Typography><code>equipment</code>: <small></small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>name</code>: <small>{caepi.equipment.name}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>description</code>: <small>{caepi.equipment.description}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>brand</code>: <small>{caepi.equipment.brand}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>color</code>: <small>{caepi.equipment.color}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>origin</code>: <small>{caepi.equipment.origin}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>manufacturer</code>: <small>Objeto</small></Typography>
        <Typography sx={{marginLeft: '20px'}}><code>name</code>: <small>{caepi.equipment.manufacturer.name}</small></Typography>
        <Typography sx={{marginLeft: '20px'}}><code>cnpj</code>: <small>{caepi.equipment.manufacturer.cnpj}</small></Typography>
        <Typography><code>report</code>: <small>Objeto</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>standard</code>: <small>{caepi.report.standard}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>reportNumber</code>: <small>{caepi.report.reportNumber}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>process</code>: <small>{caepi.report.process}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>restriction</code>: <small>{caepi.report.restriction}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>reference</code>: <small>{caepi.report.reference}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>approvedFor</code>: <small>{caepi.report.approvedFor}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>observation</code>: <small>{caepi.report.observation}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>laboratory</code>: <small>Objeto</small></Typography>
        <Typography sx={{marginLeft: '20px'}}><code>name</code>: <small>{caepi.report.laboratory.name}</small></Typography>
        <Typography sx={{marginLeft: '20px'}}><code>cnpj</code>: <small>{caepi.report.laboratory.cnpj}</small></Typography>
        <Typography><code>urls</code>: <small>Array</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>url</code>: <small>{caepi.urls[0].url}</small></Typography>
        <Typography sx={{marginLeft: '10px'}}><code>description</code>: <small>{caepi.urls[0].description}</small></Typography>
      </CardContent>
    </React.Fragment>
  );
}