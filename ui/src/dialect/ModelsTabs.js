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

export default function ModelsTabs({setModel}) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  function handleClick(n){
    setModel(n);
    console.log(this);

  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MuiThemeProvider theme={theme}>

            <Typography variant="h4" align="center" gutterBottom color="textPrimary" style={{marginTop: '60px'}}>
                LIVE DEMO
                </Typography> 
    <div className={classes.root}>
      

      {/* <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={()=>setModel(0)}>BERT</Button>
        <Button onClick={()=>setModel(1)}>BAYES</Button>
      </ButtonGroup> */}
       <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label=""
      >
        <Tab label="BERT" onClick={()=>{handleClick(0)}} />
        <Tab label="BAYES" onClick={()=>{handleClick(1)}} />
      </Tabs>
    </Paper>
      {/* <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup> */}
    </div>
    </MuiThemeProvider>
  );
}
