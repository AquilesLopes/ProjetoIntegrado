import * as React from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { toast, ToastContainer } from 'react-toastify';

export default function InfoDocumentationFull() {

  function openDocumentation(){
    toast("Ao clicar o usuário será direcionado para a documentação gerada pelo Swagger.");
  }

  return (
    <React.Fragment>
      <Card className="card">
          <CardContent>
              <Typography variant="h4" component="div"><InsertDriveFileIcon /> Veja nossa documentação completa! </Typography>
              <Typography>
                Nossa documentação é simples e intuitiva, veja como é simples integrar sua aplicação.
              </Typography>
              <Typography>
                Clara, simples e objetiva, feita de desenvolvedor para desenvolvedor.
              </Typography>

              <Button sx={{marginTop: '20px'}} onClick={openDocumentation} variant="contained" color="secondary">
                Ver Documentação <DoubleArrowIcon />
              </Button>
          </CardContent>
      </Card>
      <Card className="card">
          <CardContent>
              <Typography variant="h6" component="div">Funciona na minha liguagem de programação?</Typography>
              <Typography>
                Sim! Nossa API pode ser implementada em qualquer linguagem de programação. 
                Utilizamos padrão de mercado, com documentação completa e objetiva.
              </Typography>
          </CardContent>
      </Card>
    </React.Fragment>
  );
}