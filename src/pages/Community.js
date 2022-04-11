import Container from '../components/containers/Container';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import LoadingPostCard from '../components/LoadingPostCard';
import PostCard from '../components/PostCard';
import { fetchCommunityPosts } from '../utils/firebase/firestore';

const Community = () => {
  const navigate = useNavigate();
  const { communityId } = useOutletContext();
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

  return <Container>{isLoading ? loadingPostCards : postCards}</Container>;
};

export default Community;
