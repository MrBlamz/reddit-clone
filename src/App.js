import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import AuthenticationModal from './components/AuthenticationModal';
import CommunityLayout from './layouts/CommunityLayout';
import Home from './pages/Home';
import Community from './pages/Community';
import Post from './pages/Post';
import CreateCommunityModal from './components/CreateCommunityModal';
import SubmitPost from './pages/SubmitPost';
import { NotFound } from './pages/NotFound';

function App() {
  const { fetchUserFromLocalStorage, listenForAuthChanges } = useAuth();

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
        <Route path='submit' element={<SubmitPost />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <AuthenticationModal />
      <CreateCommunityModal />
    </div>
  );
}

export default App;
