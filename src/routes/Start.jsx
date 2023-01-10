import { Button, Divider, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

export default function Start(props) {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/lvl1', {replace: true}), [navigate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.setUserFunc(name);
        handleOnClick();
    }
    return(
        <div className="overlay">
            <Box sx={{width: "300px"}}>
                <p>Seek and Ye Shall Find</p> 
                <form onSubmit={handleSubmit}>
                <Divider variant="middle"/>
                <TextField required={true} value={name} style={{backgroundColor: 'white'}} type={'text'} id={'name'} onChange={e => setName(e.target.value)} variant="outlined" label="Name" sx={{margin:"1rem"}}/>
                <Divider variant="middle"/>
                <Button type='submit' variant="contained" sx={{margin:"1rem"}}>Start Game</Button>
                </form>
            </Box>
        </div>
    )
}