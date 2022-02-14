import React from 'react'
import {Container, Grid,Typography,createMuiTheme,MuiThemeProvider} from '@material-ui/core'

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

        'Merriweather',
        // 'monospace',
        // 'roboto',
        // 'sans-serif'
        ].join(','),
        fontStyle:'italic'
    
    },

}});

export default function Welcome() {
    return (

    <MuiThemeProvider theme={theme}>
        <Container >
            <Typography variant="h2" align="center" gutterBottom color="textPrimary" style={{marginTop: '60px'}}>
                {/* <mark style={{backgroundColor: "rgba(255, 229, 82, 0.1)"}}>Arabic Dialect Classification</mark> */}
                Arabic Dialect Classification
            </Typography> 
            <Grid container style={{marginTop: '2rem'}} justify="center">
                
                <Grid item> <Typography variant="h5" align="center" paragraph color="textPrimary">
                Classifying Arabic text based on its dialect.
                </Typography> </Grid>
            </Grid>
        </Container>
    </MuiThemeProvider>
    )
}