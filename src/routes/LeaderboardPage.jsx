import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

export default function LeaderboardPage(props) {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(false);

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
    return(
        <div className="overlay scroll">
            <Box sx={{overflow:'auto'}}>
                <h3>Leaderboard</h3>
                <Divider />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? <div>...loading</div> : usersData.map((u,index) => {
                                if(!u.time){
                                    return;
                                }
                                else{
                                    return(
                                        <TableRow key={index} >
                                        <TableCell>{u.name}</TableCell>
                                        <TableCell>{u.time}</TableCell>
                                        </TableRow>
                                    )
                                }
                            })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box>
                    <div>Name: {props.user.name}</div>
                    <div>Time: {props.time}</div>
                </Box>
            </Box>
        </div>
    )
}