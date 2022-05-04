import { Box, Fade, Flex, useMediaQuery } from '@chakra-ui/react';
import Container from '../components/containers/Container';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPostCard from '../components/LoadingPostCard';
import PostCard from '../components/PostCard';
import { fetchPosts } from '../utils/firebase/firestore';
import { HomeBanner } from '../components/HomeBanner';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isMobile] = useMediaQuery('(max-width: 62rem)');

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
    <LoadingPostCard w='full' key={i} />
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

  const DesktopLayout = () => (
    <>
      <Box w='80%'>
        {isLoading && loadingCards}

        <Fade in={!isLoading}>{postCards}</Fade>
      </Box>

      <Box w='20%'>
        <HomeBanner />
      </Box>
    </>
  );

  const MobileLayout = () => <Box>Mobile</Box>;

  return (
    <Container>
      <Flex direction={isMobile ? 'column' : 'row'} gap={3}>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </Flex>
    </Container>
  );
};

export default Home;
