import { React,useEffect, useState} from "react"; 
import {  Grid, TextField,  ThemeProvider, createMuiTheme } from "@material-ui/core";
import TestCasesList from "./TestCasesList";
const rtlTheme = createMuiTheme({direction: 'rtl', });
export {rtlTheme}


export default function ControlPanel(props){
    const setPreds = props.setPreds;

    let [textField, setTextField] = useState("");

    
    const updatePreds = () => {
        const message = JSON.stringify({text: textField});
        fetch("/api/text", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'        
            },
            body: message 
        })
            .then(resp => resp.json())
            .then(resp => setPreds(resp.prediction));
    }

    useEffect(() => {
        const timeoutId = setTimeout(updatePreds, 1000);
        return () => clearTimeout(timeoutId);
      }, [textField]);
    
    const handleInputChange = (text)=>{
        setTextField(text)
    }
    

    return (
        <Grid container direction="column" justify="flex-end" alignItems="stretch" style={{padding: "5em", marginTop: "1em"}}>
            {/* <Grid item style={{width: "80%", minWidth: "80%", marginBottom: "5em"}}>
                <PercentageResults/>
            </Grid> */}
            <Grid item>
                <ThemeProvider theme={rtlTheme}>
                <div dir="rtl">
                <TextField
                    onChange={e => setTextField(e.target.value)}
                    value={textField}
                    label="Predict Region"
                    style={{width: "auto", display: "block"}}
                    placeholder="اهلا وسهلا"
                    helperText="Enter text in Arabic"
                    fullWidth
                    multiline
                    margin="normal"
                />
                </div>
                </ThemeProvider>
            </Grid>
            <Grid item>
                <TestCasesList handleInputChange={handleInputChange} />
            </Grid>

        </Grid>
    )
}