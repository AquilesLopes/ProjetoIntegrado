import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { printCaepi } from '../../services/PrintService';
import { Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DescriptionIcon from '@mui/icons-material/Description';

const ITEM_HEIGHT = 48;

export default function MenuInCaepi(args: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function showModal(value : string){
    args.showModal(value);
    setAnchorEl(null);
  }

  const showBtnDescription = () => {
    return args.caepi.equipment.description !== null 
           && args.caepi.equipment.description !== undefined 
           && args.caepi.equipment.description.length > 5 ? true : false;
  }

  const showBtnObservation = () => {
    return args.caepi.report.observation !== null 
           && args.caepi.report.observation !== undefined 
           && args.caepi.report.observation.length > 5 ? true : false;
  }

  return (
    <>
    <div className="menu-card-caepi-desktop">
      <Button className="btn-caepi" onClick={() => printCaepi(args.caepi)}
              color="success" variant="contained" size="small">
        Imprimir <PrintIcon sx={{marginLeft: '5px'}} fontSize="small" />
      </Button>
      {showBtnDescription() ?
        <>
        <br></br>
        <Button className="btn-caepi" onClick={() => showModal(args.caepi.equipment.description)}
                color="success" variant="contained" size="small">
          Descrição <DescriptionIcon sx={{marginLeft: '5px'}} fontSize="small" />
        </Button>
        </>
        : <></>
      }
      {showBtnObservation() ?
        <>
        <br></br>
        <Button className="btn-caepi" onClick={() => showModal(args.caepi.report.observation)}
                color="success" variant="contained" size="small">
          Observação <DescriptionIcon sx={{marginLeft: '5px'}} fontSize="small" />
        </Button>
        </>
        : <></>
      }
    </div>
    <div className="menu-card-caepi-mobile">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={() => printCaepi(args.caepi)}>
            <PrintIcon sx={{marginRight: '5px'}} fontSize="small" /> Imprimir
          </MenuItem>
          {showBtnDescription() ?
            <MenuItem onClick={() => showModal(args.caepi.equipment.description)}>
              <DescriptionIcon sx={{marginRight: '5px'}} fontSize="small" /> Descrição
            </MenuItem>
          : <></>}
          {showBtnObservation() ?
            <MenuItem onClick={() => showModal(args.caepi.report.observation)}>
              <DescriptionIcon sx={{marginRight: '5px'}} fontSize="small" /> Observação
            </MenuItem>
          : <></>}
        </Menu>
      </div>
    </>
  );
}