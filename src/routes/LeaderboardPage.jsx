import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export default function LeaderboardPage(props) {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(false);
    let c = 10;
    useEffect(() => {
        setUsersData([]);
        setLoading(true);
        async function getUsersData () {
            const docsSnap = await getDocs(collection(props.db ,'users'));
            docsSnap.forEach((doc) => {
               
                let data = doc.data();
                let newUser = usersData;
                newUser.push(data)
                setUsersData(newUser);
            });
            setLoading(false);
        }
        getUsersData();

    }, [])

    const sortUsers = () => {
        let sorted = usersData.sort(
            (u1,u2) => (u1.time > u2.time) ? 1 : (u1.time < u2.time) ? -1 : 0);
        return(sorted);
    }
    return(
        <div className="overlay scroll">
            <Box sx={{overflow:'auto', width: 200, padding: '1rem'}}>
                <h3>Leaderboard</h3>
                <TableContainer>
                    <Table sx={{width: 200, bgcolor:'white', borderRadius: '1rem 1rem 0 0'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? <TableRow><TableCell>...loading</TableCell></TableRow> : sortUsers().map((u,index) => {
                                
                                if(index < c ){
                                    if(!u.time){
                                        c++;
                                        return;
                                    }
                                    else{
                                        return(
                                            <TableRow key={index} >
                                            <TableCell>{u.name}</TableCell>
                                            <TableCell align="right">{u.time}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                }
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{bgcolor: 'white', borderRadius: '0 0 1rem 1rem' , fontSize: '14px', display:'flex', flexDirection: 'column', gap: '.5rem', padding: '.5rem'}}>
                    <div>Name:{props.user.name}</div>
                    <div>Time: {props.time}</div>
                </Box>
            </Box>
        </div>
    )
}