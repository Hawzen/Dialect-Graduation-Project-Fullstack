import $ from 'jquery'
import { React,useEffect, useState} from "react"; 
import {  Grid, TextField,  ThemeProvider, createMuiTheme } from "@material-ui/core";
import TabsTestCases from './TabsTestCases';
const rtlTheme = createMuiTheme({direction: 'rtl', });
export {rtlTheme}

export default function ControlPanel({setPreds,model}){
    // const setPreds = props.setPreds;

    let [textField, setTextField] = useState("");

    
    const updatePreds = () => {        
        const message = JSON.stringify({text: textField});
         
        if(textField.length!==0){
            console.log(model)
            if(model===0) fetchApi(model,textField,setPreds);
            if(model === 1) fetchApi(model,textField,setPreds);

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
            <Grid item style={{marginBottom:'2rem'}}>
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
function fetchApi(modelNumber,text,setPreds){
    const bertApi = "https://us-central1-dialect-project-328413.cloudfunctions.net/dialect-prediction-BERT"
    const bayesApi = "https://us-central1-dialect-project-328413.cloudfunctions.net/dialect-prediction-naive-bayes"

    const modelsArr = [bertApi,bayesApi]

    $.ajax(
        {
            type: "POST",
            url: modelsArr[modelNumber],
            data: JSON.stringify({"text" : text}),
            dataType:'json',
            success: function (response) {

        setPreds({GLF: response[1], EGY: response[0], IRQ: response[2], LEV: response[3], NOR: response[4]})
            },
            error: function (err) {
                console.log(err);
            },
            });
            


}