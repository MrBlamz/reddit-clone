import { Route, Routes } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenForAuthChanges } from './store/auth';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Listen for changes in user authentication status
  useEffect(() => {
    const listener = dispatch(listenForAuthChanges());
    return () => listener();
  }, [dispatch]);

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
