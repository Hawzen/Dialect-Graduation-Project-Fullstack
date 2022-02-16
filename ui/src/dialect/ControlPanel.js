import { React,useEffect, useState} from "react"; 
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button,Grid, TextField,  ThemeProvider, createMuiTheme } from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import TabsTestCases from './TabsTestCases';
const rtlTheme = createMuiTheme({direction: 'rtl', });
export {rtlTheme}


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonSuccess: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    // fabProgress: {
    //   color: green[500],
    //   position: 'absolute',
    //   top: -6,
    //   left: -6,
    //   zIndex: 1,
    // },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  }));

export default function ControlPanel({text,model,success,loading,setText,fetchApi,setSuccess,setLoading, modelTabs}){

    //style
    const classes = useStyles()
    const [helperText,setHelperText] = useState("Enter text in Arabic");
    const [inputError,setInputError] = useState(false);
    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
      });

    const handleInputChange = (text)=>{
        setText(text)
    }
    const checkInputLength = ()=>{

      if(inputError === true && text.length <=100){
        setHelperText("Enter text in Arabic")
        setInputError(false);
        return true;
      }

      if(text.length===0) return false;
      if(text.length >= 100){
        setHelperText("Text must be under 100 characters")
        setInputError(true);
        return false;
      }

      return true;
    }

    const handleButtonClick = () => {
      if(!checkInputLength()){
        return;
      }
          if (!loading) {
            setSuccess(false);
            setLoading(true);
            fetchApi(model);
            
          }
        };

    const handleClickEvent = (e)=>{
           if(e.code === "Enter" || e.code === "NumpadEnter"){
             handleButtonClick();
             e.preventDefault();
    }
  }
    useEffect(() => {
      window.addEventListener("keydown",handleClickEvent);
      return () => { 
        window.removeEventListener('keydown', handleClickEvent);
      };
  }, [handleClickEvent]);

    useEffect(() => {
        const timeoutId = setTimeout(checkInputLength, 1000);
        return () => clearTimeout(timeoutId);
      }, [text]);
      
    return (
         <Grid container direction="column" justify="flex-end" alignItems="stretch" >

            <Grid item >
                <ThemeProvider theme={rtlTheme}>
                <div dir="rtl">
                <TextField
                    onChange={(e)=>{setText(e.target.value)}}
                    value={text}
                    label="Predict Region"
                    style={{width: "auto", display: "block"}}
                    placeholder="اهلا وسهلا"
                    helperText={helperText}
                    fullWidth
                    margin="normal"
                    error={inputError}
                />
                </div>
                </ThemeProvider>
            </Grid>

            {modelTabs}
            <Grid item style={{marginBottom:'1rem',display:'flex',justifyContent:"space-between"}}  >
                <Container className={classes.root} style={{justifyContent:"center"}}>
                <div className={classes.wrapper}>
                   <Button onClick={handleButtonClick} variant="contained" color="primary" disabled={loading}  className={buttonClassname}>
                     Classify
                    </Button>
                    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </div>
                </Container>
            </Grid>

            <Grid item>
                <TabsTestCases handleInputChange={handleInputChange} />
            </Grid>

        </Grid>
    )
}