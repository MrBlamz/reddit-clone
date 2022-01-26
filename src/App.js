import { Route, Routes } from 'react-router-dom';
import useAuthListener from './hooks/useAuthListener';
import UserContext from './contexts/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const { user } = useAuthListener();

  return (
    <div className='App'>
      <UserContext.Provider value={user}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
