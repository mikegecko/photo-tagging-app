import { Divider, Drawer, Icon, List, ListItem, ListItemText, Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export default function Sidebar(props){
    
    return(
        <Drawer anchor="left" variant="permanent" elevation={1}>
            <div className="drawer">
                
                <div className="info">
                <h3>Items </h3>
                <Tooltip title='Double Click on the image to tag an item'>
                    <InfoIcon fontSize="small" />
                </Tooltip>
                </div>
                <List sx={{backgroundColor: 'rgb(30,30,30)', paddingTop: 0}}>
                <Divider light={true} sx={{bgcolor: '#424242'}} />
                {props.loading ? <div>...loading</div> : props.items.items.map((item, index) => {
                return(<ListItem disabled={item.isFound} disablePadding key={index}><ListItemText sx={{textAlign: 'center'}} primary={item.name} /></ListItem>)
            })}
            </List>
            </div>
        </Drawer>
    )
}