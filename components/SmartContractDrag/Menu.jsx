import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';

const tabs = [
  {
    label: 'modules',
    text: 'Modules'
  },
  {
    label: 'analytics',
    text: 'Analytics'
  },
  {
    label: 'api',
    text: 'API Services'
  }
];

const Menu = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div style={{
      display: 'flex',
      padding: '0px 25px',
      justifyContent: 'space-between'
    }}>
      {
        tabs.map((item) => {
          const { text, label } = item;
          return <MenuItem
            text={text}
            label={label}
            isActive={activeTab === label}
            setActiveTab={setActiveTab}
            key={label}
          />
        })
      }
    </div>
  )
};

export default Menu;