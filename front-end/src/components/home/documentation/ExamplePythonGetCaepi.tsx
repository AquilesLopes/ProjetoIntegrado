import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { isMobile, styleModal } from "../../../util/util";
import DataObjectIcon from '@mui/icons-material/DataObject';

export default function ExamplePythonGetCaepi() {
    const [open, setOpen] = useState(false);
    const widthModal = isMobile ? '98%' : '65%';
    const codeString = `     import requests

  response = requests.get(
            'https://getcaepi.com.br/api/v1/caepi/46373',
            headers={'Authorization': 'Bearer YOUR_ACCESS_TOKEN'}
  )
    
    if response.status_code != 200:
        raise Exception(f'Error: {response.status_code}')
    
   json_response = response.json()
 print(json_response)`;
    
    return (
        <>
            <Button size="small" sx={{marginTop: '10px', marginLeft: '5px'}} 
                    variant="outlined" onClick={() => setOpen(true)}>
                <DataObjectIcon fontSize="small" sx={{marginRight: '3px'}}  /> Python
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={{...styleModal, width: widthModal, p: 0}}>
                <div className="card-api-restful-body card-api-restful-body-modal">
                    <SyntaxHighlighter 
                            lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                            language="java" style={atomOneLight}>
                        {codeString}
                    </SyntaxHighlighter>
                </div>
            </Box>
            </Modal>
        </>
    );
};