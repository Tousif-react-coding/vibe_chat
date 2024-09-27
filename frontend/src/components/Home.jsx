import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SignUp from './SignUp';
import Login from './Login';
import Chat2 from './Chat2';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function Home(){
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return(
        <> 
        <div className="home-container">

        <h1>VibeTalk: Chat Your Way</h1>

  <Box sx={{  margin:'auto', display:'flex' ,flexDirection:'column',  alignItems:'center',height:'500px', }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{backgroundColor:"cyan",}}>
          <Tab label="Sign Up" {...a11yProps(0)} />
          <Tab label="Login " {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SignUp/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Login/> 
      </CustomTabPanel>
     
    </Box>

        </div>
     
        
        </>
    )
}