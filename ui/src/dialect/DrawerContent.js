import {Divider,Box,List,ListItem,ListItemText,makeStyles,SvgIcon,Button} from '@material-ui/core'
import CreditItem from './CreditItem';
const useStyle = makeStyles({
    list:{
        width:310,
    }

})
// just Replace none with your link if you want to add your account
export default function DrawerContent(){
    const classes = useStyle();
    return (
              <div className={classes.list}>
                  <Box textAlign="center" p={2}>
                      <h5>Credits</h5>
                  </Box>
                  <Divider/>
                  <List>
                      <CreditItem name="Mohand Al-Rasheed" twt="https://twitter.com/MohndAlrasheed" gh="https://github.com/Hawzen" li="https://www.linkedin.com/in/mohand-alrasheed/"/>
                      <CreditItem name="Abdulrahman Al-Shawi" twt="none" gh="https://github.com/d7miiZ" li="https://www.linkedin.com/in/abdulrahman-alshawi-26b68b1a6/"/>
                      <CreditItem name="Musaad Al-Qubayl" twt="https://twitter.com/Musaad0A" gh="https://github.com/musaad0" li="https://www.linkedin.com/in/musaadalqubayl/"/>
                      <CreditItem name="Khaled Al-Bader" twt="none" gh="https://github.com/khalid-albadr" li="https://www.linkedin.com/in/khalid-albadr9"/>
                      <CreditItem name="Abdullah Al-Suwailem" twt="https://twitter.com/abdullah_ssk10" gh="https://github.com/Abdullah-Sw" li="https://www.linkedin.com/in/abdullah-alsuwailem-4251741b4/"/>
                  </List>
              </div>
    )

} 


