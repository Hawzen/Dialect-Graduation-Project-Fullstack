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

const egyptList = ["انا ابص يمين وشمال ومش فاهم",'ازيك النهاردة','الزمالك فريق جامد أوي','يا عم ريح بالك يا عم',"عاوز اعمل اي حاقة"]
const gulfList = ['وشرايك نقوم نطلع بدل ما انت قاعد تسذا؟','يا رجال، اسحب عليه ما عنده سالفة','وش كنت قاعد تحوس فيه؟',"ما قصرت يبو فهد, كفيت ووفيت","تراك طولت علينا وينك"]
const iraqList = [' مرات من نحجي الصدق نطلع صدق مو خوش','رحنه وكت الجاي جفي عالأربيل',"ضعنه وضاعت اللمه وكلمن منتهي بهمه","دخيل عيونج شكد بينهن سوالف"]
const norList = ['صعيبة واش عطاتو','حنا بحال بحال  كنربحو كنخسرو مادمنا خاوة خاوة','وقعات احداث الى يومنا هذا مفهمناش علاش مربحناش اللقب'," الحساب حسابي وماقدراتش ندخله","وينتا تردنا الديون تاع القمح لي كانت تديه"]
const levList = ['شو فيك زعلان؟','ما اسدئ انه اخي عاد من حلب','هسا بشوفلك اياه',"شو بدك احكيله؟","لحد اليوم ما عمري شفت زلمة متله"]

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
          indicatorColor="primary"
          textColor="primary"
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
