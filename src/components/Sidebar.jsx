import { Drawer } from "@mui/material";


export default function Sidebar(props){
    
    return(
        <Drawer anchor="left" variant="permanent" elevation={1}>
            <div className="drawer">
                <h3>Items</h3>
                <ul>
                {props.loading ? <div>...loading</div> : props.items.items.map((item, index) => {
                return(<li key={index}>{item.name}</li>)
            })}
                </ul>
                
            </div>
        </Drawer>
    )
}