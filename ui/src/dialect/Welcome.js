import React from 'react'
import {Box,Container, Grid,Typography,createMuiTheme,MuiThemeProvider} from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
        h2:{
        fontFamily: [
        'monospace',
        'roboto',
        'sans-serif'
        ].join(','),
         '@media (max-width:600px)': {
    fontSize: '3.3rem',
  },
         '@media (max-width:500px)': {
    fontSize: '2.3rem',
  },
    },         h5:{
        fontFamily: [

            'Merriweather'
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
                DIALECT CLASSIFICATION
                </Typography> 
        <Grid container style={{marginTop: '2rem'}} justify="center">
             
            <Grid item> <Typography variant="h5" align="center" paragraph color="textPrimary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fringilla feugiat massa. In mollis lobortis lorem, quis pretium sapien imperdiet nec. Integer ipsum massa, placerat eu leo sit amet, convallis aliquam enim. Quisque consectetur tellus.
            </Typography> </Grid>
            {/* <Grid item md={6}> <Typography variant="h5" align="center" paragraph color="textSecondary">
                .هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ

                </Typography> </Grid> */}
        </Grid>
       </Container>
        </MuiThemeProvider>
    )
}