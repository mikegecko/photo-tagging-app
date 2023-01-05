import { Drawer, List, ListItem, ListItemText } from "@mui/material";


export default function Sidebar(props){
    
    return(
        <Drawer anchor="left" variant="permanent" elevation={1}>
            <div className="drawer">
                <h3>Items</h3>
                <List>
                {props.loading ? <div>...loading</div> : props.items.items.map((item, index) => {
                return(<ListItem disablePadding key={index}><ListItemText sx={{textAlign: 'center'}} primary={item.name} /></ListItem>)
            })}
            </List>
                
                
            </div>
        </Drawer>
    )
}