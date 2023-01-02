import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Start from './routes/Start';
import PhotoPage from './routes/PhotoPage'

/* 
---------- TODO ----------
1. Setup Firebase Database
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
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar />
      <Header />
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/lvl1' element={<PhotoPage />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
