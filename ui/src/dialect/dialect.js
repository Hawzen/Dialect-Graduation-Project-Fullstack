import { 
    createMuiTheme, 
    Grid, 
    StylesProvider, 
    jssPreset, 
 } from "@material-ui/core";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { useState } from "react";
import Welcome from "./Welcome";
import GlobePlot from "./GlobePlot";
import ControlPanel from "./ControlPanel";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function Dialect(){
    let [preds, setPreds] = useState({GLF: 0, EGY: 0, IRQ: 0, LEV: 0, NOR: 0})
    return (
        <StylesProvider jss={jss}>
            {/* alignItems="stretch" */}
        <Grid container direction="column" >
            <Welcome/>
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
