import {React,useState,Fragment} from 'react'
import {Grid, Button,ButtonGroup,Typography,createMuiTheme,MuiThemeProvider} from '@material-ui/core'
import $ from 'jquery'

const theme = createMuiTheme({
  typography: {

        h2:{
        fontFamily: [
        'Merriweather',
        // 'monospace',
        // 'roboto',
        // 'sans-serif'
        ].join(','),
         '@media (max-width:600px)': {
    fontSize: '3.3rem',
  },
         '@media (max-width:500px)': {
    fontSize: '2.3rem',
  },
    },         h5:{
        fontFamily: [

        // 'Merriweather',
        // 'monospace',
        // 'roboto',
        // 'sans-serif'
        ].join(','),
        // fontStyle:'italic'

    },

}});

export default function Feedback({text,preds,success}) {
    let preds_array= Object.values(preds)
    let predicted_region= Object.keys(preds).reduce((x,y)=> preds[x]>preds[y]? x : y)
    function postFeedback(actual_region){
        if(!success) return
        $.ajax(
            {
                type: "POST",
                url: 'https://us-central1-dialect-project-328413.cloudfunctions.net/save-feedback',
                data: JSON.stringify({"text" : text, "probs":preds_array, "predicted":predicted_region, "actual":actual_region}),
                dataType:'json',
                
                },
            )
         setAnswer(1);   
        };
    

    
    const [answer,setAnswer] = useState(0);
    let output;
    if(answer === 0)
        output =
            <Fragment>
                <Grid item >
                    <Typography color="textPrimary" variant='h6' style={{marginLeft:"1rem"}}>
                        Is the prediction correct?
                    </Typography></Grid>
                    <Grid item >
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" style={{marginLeft:'3rem'}}>
                        <Button onClick={()=>{setAnswer(1); console.log(answer)}}>Yes</Button>
                        <Button onClick={()=>{setAnswer(2); console.log(answer)}}>No</Button>
                    </ButtonGroup>
                </Grid>
            </Fragment>

    else if(answer === 1) 
        output = 
            <Grid item>
                <Typography color="textPrimary"  variant='h6' style={{marginLeft:"1rem"}}>
                Thank you for the feedback!
                </Typography>
            </Grid>
        

    else if(answer === 2) 
        output =
            <Fragment>
                <Grid item>
                    <Typography color="textPrimary"  variant='h6' style={{marginLeft:"1rem"}}>
                        Which dialect does it belong to
                    </Typography></Grid>
                    <Grid item >
                    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" style={{marginLeft:'3rem'}}>
                    <Button onClick={()=>postFeedback('GLF')}>GLF</Button>
                    <Button onClick={()=>postFeedback('EGY')}>EGY</Button>
                    <Button onClick={()=>postFeedback('IRQ')}>IRQ</Button>
                    <Button onClick={()=>postFeedback('LEV')}>LEV</Button>
                    <Button onClick={()=>postFeedback('NOR')}>NOR</Button>
                    </ButtonGroup>
                </Grid>
            </Fragment>

    return(
        <MuiThemeProvider theme={theme}>
            <Grid container justifyContent="center" alignItems="center" style={{padding: "1em"}}>
                {output}
            </Grid> 
        </MuiThemeProvider> 
    )
    
    
  

}