import { Fade } from '@chakra-ui/react';
import Container from '../components/containers/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPostCard from '../components/LoadingPostCard';
import PostCard from '../components/PostCard';
import { fetchPosts } from '../utils/firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);

      const data = await fetchPosts();

      setPosts(data);
      setIsLoading(false);
    };

    getPosts();
  }, []);

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
      id={post.id}
      isFirst={i === 0}
      communityName={post.communityName}
      title={post.title}
      author={post.author}
      commentsNumber={post.commentsNumber}
      votes={post.votes}
      timestamp={post.timestamp}
      isLast={i === posts.length - 1}
      onClick={handleClick(post.communityName, post.id)}
    />
  ));

  return (
    <>
      <Container>
        {isLoading ? loadingCards : <Fade in={!isLoading}>{postCards}</Fade>}
      </Container>
    </>
  );
};

export default Home;
