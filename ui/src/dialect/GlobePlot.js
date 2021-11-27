import { React,lazy, Suspense } from "react";
import { useMediaQuery, useTheme,} from "@material-ui/core";

const Plot = lazy(() => import("react-plotly.js"));

export default function GlobePlot(props){
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

