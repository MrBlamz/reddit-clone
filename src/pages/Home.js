import { Box, Fade, Flex, useMediaQuery } from '@chakra-ui/react';
import Container from '../components/containers/Container';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingPostCard from '../components/LoadingPostCard';
import PostCard from '../components/PostCard';
import {
  fetchPostsByPostTime,
  fetchPostsByVoteNumber,
} from '../utils/firebase/firestore';
import { HomeBanner } from '../components/HomeBanner';
import { PostsSorter } from '../components/PostsSorter';
import { SORT_POSTS_OPTIONS } from '../constants';
import { useUser } from '../hooks/useUser';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn, followingCommunities } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedSortingMode, setSelectedSortingMode] = useState(
    SORT_POSTS_OPTIONS[0]
  );
  const [isMobile] = useMediaQuery('(max-width: 62rem)');

  const fetchPostsFunctions = useMemo(
    () => ({
      [SORT_POSTS_OPTIONS[0]]: () =>
        isLoggedIn
          ? fetchPostsByVoteNumber(followingCommunities)
          : fetchPostsByVoteNumber(),
      [SORT_POSTS_OPTIONS[1]]: () =>
        isLoggedIn
          ? fetchPostsByPostTime('asc', followingCommunities)
          : fetchPostsByPostTime('asc'),
      [SORT_POSTS_OPTIONS[2]]: () =>
        isLoggedIn
          ? fetchPostsByPostTime('desc', followingCommunities)
          : fetchPostsByPostTime('desc'),
    }),
    [isLoggedIn, followingCommunities]
  );

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
        <Flex direction='column' gap={2}>
          <PostsSorter
            selectedSortingMode={selectedSortingMode}
            setSelectedSortingMode={setSelectedSortingMode}
          />

          {isLoading && loadingCards}

          <Fade in={!isLoading}>{postCards}</Fade>
        </Flex>
      </Box>

      <Box w='20%'>
        <HomeBanner />
      </Box>
    </>
  );

  const MobileLayout = () => (
    <>
      <HomeBanner />
      <PostsSorter
        selectedSortingMode={selectedSortingMode}
        setSelectedSortingMode={setSelectedSortingMode}
      />

      {isLoading && loadingCards}

      <Fade in={!isLoading}>{postCards}</Fade>
    </>
  );

  useEffect(() => {
    const fetchPostsBySelectedMode = async () => {
      setIsLoading(true);

      try {
        const fetchPosts = fetchPostsFunctions[selectedSortingMode];
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchPostsBySelectedMode();
  }, [fetchPostsFunctions, selectedSortingMode]);

  return (
    <Container>
      <Flex direction={isMobile ? 'column' : 'row'} gap={3}>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </Flex>
    </Container>
  );
};

export default Home;
