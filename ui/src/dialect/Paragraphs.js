import React from 'react'
import {Divider, Paper, createMuiTheme,MuiThemeProvider,Container, Grid,Typography} from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
        h4:{
        fontFamily: [
        'Oswald',
        'roboto',
        'sans-serif'
        ].join(','),
    },
    //     h5:{
    //     fontFamily: [

    //     // 'monospace',
    //     // 'roboto',
    //     // 'sans-serif'
    //     ].join(','),
    // },

}});


export default function Paragraphs() {
    return (
        <MuiThemeProvider theme={theme}>

        <Container>

        
        {/* <Paper > */}
        <Container >
            <Typography  variant="h4" align="left" gutterBottom color="textPrimary" style={{marginTop: '6rem'}}>Data Collection</Typography> 
            <Divider orientation="horizontal" style={{height:'2px'}}/>
        <Grid container style={{marginTop: '1.2rem'}} justify="center">
             
            <Grid item > 
                <Typography variant="h5" align="left" paragraph color="textSecondary" >
                    We have used the Social Media Arabic Dialect Corpus(SMADC) dataset made by Areej Alshutayri and Eric Atwell.  The SMADC dataset contained 1,088,578 documents.  which consisted of 812,849 Facebook comments, 9,440 online newspaper comments, and 266,289 Twitter tweets.  And each one of them are distributed in the five labels (GLF, EGY, NOR, LEV and IRQ).
                </Typography> 
            </Grid>
        </Grid>
       </Container>

        <Container >
            <Typography  variant="h4" align="left" gutterBottom color="textPrimary" style={{marginTop: '4.5rem'}}>Models</Typography> 
            <Divider orientation="horizontal" style={{height:'2px'}}/>
        <Grid container style={{marginTop: '1.2rem'}} justify="center">
             
            <Grid item > 
                <Typography variant="h5" align="left" paragraph color="textSecondary" >
                    We have used the Social Media Arabic Dialect Corpus(SMADC) dataset made by Areej Alshutayri and Eric Atwell.  The SMADC dataset contained 1,088,578 documents.  which consisted of 812,849 Facebook comments, 9,440 online newspaper comments, and 266,289 Twitter tweets.  And each one of them are distributed in the five labels (GLF, EGY, NOR, LEV and IRQ).
                </Typography> 
            </Grid>
        </Grid>
       </Container>

            {/* </Paper> */}

        </Container>
        </MuiThemeProvider>
    )
}
