import { useState } from "react";
import {Container, Box,Typography,AppBar,Tabs,Tab,useTheme,createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import TestCasesList from './TestCasesList'
let theme = createMuiTheme({});

theme = {
  ...theme,
  overrides: {
    MuiTab: {
      root: {
        // [theme.breakpoints.down("sm")]: {
        // }
         minWidth: 0,
        '@media (min-width: 0px)': {
          minWidth: 0
        }
      }
    }
  }
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

export default function FullWidthTabs() {
  // const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    // <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
    <MuiThemeProvider theme={theme}>

     <Box sx={{ width: '100%' }}>
       {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box> */}

     {/* <Box> */}
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
          <TestCasesList/>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          GLF
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          EGY
        </TabPanel>

        <TabPanel value={value} index={3} dir={theme.direction}>
          IRQ
        </TabPanel>

        <TabPanel value={value} index={4} dir={theme.direction}>
          LEV
        </TabPanel>

        <TabPanel value={value} index={5} dir={theme.direction}>
          NOR
        </TabPanel>

      </SwipeableViews>
    </Box>
    </MuiThemeProvider>
  );
}

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <MuiThemeProvider theme={theme}>

//     <Box sx={{ width: '100%' }}>
//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         {/* <AppBar position="static"> */}
//         <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth" >
//           <Tab label="ALL" {...a11yProps(0)} />
//           <Tab label="GLF" {...a11yProps(1)} />
//           <Tab label="EGY" {...a11yProps(2)} />
//           <Tab label="IRQ" {...a11yProps(3)} />
//           <Tab label="LEV" {...a11yProps(4)} />
//           <Tab label="NOR" {...a11yProps(5)} />
//         </Tabs>
//         {/* </AppBar> */}
//       </Box>
//       <TabPanel value={value} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//     </Box>
//     </MuiThemeProvider>
//   );
// }