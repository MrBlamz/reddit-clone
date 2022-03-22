import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { useEffect } from 'react';
import AuthenticationModal from './components/AuthenticationModal';
import Community from './pages/Community';
import CommunityLayout from './layouts/CommunityLayout';
import useUser from './hooks/useUser';

function App() {
  const { fetchUserFromLocalStorage, listenForAuthChanges } = useUser();

  useEffect(() => {
    fetchUserFromLocalStorage();
  }, [fetchUserFromLocalStorage]);

  useEffect(() => {
    const listener = listenForAuthChanges();
    return () => listener();
  }, [listenForAuthChanges]);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='r/:communityName' element={<CommunityLayout />}>
          <Route index element={<Community />} />
        </Route>
      </Routes>
      <AuthenticationModal />
    </div>
  );
}

export default App;
