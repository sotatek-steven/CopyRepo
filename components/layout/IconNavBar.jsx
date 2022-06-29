/* eslint-disable no-restricted-globals */
import { ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
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
  const theme = useTheme();

  useEffect(() => {
    setIsSelected(path !== '/' && pathname.includes(path));
  }, [pathname, setIsSelected, path]);

  const styles = useMemo(() => {
    return {
      listItemBtn: {
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
        marginRight: '8px',
        cursor: 'pointer',
      },
      listItemIcon: {
        // minWidth: 10,
        marginRight: '30px',
        justifyContent: 'center',
        position: 'absolute',
        left: '0px',
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
        backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
        borderRadius: '0 4px 4px 0',
      }}
      onClick={() => {
        router.push(path);
        // (path);
      }}>
      <ListItemIcon
        sx={{
          ...styles.listItemIcon,
        }}>
        {name === 'Dashboard' && (
          <LayersIcon sx={{ color: isSelected ? '#161616' : theme.palette.primary.main }} fontSize="medium" />
        )}
        {name === 'Language' && (
          <LanguageIcon sx={{ color: isSelected ? '#161616' : theme.palette.primary.main }} fontSize="medium" />
        )}
      </ListItemIcon>
    </ListItemButton>
  );
};

export default IconNavBar;
