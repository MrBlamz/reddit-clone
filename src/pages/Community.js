import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { fetchCommunityPosts } from '../utils/firebase/firestore';
import { isEmptyArray } from 'formik';
import Container from '../components/containers/Container';
import LoadingPostCard from '../components/LoadingPostCard';
import PostCard from '../components/PostCard';
import NoPosts from '../components/NoPosts';
import { Fade } from '@chakra-ui/react';

const Community = () => {
  const navigate = useNavigate();
  const { id: communityId } = useOutletContext();
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
      {isLoading ? (
        loadingPostCards
      ) : hasNoPosts ? (
        <NoPosts />
      ) : (
        <Fade in={!isLoading}>{postCards}</Fade>
      )}
    </Container>
  );
};

export default Community;
