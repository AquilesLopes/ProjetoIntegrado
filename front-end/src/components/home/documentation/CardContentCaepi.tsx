import * as React from 'react';
import { CardContent } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CardContentCaepi() {

  const codeString = `{
    "number": "Número de registro do Certificado de Aprovação - CA",
    "status": "Status do CA - VÁLIDO | EXPEDIDO | SUSPENSO | CANCELADO | VENCIDO",
    "update": "Data e hora da publicação pelo Departamento de Segurança e Saúde no Trabalho no formato yyyy-MM-ddTHH:mm:ss",
    "validity": "Data de vencimento do EPI no formato yyyy-MM-dd",
    "equipment": {
      "name": "Nome do Equipamento de Proteção Individual - EPI",
      "description": "Descrição do EPI",
      "brand": "Marcação do CA",
      "color": "Cor do EPI",
      "origin": "Origem do EPI - Nacional | Importado",
      "manufacturer": {
        "name": "Razão do Fabricante",
        "cnpj": "CNPJ do Fabricante"
      }
    },
    "report": {
      "standard": "Norma Técnica",
      "reportNumber": "Número do Laudo do Relatório Técnico",
      "process": "Número do processo no Departamento de Segurança e Saúde no Trabalho",
      "restriction": "Restrição do EPI",
      "reference": "Normas de Referência",
      "approvedFor": "EPI aprovado para ...",
      "observation": "Observação do EPI",
      "laboratory": {
        "name": "Razão do Laboratório",
        "cnpj": "CNPJ do Laboratório"
      }
    },
    "urls": [
      {
        "url": "Endereço URL", 
        "description": "Descreve o que a URL faz",
        "method": "GET | POST | PUT | PATCH | DELETE", 
        "parameters": [
          {"nameParameter": "Descreve regras para o parâmetro"}
        ]
      }
    ]
}`;

  return (
    <React.Fragment>
      <CardContent className="card-api-restful">
        <span className="card-api-restful-title">API RESTFul</span>
        <p className="card-api-restful-sub-title">Fornece dados completos sobre os certificados. API fácil de implementar, com respostas e parâmetros objetivos.</p>
        <p className="card-api-restful-body-title">Estrutura de dados CAEPI</p>
        
        <div className="card-api-restful-body">
            <SyntaxHighlighter
                lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap', width: '350px'}}}
                wrapLines={true} 
                language="json" style={atomOneLight}>
                {codeString}
            </SyntaxHighlighter>
        </div>
      </CardContent>
    </React.Fragment>
  );
}