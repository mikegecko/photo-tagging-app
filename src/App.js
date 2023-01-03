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
  - Authentication / Session token ?
  - Image storage
2. Finish designing UI
  - Sidebar design finalization
    * Sidebar Items get crossed out when selection is a match
  - Start Page design
    * Add background image
  - Leaderboard Page creation
3. Image search
  - Find images to use for searching
  - Design Tagging system
    * Animate click that extends a line from click point
      then opens a selection dialogue
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
