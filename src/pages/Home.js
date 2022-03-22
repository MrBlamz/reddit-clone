import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingPostCard from '../components/LoadingPostCard';
import PostCard from '../components/PostCard';
import { savePosts, selectPosts } from '../store/data';
import { fetchPosts } from '../utils/firebase/firestore';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector(selectPosts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPostsFromDB = async () => {
      setIsLoading(true);
      const data = await fetchPosts();
      dispatch(savePosts(data));
      setIsLoading(false);
    };

    getPostsFromDB();
  }, [dispatch]);

  const handleClick = (communityName, postId) => (event) => {
    event.stopPropagation();
    navigate(`/r/${communityName}/${postId}`);
  };

  const loadingCards = [...Array(10)].map((v, i) => (
    <LoadingPostCard key={i} />
  ));

  const postCards = posts.map((post, i) => (
    <PostCard
      key={post.id}
      isFirst={i === 0}
      communityName={post.communityName}
      title={post.title}
      author={post.author}
      commentsNumber={post.commentsNumber}
      upVotes={post.upVotes}
      downVotes={post.downVotes}
      timestamp={post.timestamp}
      isLast={i === posts.length - 1}
      onClick={handleClick(post.communityName, post.id)}
    />
  ));

  return (
    <>
      <Container maxW='full' padding={{ base: 2, md: '20px 24px' }}>
        {isLoading ? loadingCards : postCards}
      </Container>
    </>
  );
};

export default Home;
