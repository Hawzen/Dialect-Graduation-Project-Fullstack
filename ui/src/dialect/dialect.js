import { 
    Container, 
    createMuiTheme, 
    Grid, 
    TextField, 
    StylesProvider, 
    jssPreset, 
    ThemeProvider, 
    useMediaQuery, 
    useTheme,
    Button
 } from "@material-ui/core";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { useEffect, useState, lazy, Suspense } from "react";
import TestCasesList from "./TestCasesList";
const Plot = lazy(() => import("react-plotly.js"));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const rtlTheme = createMuiTheme({
    direction: 'rtl',
});

export {rtlTheme}

export default function Dialect(){
    let [preds, setPreds] = useState({GLF: 0, EGY: 0, IRQ: 0, LEV: 0, NOR: 0})
    return (
        <StylesProvider jss={jss}>
            {/* alignItems="stretch" */}
        <Grid container direction="column" >
            <Grid item style={{margin: "auto", marginTop: "3em"}}>
                <GlobePlot preds={preds}/>
            </Grid>
            <Grid item>
                <ControlPanel setPreds={setPreds}/>
            </Grid>
            {/* <Grid item> 
                <TestCasesList/>
            </Grid> */}
        </Grid>
        </StylesProvider>
    )
}

function GlobePlot(props){
    const preds = props.preds

    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down("xs"));
    const sm = useMediaQuery(theme.breakpoints.down("sm"));
    const md = useMediaQuery(theme.breakpoints.down("md"));
    const lg = useMediaQuery(theme.breakpoints.down("lg"));
    const xl = useMediaQuery(theme.breakpoints.down("xl"));
    
    const size = () => {
        if (xs)
            return {width: 300, height: 150}
        else if (sm)
            return {width: 500, height: 250}
        else if (md)
            return {width: 700, height: 350}    
        else if (lg)
            return {width: 900, height: 450}        
        else if (xl)
            return {width: 1000, height: 500};
        else
            return {width: 1000, height: 500};
    }
    // alert(xs || sm || md || lg || xl)
    return (
        // SORRY FOR SHIT CODE
        <Suspense fallback={<div>Loading...</div>}>
            <Plot
                data={[
                    {
                    type: 'choropleth',
                    locations: ["EGY", // Egypt
                                "SAU", "KWT", "QAT", "ARE", "BHR", "OMN", // GLF
                                "IRQ", // IRQ
                                "SYR", "PSE", "JOR", // LEV
                                "MAR", "DZA", "LBY", "TUN"], // NOR
                    z: [preds.EGY, 
                        preds.GLF, preds.GLF, preds.GLF, preds.GLF, preds.GLF, preds.GLF,
                        preds.IRQ,
                        preds.LEV, preds.LEV, preds.LEV,
                        preds.NOR, preds.NOR, preds.NOR, preds.NOR],
                    text: "SA",
                    zmax: 1,
                    zmin: 0,
                    colorscale: "Reds",
                    showscale: false,
                    }
                ]}
                layout={
                    {
                        // title: "Drawing",
                        width: size().width,
                        height: size().height,
                        margin: {
                            l: 0,
                            r: 0, 
                            t: 0,
                            b: 0,
                        },
                        geo: {
                            projection: {
                                scale: 4.25,
                                type: "robinson",   
                            },  
                            center: {
                                    lon: 22,
                                    lat: 30,
                            },
                        }
                    }
                }
                config={{
                    displayModeBar: false,
                    responsive: true,
                }}
                
            />
        </Suspense>
        // END SHIT CODE
    )    
}

function ControlPanel(props){
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

// function PercentageResults(props){
//     let regions = ["Gulf", "Eygpt", "Iraq", "Lev", "NOR"]
//     return (
//         <Grid container justify="space-between" >
//             {regions.map(region => {
//                 return (
//                     <Grid item>
//                         {region}: 100%
//                     </Grid>
//                 )
//             })}
//         </Grid>
//     )
// }
// testcases - 