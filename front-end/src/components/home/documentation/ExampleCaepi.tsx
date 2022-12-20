import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

import { caepiMocks } from "../../../mock/caepi_mocks";
import { CardContent, Divider, Typography } from "@mui/material";
import { CONFIG } from "../../../util/config";
import { isMobile } from "../../../util/util";

export default function ExampleCaepi() {

    const height = isMobile ? '550px' : '650px';

    return (
        <CardContent>
            <Typography variant="h6" sx={{textAlign: 'center'}} component="div">Exemplo</Typography>
            <Typography>Após o login adicione o Token no header da requisição.</Typography>
            <Typography><code>{CONFIG.urlBase}/api/v1/caepi/47504</code></Typography>
            <Typography><code>Protocolo</code>: <small><b>GET</b></small></Typography>
            <Typography><code>Authorization</code>: <small>Bearer ...Seu Token...</small></Typography>
            <Divider light sx={{marginTop: '5px', marginBottom: '5px'}} />
            <AceEditor 
                mode="json"
                theme="github"
                name="CAEPI"
                value={JSON.stringify(caepiMocks.content[0],null,5)}
                height={height}
                width='100%'
                fontSize={14}
                editorProps={{
                    $blockScrolling: false,
                }}
            />
        </CardContent>
    )
}
