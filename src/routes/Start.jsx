import { Button, Divider, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function Start() {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/lvl1', {replace: true}), [navigate]);
    return(
        <div className="overlay">
            <Box sx={{width: "300px"}}>
                <p>Tagging App</p> 
                <Divider variant="middle"/>
                <TextField variant="outlined" label="Name" sx={{margin:"1rem"}}/>
                <Divider variant="middle"/>
                <Button onClick={handleOnClick} variant="contained" sx={{margin:"1rem"}}>Start Game</Button>
            </Box>
        </div>
    )
}