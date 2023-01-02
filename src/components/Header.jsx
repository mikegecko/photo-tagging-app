import { Divider, Paper } from "@mui/material"

export default function Header(props){
    return(
        <Paper className="header" elevation={1}>
            <div>
                PlayerName
            </div>
            <Divider orientation="vertical" variant='middle' flexItem />
            <div>
                ?/10
            </div>
            <Divider orientation="vertical" variant='middle' flexItem />
            <div>Score: 100</div>
        </Paper>
    )
}