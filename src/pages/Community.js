import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { fetchCommunityPosts } from '../utils/firebase/firestore';
import { isEmptyArray } from 'formik';
import Container from '../components/containers/Container';
import LoadingPostCard from '../components/LoadingPostCard';
import PostCard from '../components/PostCard';
import NoPosts from '../components/NoPosts';
import { Fade, GridItem, SimpleGrid } from '@chakra-ui/react';
import { AboutCommunity } from '../components/AboutCommunity';

const Community = () => {
  const navigate = useNavigate();
  const { id: communityId, timestamp, description } = useOutletContext();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const hasNoPosts = isEmptyArray(posts);

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

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const data = await fetchCommunityPosts(communityId);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, [communityId]);

  return (
    <Container>
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={4}>
        <GridItem
          colSpan={{ base: 1, md: hasNoPosts ? 5 : 4 }}
          order={{ base: 2, md: 1 }}
        >
          {isLoading ? (
            loadingPostCards
          ) : hasNoPosts ? (
            <NoPosts />
          ) : (
            <Fade in={!isLoading}>{postCards}</Fade>
          )}
        </GridItem>

        {!hasNoPosts && (
          <GridItem colSpan={1} order={{ base: 1, md: 2 }}>
            <AboutCommunity timestamp={timestamp} description={description} />
          </GridItem>
        )}
      </SimpleGrid>
    </Container>
  );
};

export default Community;
