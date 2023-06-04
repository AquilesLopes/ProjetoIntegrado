import { CardContent } from "@mui/material";
import { CONFIG } from "../../../util/config";
import ExampleAxiosGetCaepi from "./ExampleAxiosGetCaepi";
import ExampleJavaGetCaepi from "./ExampleJavaGetCaepi";
import ExamplePythonGetCaepi from "./ExamplePythonGetCaepi";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function ExampleResponseGetCaepi() {

    const codeString = `{
        "number": 46373,
        "status": "VÁLIDO",
        "update": "2022-11-29T13:24:56.758",
        "validity": "2026-08-11",
        "equipment": {
            "name": "LUVA PARA PROTEÇÃO CONTRA AGENTES TÉRMICOS E MECÂNICOS",
            "description": "Luva de segurança confeccionada em fios de nylon, punho tricotado em elástico, acabamento em overloque. ",
            "brand": "Etiqueta no punho.",
            "color": "Cinza.",
            "origin": "Importado",
            "manufacturer": {
                "name": "INOVA COMERCIO DE EPIS, HIGIENE E LIMPEZA LTDA",
                "cnpj": "07145732000119"
            }
        },
        "report": {
            "standard": "EN 407:2004",
            "reportNumber": "EPI 11770/21",
            "process": "14021183721202145",
            "restriction": "EPI NÃO APROVADO CONTRA ARCO ELÉTRICO, FOGO REPENTINO E COMBATE A INCÊNDIO.",
            "reference": "Polisafe I7003.   ",
            "approvedFor": "PROTEÇÃO DAS MÃOS DO USUÁRIO CONTRA AGENTES ABRASIVOS, ESCORIANTES, CORTANTES E PERFURANTES E CONTRA AGENTES TÉRMICOS  (CALOR DE CONTATO).",
            "observation": "I) O EPI obteve resultado de níveis de desempenho 2141A para BS EN 388, com valores variando de 1 (um) a 4 (quatro) para abrasão, rasgamento e perfuração e 1 (um) a 5 (cinco) para corte, sendo 1 (um) o pior resultado, em que:2 - resistência à abrasão; 1 - resistência ao corte por lâmina; 1 - resistência ao rasgamento; 1 - resistência à perfuração por punção;A - resistência ao corte TDM (ensaio adicional previsto na norma EN ISO 13997, com valores variando de A a F, sendo F o melhor resultado);II) O EPI obteve resultado de níveis de desempenho X1XXXX para a EN 407:2004, em que: X - propagação de pequenas chamas;1 - calor de contato; X - calor convectivo; X - calor radiante; X - respingos de metais fundidos;X - grandes massas de metal fundido (ferro a 1400º C).III) Os valores variam de 1 (um) a 4 (quatro), sendo 1 (um) o pior resultado.IV) O código X indica que o EPI não foi ensaiado para a aplicação correspondente.V) EPI não aprovado para uso em operações de soldagem e processos similares.VI) Para a seleção e correta utilização do equipamento, verificar o disposto no Comunicado XL.VII) Demais especificações técnicas do EPI deverão ser obtidas junto ao fabricante ou importador.",
            "laboratory": {
                "name": "IBTEC - INSTITUTO BRASILEIRO DE TECNOLOGIA DO COURO, CALCADO E ARTEFATOS",
                "cnpj": "87190161000173"
            }
        },
        "links": [
            {
                "url": "https://get-caepi.com.br/api/v1/manufacturer/07145732000119?page=0&size=10",
                "description": "Returns a page CAEPI by manufacturer, sorted descending by CAEPI number",
                "method": "GET",
                "parameters": {
                    "Authorization": "Header Param, Bearer ...Your Token...",
                    "size": "Request Parameter, default 10, minimum 3, maximum 20",
                    "page": "Request Parameter, default 0"
                }
            },
            {
                "url": "https://get-caepi.com.br/api/v1/laboratory/87190161000173?page=0&size=10",
                "description": "List CAEPI by laboratory, sorted descending by CAEPI number",
                "method": "GET",
                "parameters": {
                    "Authorization": "Header Parameter, Bearer ...Your Token...",
                    "size": "Request Parameter, default 10, minimum 3, maximum 20",
                    "page": "Request Parameter, default 0"
                }
            }
        ]
}`;

    return (
        <CardContent className="card-api-restful">
            <p className="card-api-restful-body-title">Exemplo de Requisição</p>
            <p className="card-api-restful-body-text">Adicione o Token no header da requisição.</p>
            <p className="card-api-restful-body-text">URL: <span className="card-api-restful-text-code">{CONFIG.urlBase}/api/v1/caepi/46373</span></p>
            <p className="card-api-restful-body-text">Protocolo: <span className="card-api-restful-text-code">GET</span></p>
            <p className="card-api-restful-body-text">Authorization: <span className="card-api-restful-text-code">Bearer ...Seu Token...</span></p>
            <ExampleAxiosGetCaepi />
            <ExampleJavaGetCaepi />
            <ExamplePythonGetCaepi />
            <p className="card-api-restful-body-title">Exemplo de Resposta</p>
            <div className="card-api-restful-body">
                <SyntaxHighlighter
                    lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                    wrapLines={true} language="json" style={atomOneLight}>
                    {codeString}
                </SyntaxHighlighter>
            </div>

            <p className="card-api-restful-info">
                <span>*</span> Nossa API pode ser implementada em qualquer linguagem de programação. 
                Utilizamos os melhores padrões de mercado, 
                você pode contar com uma documentação completa, atualizada e objetiva.
            </p>
        </CardContent>
    )
}
