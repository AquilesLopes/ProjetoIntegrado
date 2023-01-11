import * as React from 'react';
import { CardContent } from '@mui/material';
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
    {
      url: 'Endereço URL', 
      description: 'Descreve o que a URL faz',
      type: 'GET | POST | PUT | PATCH | DELETE', 
      parameters: [
        {nameParameter: 'Descreve regras para o parâmetro'}
      ]
    }
  ]
}

export default function CardContentCaepi() {
  return (
    <React.Fragment>
      <CardContent className="card-api-restful">
        <span className="card-api-restful-title">API RESTFul</span>
        <p className="card-api-restful-sub-title">Fornece dados de completos sobre os certificados. API fácil de implementar, com respostas e parâmetros objetivos.</p>
        <p className="card-api-restful-body-title">Estrutura de dados CAEPI</p>
        <p className="card-api-restful-body-text">Após o login adicione o Token no header da requisição.</p>
        <p className="card-api-restful-body-text">{CONFIG.urlBase}/api/v1/caepi/{"{NÚMERO_REGISTRO_CA}"}</p>
        <p className="card-api-restful-body-text">Protocolo: GET</p>
        <p className="card-api-restful-body-text">Authorization: Bearer ...Seu Token...</p>
        
        <div className="card-api-restful-body">
          <p>number: {caepi.number}</p>
          <p>status: {caepi.status}</p>
          <p>update: {caepi.update}</p>
          <p>validity: {caepi.validity}</p>
          <p>equipment: </p>
          <p>name: {caepi.equipment.name}</p>
          <p>description: {caepi.equipment.description}</p>
          <p>brand: {caepi.equipment.brand}</p>
          <p>color: {caepi.equipment.color}</p>
          <p>origin: {caepi.equipment.origin}</p>
          <p>manufacturer: {"Objeto {}"}</p>
          <p>name: {caepi.equipment.manufacturer.name}</p>
          <p>cnpj: {caepi.equipment.manufacturer.cnpj}</p>
          <p>report: {"Objeto {}"}</p>
          <p>standard: {caepi.report.standard}</p>
          <p>reportNumber: {caepi.report.reportNumber}</p>
          <p>process: {caepi.report.process}</p>
          <p>restriction: {caepi.report.restriction}</p>
          <p>reference: {caepi.report.reference}</p>
          <p>approvedFor: {caepi.report.approvedFor}</p>
          <p>observation: {caepi.report.observation}</p>
          <p>laboratory: {"Objeto {}"}</p>
          <p>name: {caepi.report.laboratory.name}</p>
          <p>cnpj: {caepi.report.laboratory.cnpj}</p>
          <p>urls: Array</p>
          <p>url: {caepi.urls[0].url}</p>
          <p>type: {caepi.urls[0].type}</p>
          <p>description: {caepi.urls[0].description}</p>
          <p>parameters: {"Array<String, String>"}</p>
          <p>parameterName: {caepi.urls[0].parameters[0].nameParameter}</p>
        </div>
      </CardContent>
    </React.Fragment>
  );
}