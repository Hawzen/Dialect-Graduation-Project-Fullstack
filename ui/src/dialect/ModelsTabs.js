import {useState} from 'react'
import {Paper,Tab,Tabs,makeStyles,createMuiTheme,MuiThemeProvider,Typography} from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
        h4:{
        fontFamily: [
        'oswald',
        'roboto',
        'sans-serif'
        ].join(','),
        fontSize:'2.5rem'
    },
}});


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ModelsTabs({setModel,fetchApi}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleClick = (n)=> {

  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setModel(newValue);
    fetchApi(newValue);

  };

  return (
    <MuiThemeProvider theme={theme}>

            <Typography variant="h4" align="center" gutterBottom color="textPrimary" style={{marginTop: '60px'}}>
                LIVE DEMO
                </Typography> 
    <div className={classes.root}>
       <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="Models options"
      >
        <Tab label="BERT" />
        <Tab label="BAYES"/>
      </Tabs>
    </Paper>
    </div>
    </MuiThemeProvider>
  );
}
