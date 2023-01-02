import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Start from './routes/Start';
import PhotoPage from './routes/PhotoPage'

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
