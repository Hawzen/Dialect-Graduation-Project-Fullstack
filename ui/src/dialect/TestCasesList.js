import React from 'react'
import TestCase from './TestCase'

import { 
    ThemeProvider, 
    List

 } from "@material-ui/core";
import { rtlTheme } from './ControlPanel';

// Change test cases
export default function TestCasesList({
    testCases,handleInputChange
}) {
    function onElementClick(text){
        handleInputChange(text)
    }
    

    return (
                <ThemeProvider theme={rtlTheme}> 
                 <div dir="rtl">
            <List  style={{color:"black",width:'100%',maxHeight:300,overflow:'auto'}} >
            {testCases.map((testCase,i)=>(
                <TestCase text={testCase} onElementClick={onElementClick}/>
            )
            )}

            </List>
            </div>
            </ThemeProvider> 
    )
}
