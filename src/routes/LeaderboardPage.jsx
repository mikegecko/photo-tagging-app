import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";

export default function LeaderboardPage(props) {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTime = (userObj) => {

    }
    useEffect(() => {
        setLoading(true);
        async function getUsersData () {
            const docsSnap = await getDocs(collection(props.db ,'users'));
            docsSnap.forEach((doc) => {
                let data = doc.data();
                setUsersData([...usersData,data]);
            })
        }
        getUsersData();
        console.log(usersData);
        setLoading(false);
    }, [])

    return(
        <div className="overlay">
            <Box>
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
                            {loading ? <div>...loading</div> : <></>
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