import $ from 'jquery'
import { 
    Grid, 
    StylesProvider, 
    jssPreset, 
    Container,
    Typography
 } from "@material-ui/core";
import { create } from 'jss';
import rtl from 'jss-rtl';
import { useEffect, useState } from "react";
import Welcome from "./Welcome";
import GlobePlot from "./GlobePlot";
import ControlPanel from "./ControlPanel";
import Paragraphs from "./Paragraphs";
import ModelsTabs from "./ModelsTabs";
import Credits from "./Credits"


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


export default function Dialect(){
    let [preds, setPreds] = useState({GLF: 0, EGY: 0, IRQ: 0, LEV: 0, NOR: 0})
    let [model,setModel] = useState(1);
    let [text,setText] = useState("");
    let [retryCount, setRetryCount] = useState(0);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const maxRetryCount = 10;
    
    const bertApi = "https://us-central1-dialect-project-328413.cloudfunctions.net/dialect-prediction-BERT-V2"
    const bayesApi = "https://us-central1-dialect-project-328413.cloudfunctions.net/dialect-prediction-naive-bayes"

    const fetchApi = (n) =>{
        setModel(n);
        if(text.length===0) return

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
                    // In backend: `id2label = {0 : "EGY", 1 : "GLF", 2 : "IRQ", 3 : "LEV", 4 : "NOR"}`
                    setPreds({GLF: response[1], EGY: response[0], IRQ: response[2], LEV: response[3], NOR: response[4]})
                    },
                error: function (err) {
                    console.log(err);
                    if(retryCount < maxRetryCount){
                        setRetryCount(retryCount + 1);
                        return fetchApi(n);
                    }
                    else
                        window.location.reload();
                },
            });
    }

    // useEffect(() => { // Wake up BERT
    //     let n = 0;
    //     setModel(n);

    //     const modelsArr = [bertApi]
    //     $.ajax(
    //         {
    //             type: "POST",
    //             url: modelsArr[n],
    //             data: JSON.stringify({"text" : "..You're still half-asleep, aren't you?"}),
    //             dataType:'json',
    //             error: function (err) {
    //                 console.log(err);
    //             },
    //         });
    // }, [])

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
            
            <Typography variant="h4" align="center" gutterBottom color="textPrimary" style={{marginTop: '60px'}}>
                LIVE DEMO
            </Typography> 
            
            <Grid item style={{margin: "auto", marginTop: "0.9rem"}}>
                <GlobePlot preds={preds}/>
            </Grid>
            
            <Grid item>
                <ControlPanel model={model} 
                text={text} 
                success={success} 
                loading={loading} 
                fetchApi={fetchApi} 
                setText={setText} 
                setSuccess={setSuccess} 
                setLoading={setLoading} 
                modelTabs={<ModelsTabs setModel={setModel} fetchApi={fetchApi} />}
            />
            </Grid>

            <Grid item>
                <Credits/>
            </Grid>

            <div style={{padding: "2em"}}/> {/* Footer */}


        </Grid>
        </Container>
        </StylesProvider>

    )
}

