import { Box, Container } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import { postExample } from '../data';

const Home = () => {
  return (
    <>
      <Navbar />
      <Container maxW='full' padding={{ base: 2, md: '20px 24px' }}>
        <Box>
          <PostCard
            isFirst
            communityName='Stoicism'
            comments={postExample.comments}
            title={postExample.title}
            content={postExample.content}
            author={postExample.author}
            upVotes={postExample.upVotes}
            downVotes={postExample.downVotes}
            timestamp={postExample.timestamp}
          />
        </Box>
      </Container>
    </>
  );
};

export default Home;
