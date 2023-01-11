import { caepiMocks } from "../../../mock/caepi_mocks";
import { CardContent, Divider, Typography } from "@mui/material";
import { CONFIG } from "../../../util/config";
import { isMobile } from "../../../util/util";

export default function ExampleCaepi() {

    return (
        <CardContent className="card-api-restful">
            <p className="card-api-restful-body-title">Exemplo</p>
            <p className="card-api-restful-body-text">Após o login adicione o Token no header da requisição.</p>
            <p className="card-api-restful-body-text">{CONFIG.urlBase}/api/v1/caepi/46373</p>
            <p className="card-api-restful-body-text">Protocolo: GET</p>
            <p className="card-api-restful-body-text">Authorization: Bearer ...Seu Token...</p>

            <div className="card-api-restful-body">
                {'{'}<br></br>
                <span className="n-1"></span>"number": 46373,<br></br>
                <span className="n-1"></span>"status": "VÁLIDO",<br></br>
                <span className="n-1"></span>"update": "2022-11-29T13:24:56.758",<br></br>
                <span className="n-1"></span>"validity": "2026-08-11",<br></br>
                <span className="n-1"></span>"equipment": {'{'}<br></br>
                    <span className="n-2"></span>"name": "LUVA PARA PROTEÇÃO CONTRA AGENTES TÉRMICOS E MECÂNICOS",<br></br>
                    <span className="n-2"></span>"description": "Luva de segurança confeccionada em fios de nylon, punho tricotado em elástico, acabamento em overloque. ",<br></br>
                    <span className="n-2"></span>"brand": "Etiqueta no punho.",<br></br>
                    <span className="n-2"></span>"color": "Cinza.",<br></br>
                    <span className="n-2"></span>"origin": "Importado",<br></br>
                    <span className="n-2"></span>"manufacturer":  {'{'}<br></br>
                    <span className="n-3"></span>"name": "INOVA COMERCIO DE EPIS, HIGIENE E LIMPEZA LTDA",<br></br>
                    <span className="n-3"></span>"cnpj": "07145732000119"<br></br>
                    <span className="n-1"></span>{'}'}<br></br>
                    {'}'},<br></br>
                    <span className="n-1"></span>"report": {'{'}<br></br>
                    <span className="n-2"></span>"standard": "EN 407:2004",<br></br>
                    <span className="n-2"></span>"reportNumber": "",<br></br>
                    <span className="n-2"></span>"process": null,<br></br>
                    <span className="n-2"></span>"restriction": "EPI NÃO APROVADO CONTRA ARCO ELÉTRICO, FOGO REPENTINO E COMBATE A INCÊNDIO.",<br></br>
                    <span className="n-2"></span>"reference": "Polisafe I7003.   ",<br></br>
                    <span className="n-2"></span>"approvedFor": "PROTEÇÃO DAS MÃOS DO USUÁRIO CONTRA AGENTES ABRASIVOS, ESCORIANTES, CORTANTES E PERFURANTES E CONTRA AGENTES TÉRMICOS  (CALOR DE CONTATO).",<br></br>
                    <span className="n-2"></span>"observation": "I- O EPI obteve resultado de níveis de desempenho 2141A para BS EN 388, com valores variando de 1 (um) a 4 (quatro) para abrasão, rasgamento e perfuração e 1 (um) a 5 (cinco) para corte, sendo 1 (um) o pior resultado, em que:2 - resistência à abrasão; 1 - resistência ao corte por lâmina; 1 - resistência ao rasgamento; 1 - resistência à perfuração por punção;A - resistência ao corte TDM (ensaio adicional previsto na norma EN ISO 13997, com valores variando de A a F, sendo F o melhor resultado);II- O EPI obteve resultado de níveis de desempenho X1XXXX para a EN 407:2004, em que: X - propagação de pequenas chamas;1 - calor de contato; X - calor convectivo; X - calor radiante; X - respingos de metais fundidos;X - grandes massas de metal fundido (ferro a 1400º C).III- Os valores variam de 1 (um) a 4 (quatro), sendo 1 (um) o pior resultado.IV) O código X indica que o EPI não foi ensaiado para a aplicação correspondente.V- EPI não aprovado para uso em operações de soldagem e processos similares.VI) Para a seleção e correta utilização do equipamento, verificar o disposto no Comunicado XL, disponível no link \"https://www.gov.br/trabalho/pt-br/inspecao/seguranca-e-saude-no-trabalho/copy_of_equipamentos-de-protecao-individual-epi\".                                                                 VII- Demais especificações técnicas do EPI deverão ser obtidas junto ao fabricante ou importador.",<br></br>
                    <span className="n-2"></span>"laboratory": {'{'}<br></br>
                    <span className="n-3"></span>"name": "IBTEC - INSTITUTO BRASILEIRO DE TECNOLOGIA DO COURO, CALCADO E ARTEFATOS",<br></br>
                    <span className="n-3"></span>"cnpj": "87190161000173"<br></br>
                    <span className="n-1"></span>{'}'}<br></br>
                    {'}'},<br></br>
                    <span className="n-1"></span>"links": [
                        {'{'}<br></br>
                        <span className="n-2"></span>"url": "https://get-caepi.com.br/api/v1/manufacturer/07145732000119?page=0&size=10",<br></br>
                        <span className="n-2"></span>"description": "Returns a page CAEPI by manufacturer, sorted descending by CAEPI number",<br></br>
                        <span className="n-2"></span>"type": "GET",<br></br>
                        <span className="n-2"></span>"parameters":  {'{'}<br></br>
                        <span className="n-3"></span>"Authorization": "Header Param, Bearer ...Your Token...",<br></br>
                        <span className="n-3"></span>"size": "Request Parameter, default 10, minimum 3, maximum 20",<br></br>
                        <span className="n-3"></span>"page": "Request Parameter, default 0"<br></br>
                            {'}'}<br></br>
                        {'}'},<br></br>
                        {'{'}<br></br>
                        <span className="n-2"></span>"url": "https://get-caepi.com.br/api/v1/laboratory/87190161000173?page=0&size=10",<br></br>
                        <span className="n-2"></span>"description": "List CAEPI by laboratory, sorted descending by CAEPI number",<br></br>
                        <span className="n-2"></span>"type": "GET",<br></br>
                        <span className="n-2"></span>"parameters": {'{'}<br></br>
                        <span className="n-3"></span>"Authorization": "Header Parameter, Bearer ...Your Token...",<br></br>
                        <span className="n-3"></span>"size": "Request Parameter, default 10, minimum 3, maximum 20",<br></br>
                        <span className="n-3"></span>"page": "Request Parameter, default 0"<br></br>
                        <span className="n-2"></span>{'}'}<br></br>
                    <span className="n-1"></span>{'}'}<br></br>
                    <span className="n-1"></span>]<br></br>
                {'}'}<br></br>
            </div>

            <p className="card-api-restful-info">
                <span>*</span> Nossa API pode ser implementada em qualquer linguagem de programação. 
                Utilizamos os melhores padrões do mercado, 
                você pode contar com uma documentação completa e objetiva.
            </p>
        </CardContent>
    )
}
