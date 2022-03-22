import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPostCard from '../components/LoadingPostCard';
import PostCard from '../components/PostCard';
import { fetchCommunityPosts } from '../utils/firebase/firestore';

const Community = () => {
  const navigate = useNavigate();
  const { communityName } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handlePostClick = (postId) => (event) => {
    navigate(`./${postId}`);
  };

  const loadingPostCards = [...Array(10)].map((v, i) => (
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
      onClick={handlePostClick(post.id)}
    />
  ));

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const data = await fetchCommunityPosts(communityName);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, [communityName]);

  return (
    <Container maxW='full' padding={{ base: 2, md: '20px 24px' }}>
      {isLoading ? loadingPostCards : postCards}
    </Container>
  );
};

export default Community;
