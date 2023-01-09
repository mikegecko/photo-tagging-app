import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Start from "./routes/Start";
import PhotoPage from "./routes/PhotoPage";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
import { firebaseConfig } from "./config";
import { collection, addDoc, getDoc, setDoc, doc } from "firebase/firestore";
import { Box } from "@mui/system";
import LeaderboardPage from "./routes/LeaderboardPage";
/* 
---------- TODO ----------
1. Setup Firebase Database
  - Store Users name in database
    * Give session token or move name submission to level completion
    ✅ [Best Option] Or store name locally and store it until level completion
    ✅  Copy Items DB to user DB for tracking
  - Figure out structure of user data
  ✅ Figure out structure of item data
    ✅ duplicate item data into user data ?
  - Authentication / Session token ?
  ✅ Image storage
2. Finish designing UI
  - Sidebar design finalization
    ✅ Sidebar Items get crossed out when selection is a match
    * Figure out how to display several items with same name
  - Start Page design
    * Add background image
  - Image page design
    ✅ Pannable, zoomable image
    ✅ Image controls for resetting / centering image
    * Replace debug bounding box ?
  - Leaderboard Page creation
    - Score function calculates time from finish - start
      * do this for every user and store it as a number
      * query the lowest 10 scores
      * place player at bottom if his score is lower than the lowest 10 - maybe include position
  - Implement either score or timer
  ✅ Add info modal or something
    ✅ Displays info about how to play the game
    ✅ 'Double click to tag item!'
3. Image search
  ✅ Find images to use for searching
  ✅ Design Tagging system
    ✅ Animate click that extends a line from click point
      then opens a selection dialogue
  ✅ Create Mouse position function
    ✅ Get mouse click position and subtract
      it from the transform style of the image
    ✅ Figure out how to take into account zoom
  ✅ Populate tag menu with items database
    ✅ Make temp local DB
    ✅ Make Firebase DB
4. Process Images
  - Crop images
  - Repair page split (AI)
  - Enhance image quality (AI)

---------- BUGS ----------
  ✅ Zooming breaks double click menu and svg
  ❌ Cannot go back to start page using back button
  ❌ Refreshing page causes loss of player name
  ✅ On menu close -> hide the dash svg
  ✅ Refreshing page breaks items state
  - Double clicking near edge of screen breaks svg
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const levelsRef = collection(db, "levels");
const usersRef = collection(db, "users");

function App() {
  const [user, setUser] = useState({});
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);
  const [docRefID, setDocRefID] = useState(null);

  const setUserFunc = (name) => {
    const newUser = { ...user };
    if (name !== undefined) {
      newUser.name = name;
    }
    setUser(newUser);
  };
  const validateSelection = (x,y,id) => {
    // Call and check against DB data to prevent cheating
    const searchItems = [];
    items.items.forEach((item, index) => {
      if(item.name === id){
        item.index = index;
        searchItems.push(item)
      }
      else{
        return;
      }
    });
    searchItems.forEach(item => {
      if(item.p1[0] < x && item.p1[1] < y){
        if(item.p2[0] > x && item.p2[1] > y){
          console.log('Found Item!');
          const newItems = {...items};
          newItems.items[item.index].isFound = true;
          setItems({...newItems});
        }
      }
    });
    checkWin();
  };
  const debugBoundingBox = (x0, y0, x1, y1, key) => {
    const width = x1 - x0;
    const height = y1 - y0;
    return (
      <Box
        key={key}
        sx={{
          position: "absolute",
          top: y0,
          left: x0,
          width: width,
          height: height,
          border: '1px solid red',
        }}
      ></Box>
    );
  };
  const checkWin = () => {
    let count = 0;
    items.items.forEach(item => {
      if(item.isFound){
        return;
      }
      else{
        count++;
      }
    });
    if(count > 0){
      return false;
    }
    else{
      const newItems = {...items};
      newItems.isComplete = true;
      setItems({...newItems});
      return true;
    }
    
  }
  useEffect(() => {
    setLoading(true);
    //Create user in database
    async function setUserDB() {
      if (user.name !== undefined) {
        const docRef = await addDoc(usersRef, {
          name: user.name,
          startTime: serverTimestamp(),
          level0:items
        });
        setDocRefID(docRef.id);
        setLoading(false);
      } else {
        console.error('Error: Username is undefined')
        return;
      }
    }
    setUserDB();
  }, [user]);
  useEffect(() => {
    //Update server? 
    async function updateItemsDB() {
      if(docRefID !== null){
        await updateDoc(doc(db,'users',docRefID), {
          level0:items
        });
        if(items.isComplete){
          await updateDoc(doc(db,'users',docRefID),{
            endTime: serverTimestamp()
          })
        }
        else{
          return;
        }
      }
      else{
        console.error('Error: No userID provided for DB');
        return;
      }
    }
    updateItemsDB();
    console.log(items);
  },[items])
  useEffect(() => {
    //Get items from database
    async function getItemsFromDB() {
      const docSnap = await getDoc(doc(db, "levels", "level0"));
      setLoading(false);
      if (docSnap.exists()) {
        setItems(docSnap.data());
        //console.log(docSnap.data());
      } else {
        console.error("Could not retrieve items from database");
      }
    }
    getItemsFromDB();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar loading={loading} items={items}/>
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Start setUserFunc={setUserFunc} />} />
          <Route path="/lvl1" element={<PhotoPage loading={loading} debugBoundingBox={debugBoundingBox} validateSelection={validateSelection} items={items} />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
