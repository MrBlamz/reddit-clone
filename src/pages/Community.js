import { Box, Fade, Flex, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  fetchCommunityPostsByPostTime,
  fetchCommunityPostsByVoteNumber,
} from '../utils/firebase/firestore';
import { isEmptyArray } from 'formik';
import Container from '../components/containers/Container';
import LoadingPostCard from '../components/LoadingPostCard';
import PostCard from '../components/PostCard';
import NoPosts from '../components/NoPosts';
import { AboutCommunity } from '../components/AboutCommunity';
import { SORT_POSTS_OPTIONS } from '../constants';
import { PostsSorter } from '../components/PostsSorter';

const Community = () => {
  const navigate = useNavigate();
  const {
    id: communityId,
    timestamp,
    description,
    members,
  } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedSortingMode, setSelectedSortingMode] = useState(
    SORT_POSTS_OPTIONS[0]
  );
  const hasNoPosts = isEmptyArray(posts);
  const [isMobile] = useMediaQuery('(max-width: 62rem)');

  const handlePostClick = (postId) => (event) => {
    navigate(`./${postId}`);
  };

  const loadingPostCards = [...Array(10)].map((v, i) => (
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
      onClick={handlePostClick(post.id)}
    />
  ));

  const fetchCommunityPostsFunctions = useMemo(
    () => ({
      [SORT_POSTS_OPTIONS[0]]: () =>
        fetchCommunityPostsByVoteNumber(communityId),
      [SORT_POSTS_OPTIONS[1]]: () =>
        fetchCommunityPostsByPostTime(communityId, 'asc'),
      [SORT_POSTS_OPTIONS[2]]: () =>
        fetchCommunityPostsByPostTime(communityId, 'desc'),
    }),
    [communityId]
  );

  const DesktopLayout = () => (
    <>
      <Box w={hasNoPosts ? '100%' : '80%'}>
        <Flex direction='column' gap={2}>
          {!hasNoPosts && (
            <PostsSorter
              selectedSortingMode={selectedSortingMode}
              setSelectedSortingMode={setSelectedSortingMode}
            />
          )}

          {isLoading && loadingPostCards}

          {!isLoading && hasNoPosts ? (
            <NoPosts />
          ) : (
            <Fade in={true}>{postCards}</Fade>
          )}
        </Flex>
      </Box>

      <Box w={hasNoPosts ? '0' : '20%'}>
        {!hasNoPosts && (
          <AboutCommunity
            timestamp={timestamp}
            description={description}
            memberCount={members}
          />
        )}
      </Box>
    </>
  );

  const MobileLayout = () => (
    <>
      {!hasNoPosts && (
        <>
          <AboutCommunity
            timestamp={timestamp}
            description={description}
            memberCount={members}
          />
          <PostsSorter
            selectedSortingMode={selectedSortingMode}
            setSelectedSortingMode={setSelectedSortingMode}
          />
        </>
      )}

      {isLoading && loadingPostCards}

      {!isLoading && hasNoPosts ? (
        <NoPosts />
      ) : (
        <Fade in={true}>{postCards}</Fade>
      )}
    </>
  );

  useEffect(() => {
    const fetchPostsBySelectedMode = async () => {
      setIsLoading(true);

      try {
        const fetchPosts = fetchCommunityPostsFunctions[selectedSortingMode];
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchPostsBySelectedMode();
  }, [selectedSortingMode, fetchCommunityPostsFunctions]);

  return (
    <Container>
      <Flex direction={isMobile ? 'column' : 'row'} gap={3}>
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </Flex>
    </Container>
  );
};

export default Community;
