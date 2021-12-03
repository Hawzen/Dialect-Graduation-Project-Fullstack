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
import Paragraphs from "./Paragraphs";
import ModelsTabs from "./ModelsTabs";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function Dialect(){
    let [preds, setPreds] = useState({GLF: 0, EGY: 0, IRQ: 0, LEV: 0, NOR: 0})
    let [model,setModel] = useState(0);
    return (

          <StylesProvider jss={jss}>
            {/* alignItems="stretch" */}
        <Container fixed>
        <Grid container direction="column" style={{flexWrap:"nowrap"}} >

            <Grid Item>
                <Welcome/>
            </Grid>
            <Grid Item>
                <Paragraphs/>
            </Grid>
            <Grid item>
                <ModelsTabs setModel={setModel} />
            </Grid>
            
            <Grid item style={{margin: "auto", marginTop: "0.9rem"}}>
                <GlobePlot preds={preds}/>
            </Grid>
            <Grid item>
                <ControlPanel setPreds={setPreds} model={model} />
            </Grid>


        </Grid>
        </Container>
        </StylesProvider>

    )
}
