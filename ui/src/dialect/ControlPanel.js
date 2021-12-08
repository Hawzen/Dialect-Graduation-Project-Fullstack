import $ from 'jquery'
import { React,useEffect, useState} from "react"; 
import { Container, Button,Grid, TextField,  ThemeProvider, createMuiTheme } from "@material-ui/core";
import TabsTestCases from './TabsTestCases';
const rtlTheme = createMuiTheme({direction: 'rtl', });
export {rtlTheme}

export default function ControlPanel({text,model,setText,fetchApi}){
    
    // let [textField, setTextField] = useState("");
    
    const updatePreds = () => {        
            fetchApi(model);

}

    useEffect(() => {
        const timeoutId = setTimeout(updatePreds, 1000);
        return () => clearTimeout(timeoutId);
      }, [text]);
    
    const handleInputChange = (text)=>{
        setText(text)
    }
    

    return (
         <Grid container direction="column" justify="flex-end" alignItems="stretch" >
            {/* <Grid item style={{width: "80%", minWidth: "80%", marginBottom: "5em"}}>
                <PercentageResults/>
            </Grid> */}
            <Grid item style={{marginBottom:'2rem'}}  >
                <ThemeProvider theme={rtlTheme}>
                <div dir="rtl">
                <TextField
                    onChange={e => setText(e.target.value)}
                    value={text}
                    label="Predict Region"
                    style={{width: "auto", display: "block"}}
                    placeholder="اهلا وسهلا"
                    helperText="Enter text in Arabic"
                    fullWidth
                    multiline
                    margin="normal"
                />
                <Container centered style={{margin:"auto"}}>
{/* 

                   <Button
        variant="contained"
        color="primary"
      >
          Send
      </Button> */}
                </Container>
                </div>
                </ThemeProvider>
            </Grid>
            <Grid item>
                <TabsTestCases handleInputChange={handleInputChange} />
            </Grid>

        </Grid>
    )
}