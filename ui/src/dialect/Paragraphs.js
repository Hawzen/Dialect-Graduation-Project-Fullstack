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
            <Typography  variant="h4" align="left" gutterBottom color="textPrimary" style={{marginTop: '2rem'}}>Summary</Typography> 
            <Divider orientation="horizontal" style={{height:'2px'}}/>
        <Grid container style={{marginTop: '1.2rem'}} justify="left">
            <Grid item > 
                <Typography variant="h5" align="left" paragraph color="textSecondary" >
                    Using the <a href="https://aclanthology.org/W19-5607.pdf">Social Media Arabic Dialect Corpus (SMADC)</a> dataset which is distributed in the five labels (GLF, EGY, NOR, LEV and IRQ), 
                    we fine tuned a number of models, including a BERT model and a Naive Bayes model. We mainly fine-tuned <a href="https://github.com/aub-mind/arabert">AraBERT</a> models.
                    We tested our model using a number of additional datasets, for more info read the research paper <a href="https://www.example.com">here</a>.
                </Typography> 
            </Grid>
        </Grid>
       </Container>

        {/* <Container >
            <Typography  variant="h4" align="left" gutterBottom color="textPrimary" style={{marginTop: '2rem'}}>Paper</Typography> 
            <Divider orientation="horizontal" style={{height:'2px'}}/>
        <Grid container style={{marginTop: '1.2rem'}} justify="left">
            <Grid item > 
                <Typography variant="h5" align="left" paragraph color="textSecondary" >
                    You can browse the research paper <a href="https://www.example.com"> here</a>.
                </Typography> 
            </Grid>
        </Grid>
       </Container>
        
       <Container >
            <Typography  variant="h4" align="left" gutterBottom color="textPrimary" style={{marginTop: '2.5rem'}}>Models</Typography> 
            <Divider orientation="horizontal" style={{height:'2px'}}/>
        <Grid container style={{marginTop: '1.2rem'}} justify="left">
             
            <Grid item > 
                <Typography variant="h5" align="left" paragraph color="textSecondary" >
                    We mainly fine-tuned <a href="https://github.com/aub-mind/arabert">AraBERT</a> models.
                </Typography> 
            </Grid>
        </Grid>
       </Container>

        <Container >
            <Typography  variant="h4" align="left" gutterBottom color="textPrimary" style={{marginTop: '2.5rem'}}>Data</Typography> 
            <Divider orientation="horizontal" style={{height:'2px'}}/>
        <Grid container style={{marginTop: '1.2rem'}} justify="left">
            <Grid item > 
                <Typography variant="h5" align="left" paragraph color="textSecondary" >
                    Using the <a href="https://aclanthology.org/W19-5607.pdf">Social Media Arabic Dialect Corpus (SMADC)</a> dataset which is distributed in the five labels (GLF, EGY, NOR, LEV and IRQ), 
                    we fine tuned a number of models, including a BERT model and a Naive Bayes model. 
                    We tested our model using a number of additional datasets, for more info read the paper linked above.
                </Typography> 
            </Grid>
        </Grid>
       </Container> */}

            {/* </Paper> */}

        </Container>
        </MuiThemeProvider>
    )
}
