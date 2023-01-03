import { Button, Divider, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

export default function Start(props) {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/lvl1', {replace: true}), [navigate]);
    const handleTextChange = (e) => {
        setName(e.target.value);
    }
    return(
        <div className="overlay">
            <Box sx={{width: "300px"}}>
                <p>Tagging App</p> 
                <Divider variant="middle"/>
                <TextField onChange={handleTextChange} variant="outlined" label="Name" sx={{margin:"1rem"}}/>
                <Divider variant="middle"/>
                <Button onClick={(e) => {handleOnClick(); props.setUserName(name)}} variant="contained" sx={{margin:"1rem"}}>Start Game</Button>
            </Box>
        </div>
    )
}