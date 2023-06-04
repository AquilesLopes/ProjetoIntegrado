import ICaepi from "../interface/ICaepi";
import { formatCNPJ, formatDate, formatDateTime } from "../util/util";



function printPage(html : string){
    var newWin = window.open('','Print-Window');
    newWin?.document.open();
    newWin?.document.write(html);
    newWin?.document.close(); 

    setTimeout(function(){
        newWin?.print();
    }, 1000);
    
    setTimeout(function(){
        newWin?.close();
    }, 3000);
}

function getHead(title : string){
    //<link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
    const head = `<head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>${title}</title>
                    <style>
                      p {
                        font-size: 14px;
                        margin: 0px;
                      }
                      h4, h5 {
                        text-align: center;
                      }
                      footer {
                        position: fixed;
                        bottom: 0;
                        font-size: 12px;
                      }
                      .text-justify {
                        text-align: justify;
                      }
                      .float-end {
                        float: right;
                      }
                    </style>
                </head>`;
    return head;
}

export function printCaepi(caepi : ICaepi){
    const title = `CERTIFICADO DE APROVAÇÃO - CA nº ${caepi.number}`;
    const html = `<!doctype html>
                    <html lang="pt-br">
                        ${getHead(title)}
                        <body>
                        <div class="container">
                            <h4 class="text-center">EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL</h4>
                            <h5 class="text-center">${title}</h5>
                            <h5 class="text-center">${caepi.status}</h5>
                            <br>
                            <p class="my-0"><b>Validade: </b>${formatDate(caepi.validity)}
                               <span class="float-end"><b>nº do Processo: </b> ${caepi.report.reportNumber}</span>
                            </p>
                            <p class="my-0"><b>Produto: </b>${caepi.equipment.origin}</p>
                            <p class="my-0"><b>Equipamento: </b>${caepi.equipment.name}</p>
                            <p class="my-0 text-justify"><b>Descrição: </b>${caepi.equipment.description}</p>
                            <br>
                            <p class="my-0 text-justify"><b>Aprovado para: </b>${caepi.report.approvedFor}</p>
                            <p class="my-0"><b>Restrições/Limitações: </b>${caepi.report.restriction}</p>
                            <p class="my-0 text-justify"><b>Observação: </b>${caepi.report.observation}</p>
                            <br>
                            <p class="my-0"><b>Marcação do CA: </b>${caepi.equipment.brand}</p>
                            <p class="my-0"><b>Referências: </b>${caepi.report.reference}</p>
                            <p class="my-0"><b>Normas técnicas: </b>${caepi.report.standard}</p>
                            <p class="my-0"><b>Nº Laudo: </b>${caepi.report.reportNumber}</p>
                            <p class="my-0"><b>Laboratório: </b>${caepi.report.laboratory.name}</p>
                            <p class="my-0"><b>CNPJ: </b>${formatCNPJ(caepi.report.laboratory.cnpj)}</p>
                            <br>
                            <p class="my-0"><b>Empresa: </b>${caepi.equipment.manufacturer.name}</p>
                            <p class="my-0"><b>CNPJ: </b>${formatCNPJ(caepi.equipment.manufacturer.cnpj)}</p>
                            <footer>
                                <b>Fonte: </b> Base de dados do Departamento de Segurança e Saúde no Trabalho, 
                                publicada em ${formatDateTime(caepi.update)}.
                            </footer>
                        </div>
                        </body>
                    </html>
                `; 
    
    printPage(html)
}

