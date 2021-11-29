import { 
    Grid, 
    StylesProvider, 
    jssPreset, 
    Container
 } from "@material-ui/core";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { useState } from "react";
import Welcome from "./Welcome";
import GlobePlot from "./GlobePlot";
import ControlPanel from "./ControlPanel";
import TabsTestCases from "./TabsTestCases"

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function Dialect(){
    let [preds, setPreds] = useState({GLF: 0, EGY: 0, IRQ: 0, LEV: 0, NOR: 0})
    return (

          <StylesProvider jss={jss}>
            {/* alignItems="stretch" */}
        <Container fixed>
        <Grid container direction="column" style={{flexWrap:"nowrap"}} >

            <Grid Item>
                <Welcome/>
            </Grid>
            <Grid item style={{margin: "auto", marginTop: "2em"}}>
                <GlobePlot preds={preds}/>
            </Grid>
            <Grid item>
                <ControlPanel setPreds={setPreds}/>
            </Grid>

        </Grid>
        </Container>
        </StylesProvider>

    )
}
