import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Start from './routes/Start';
import PhotoPage from './routes/PhotoPage'
import { useState } from 'react';

/* 
---------- TODO ----------
1. Setup Firebase Database
  - Store Users name in database
    * Give session token or move name submission to level completion
    * [Best Option] Or store name locally and store it until level completion
  - Figure out structure of user data
  - Figure out structure of item data
  - Authentication / Session token ?
  - Image storage
2. Finish designing UI
  - Sidebar design finalization
    * Sidebar Items get crossed out when selection is a match
  - Start Page design
    * Add background image
  - Image page design
    ✅ Pannable, zoomable image
    * Image controls for resetting / centering image
  - Leaderboard Page creation
  - Implement either score or timer
  - Add info modal or something
    * Displays info about how to play the game
    * 'Double click to tag item!'
3. Image search
  - Find images to use for searching
  ✅ Design Tagging system
    ✅ Animate click that extends a line from click point
      then opens a selection dialogue
  ✅ Create Mouse position function
    ✅ Get mouse click position and subtract
      it from the transform style of the image
    ✅ Figure out how to take into account zoom
  - Populate tag menu with items database
    * Make temp local DB
    * Make Firebase DB
4. Process Images
  - Crop images
  - Repair page split (AI)
  - Enhance image quality (AI)

---------- BUGS ----------
  - Zooming breaks double click menu and svg
  ❌ Cannot go back to start page using back button
  ❌ Refreshing page causes loss of player name
  ✅ On menu close -> hide the dash svg
*/

function App() {
  const [user,setUser] = useState({});

  const setUserName = (name) => {
    setUser({...user,name:name});
  }


  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Start setUserName={setUserName} />} />
        <Route path='/lvl1' element={<PhotoPage />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
