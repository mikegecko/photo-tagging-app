import { Drawer } from "@mui/material";


export default function Sidebar(props){
    return(
        <Drawer anchor="left" variant="permanent" elevation={1}>
            <div className="drawer">
                <h3>Items</h3>

            </div>
        </Drawer>
    )
}