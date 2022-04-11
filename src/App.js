import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import useUser from './hooks/useUser';
import Navbar from './components/Navbar';
import AuthenticationModal from './components/AuthenticationModal';
import CommunityLayout from './layouts/CommunityLayout';
import Home from './pages/Home';
import Community from './pages/Community';
import Post from './pages/Post';
import CreateCommunityModal from './components/CreateCommunityModal';

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
          <Route path=':postId' element={<Post />} />
        </Route>
      </Routes>
      <AuthenticationModal />
      <CreateCommunityModal />
    </div>
  );
}

export default App;
