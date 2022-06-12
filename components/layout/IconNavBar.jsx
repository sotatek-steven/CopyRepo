/* eslint-disable no-restricted-globals */
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import {
//   ClientsIcon,
//   DocumentsIcon,
//   HomeIcon,
//   MapViewIcon,
// } from 'assets/icons/sidebarIcon';
import LanguageIcon from '@mui/icons-material/Language';
import LayersIcon from '@mui/icons-material/Layers';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const IconNavBar = ({ name, path }) => {
  const [isSelected, setIsSelected] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    setIsSelected(path !== '/' && pathname.includes(path));
  }, [pathname, setIsSelected, path]);

  const styles = useMemo(() => {
    return {
      listItemBtn: {
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        mx: open ? 0 : -1,
        cursor: 'pointer',
      },
      listItemIcon: {
        minWidth: 42,
        mr: open ? 3 : 'auto',
        justifyContent: 'center',
      },
      listItemText: {
        opacity: open ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      },
    };
  }, [open]);

  return (
    <ListItemButton
      sx={{
        ...styles.listItemBtn,
        backgroundColor: isSelected ? '#F07D60' : 'transparent',
      }}
      onClick={() => {
        router.push(path);
        // (path);
      }}>
      <ListItemIcon
        sx={{
          ...styles.listItemIcon,
        }}>
        {name === 'Dashboard' && <LayersIcon sx={{ color: isSelected ? '#161616' : '#F07D60' }} fontSize="medium" />}
        {name === 'Language' && <LanguageIcon sx={{ color: isSelected ? '#161616' : '#F07D60' }} fontSize="medium" />}
      </ListItemIcon>
    </ListItemButton>
  );
};

export default IconNavBar;
