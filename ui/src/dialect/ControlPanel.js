import $ from 'jquery'
import { React,useEffect, useState} from "react"; 
import {  Grid, TextField,  ThemeProvider, createMuiTheme } from "@material-ui/core";
import TabsTestCases from './TabsTestCases';
const rtlTheme = createMuiTheme({direction: 'rtl', });
export {rtlTheme}


export default function ControlPanel(props){
    const setPreds = props.setPreds;

    let [textField, setTextField] = useState("");

    
    const updatePreds = () => {        
         const message = JSON.stringify({text: textField});
         


if(textField.length!==0){

    $.ajax({
            type: "POST",
            url: "https://us-central1-dialect-project-328413.cloudfunctions.net/dialect-predict",
            data: JSON.stringify({"text" : textField}),
            success: function (response) {
                // setPreds(response)
                console.log(response);
            },
            error: function (err) {
                console.log(err);
            },
            });
        }

}

    useEffect(() => {
        const timeoutId = setTimeout(updatePreds, 1000);
        return () => clearTimeout(timeoutId);
      }, [textField]);
    
    const handleInputChange = (text)=>{
        setTextField(text)
    }
    

    return (
         <Grid container direction="column" justify="flex-end" alignItems="stretch" >
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
                <TabsTestCases handleInputChange={handleInputChange} />
            </Grid>

        </Grid>
    )
}