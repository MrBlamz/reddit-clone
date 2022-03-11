import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listenForAuthChanges } from './store/auth';

function App() {
  const dispatch = useDispatch();

  // Listen for changes in user authentication status
  useEffect(() => {
    const listener = dispatch(listenForAuthChanges());
    return () => listener();
  }, [dispatch]);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
