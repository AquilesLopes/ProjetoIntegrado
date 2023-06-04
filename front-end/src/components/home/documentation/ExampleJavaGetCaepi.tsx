import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { isMobile, styleModal } from "../../../util/util";
import DataObjectIcon from '@mui/icons-material/DataObject';

export default function ExampleJavaGetCaepi() {
    const [open, setOpen] = useState(false);
    const widthModal = isMobile ? '98%' : '65%';
    const codeString = `    import okhttp3.OkHttpClient;
    import okhttp3.Request;
    import okhttp3.Response;
    
    public class Main {
        public static void main(String[] args) throws Exception {
            OkHttpClient client = new OkHttpClient();
    
            Request request = new Request.Builder()
                .url("https://getcaepi.com.br/api/v1/caepi/46373")
                .addHeader("Authorization", "Bearer YOUR_ACCESS_TOKEN")
      .build();
    
            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) throw new Exception("Unexpected code " + response);
            String json = response.body().string();
            System.out.println(json);
      }
    }
  }`;
    
    return (
        <>
            <Button size="small" sx={{marginTop: '10px', marginLeft: '5px'}} 
                    variant="outlined" onClick={() => setOpen(true)}>
                <DataObjectIcon fontSize="small" sx={{marginRight: '3px'}}  /> Java
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={{...styleModal, width: widthModal, p: 0, top: '40%'}}>
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