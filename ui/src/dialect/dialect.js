import $ from 'jquery'
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
    let [text,setText] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchApi = (n) =>{
        setModel(n);
        if(text.length===0) return

        const bertApi = "https://us-central1-dialect-project-328413.cloudfunctions.net/dialect-prediction-BERT"
        const bayesApi = "https://us-central1-dialect-project-328413.cloudfunctions.net/dialect-prediction-naive-bayes"

        const modelsArr = [bertApi,bayesApi]

        $.ajax(
            {
                type: "POST",
                url: modelsArr[n],
                data: JSON.stringify({"text" : text}),
                dataType:'json',
                success: function (response) {
                    setSuccess(true);
                    setLoading(false);
                    setPreds({GLF: response[1], EGY: response[0], IRQ: response[2], LEV: response[3], NOR: response[4]})
                    },
                error: function (err) {
                    console.log(err);
                },
                });
        }

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
                <ModelsTabs setModel={setModel} fetchApi={fetchApi} />
            </Grid>
            
            <Grid item style={{margin: "auto", marginTop: "0.9rem"}}>
                <GlobePlot preds={preds}/>
            </Grid>
            <Grid item>
                <ControlPanel model={model} text={text} success={success} loading={loading} fetchApi={fetchApi} setText={setText} setSuccess={setSuccess} setLoading={setLoading} />
            </Grid>


        </Grid>
        </Container>
        </StylesProvider>

    )
}
