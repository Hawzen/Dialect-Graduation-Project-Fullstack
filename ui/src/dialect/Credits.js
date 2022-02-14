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
  

export default function Credits(){
    return <div/>
    return (
    <MuiThemeProvider theme={theme}>
        <Container >
            <Typography  variant="h4" align="left" gutterBottom color="textPrimary" style={{marginTop: '6rem'}}>Source Code</Typography> 
            <Divider orientation="horizontal" style={{height:'2px'}}/>
        <Grid container style={{marginTop: '1.2rem'}} justify="left">
            
            <Grid item > 
                <Container flex>
                    <Typography variant="h4" align="left" paragraph color="textSecondary" >Something</Typography>
                </Container>
            </Grid>
        </Grid>
        </Container>
    </MuiThemeProvider>
    )

} 