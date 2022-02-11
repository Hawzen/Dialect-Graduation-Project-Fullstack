import { useState } from "react";
import {Paper, Box,Typography,Tabs,Tab,createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import TestCasesList from './TestCasesList'
let theme = createMuiTheme({});

theme = {
  ...theme,
  overrides: {
    MuiTab: {
      root: {
         minWidth: 0,
        '@media (min-width: 0px)': {
          minWidth: 0
        }
      }
    }
  }
}
// Change sentences Later
const egyptList = ['ازيك','تعمل ايه','يا نهار اسود',]
const gulfList = ['وش تسوي','جرب تسوي شاهي','متى نجيكم',]
const iraqList = ['شكو ماكو','عراقي','عراقي',]
const norList = ['جزائر','تونس','جزائر',]
const levList = ['لبنان','الأردن','سوريا',]

export default function TabsTestCases({handleInputChange}) {
  // const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    function inputChange(text){
        handleInputChange(text)
    }
    

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    // <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
    <MuiThemeProvider theme={theme}>

     <Paper>
     <Box sx={{ width: '100%' }}>
       {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box> */}

      {/* <AppBar position="static"> */}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          centered
        >
          <Tab label="ALL" {...a11yProps(0)} />
          <Tab label="GLF" {...a11yProps(1)} />
          <Tab label="EGY" {...a11yProps(2)} />
          <Tab label="IRQ" {...a11yProps(3)} />
          <Tab label="LEV" {...a11yProps(4)} />
          <Tab label="NOR" {...a11yProps(5)} />
        </Tabs>
      {/* </AppBar> */}
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <TestCasesList handleInputChange={inputChange} testCases={[...gulfList,...egyptList,...iraqList,...levList,...norList]}/>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <TestCasesList handleInputChange={inputChange} testCases={gulfList}/>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <TestCasesList handleInputChange={inputChange} testCases={egyptList}/>
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          <TestCasesList handleInputChange={inputChange} testCases={iraqList}/>
        </TabPanel>

        <TabPanel value={value} index={4} dir={theme.direction}>
          <TestCasesList handleInputChange={inputChange} testCases={levList}/>
        </TabPanel>

        <TabPanel value={value} index={5} dir={theme.direction}>
          <TestCasesList handleInputChange={inputChange} testCases={norList}/>
        </TabPanel>

      </SwipeableViews>
    </Box>
    </Paper>
    </MuiThemeProvider>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 6 }}>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
