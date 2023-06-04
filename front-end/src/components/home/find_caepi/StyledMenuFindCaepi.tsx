import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IOptionFind } from '../../../interface/IOptionFind';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getSearchState, setSearchState } from '../../../features/searchStateReducer';
import { ISearch } from '../../../interface/ISearch';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const ITEM_HEIGHT = 48;

export default function StyledMenuFindCaepi(data: any) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const searchCaepi = useAppSelector(getSearchState);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function changeOption(option: IOptionFind){

    const search : ISearch = {
        type: option.code,
        cnpj: '',
        number: 0,
        color: '', 
        time: 0
    }

    dispatch(setSearchState(search));
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuOpenIcon />
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
        {data.options.map((option: IOptionFind) => (
          <MenuItem key={option.id} 
            selected={searchCaepi.type === option.code} onClick={() => changeOption(option)}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}