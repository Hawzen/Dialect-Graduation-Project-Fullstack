import React from 'react'
import ListItemButton from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItem"
import {ListItem} from '@material-ui/core'


export default function TestCase({text,onElementClick}) {
    const handleClick = () =>{
        onElementClick(text);
    }
    return (

          <ListItem button onClick={handleClick}>
            <ListItemButton>
                <ListItemText style={{fontSize:"1.4rem", color:"#616161"}}>
                    {text}
                </ListItemText>
            </ListItemButton>
          </ListItem>
    )
}



