import React from 'react'
import TestCase from './TestCase'

import { 
    ThemeProvider, 

 } from "@material-ui/core";
import { rtlTheme } from './dialect';

// Change test cases
export default function TestCasesList({
    testCases = ['السلام عليكم','وعليكم السلام','شحالكم','ازيك'],handleInputChange
}) {
    function onElementClick(text){
        handleInputChange(text)
    }
    

    return (
                <ThemeProvider theme={rtlTheme}> 
                 <div dir="rtl">
            <List  style={{color:"black"}}>
            {testCases.map((testCase,i)=>(
                <TestCase text={testCase} onElementClick={onElementClick}/>
            )
            )}

            </List>
            </div>
            </ThemeProvider> 
    )
}
