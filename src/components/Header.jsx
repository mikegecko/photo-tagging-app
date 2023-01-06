import { Divider, Paper } from "@mui/material"

export default function Header(props){
    return(
        <Paper className="header" elevation={1}>
            <div>
                {props.user.name}
            </div>
            <Divider orientation="vertical" variant='middle' flexItem />
            <div>
                <b>Seek and Ye Shall Find</b>
            </div>
            <Divider orientation="vertical" variant='middle' flexItem />
            <div>Score: {props.user.score}</div>
        </Paper>
    )
}