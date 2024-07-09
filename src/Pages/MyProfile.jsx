import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Cart from '../Components/Cart';
import MyOrders from '../Components/MyOrders';
import './profile.css'
import { green } from '@mui/material/colors';
import Footer from '../Components/Footer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >


      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box 
      sx={{ flexGrow: 1,minHeight:'90vh', bgcolor: '#f3e7c5', display: 'flex', height: 'auto' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider',width:'10vw'}}
      >
        <Tab  className='tab_profile'  label="My Orders" {...a11yProps(1)} />
        <Tab  className='tab_profile' label="My Cart" {...a11yProps(0)} />
      </Tabs>
      <TabPanel className='w-100'  value={value} index={0}>
        <MyOrders/>
      </TabPanel>
      <TabPanel className='w-100' value={value} index={1}>
        <Cart/>
      </TabPanel>
     
    </Box>
    <Footer/>
    </>
  );
}
