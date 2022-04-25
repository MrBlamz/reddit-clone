import { Box, Divider, Flex, Stack, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  fetchPost,
  fetchOrderedCommentsByPostTime,
  fetchOrderedCommentsByVoteNumber,
} from '../utils/firebase/firestore';
import { isEmptyArray } from 'formik';
import PostContent from '../components/Post';
import CreateComment from '../components/CreateComment';
import Comment from '../components/Comment';
import DropdownMenu from '../components/DropdownMenu';
import NoComments from '../components/NoComments';
import LoadingPost from '../components/LoadingPost';
import LoadingComment from '../components/LoadingComment';
import PostNotFound from '../components/PostNotFound';

const CommentsSection = ({ children }) => (
  <Stack
    borderRadius={5}
    bg={useColorModeValue('brand.light', 'brand.dark')}
    spacing={4}
    px={{ base: 2, md: 12 }}
    py={{ base: 2, md: 6 }}
    mt={4}
  >
    {children}
  </Stack>
);

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const hasNoComments = isEmptyArray(comments);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const dropdownMenuOptions = ['Best', 'Recent', 'Old'];
  const [sortCommentsMode, setSortCommentsMode] = useState(
    dropdownMenuOptions[0]
  );

  const fetchPostData = useCallback(async () => {
    setIsLoadingPost(true);

    try {
      const postData = await fetchPost(postId);
      setPost(postData);
    } catch (error) {
      console.log(error);
    }

    setIsLoadingPost(false);
  }, [postId]);

  const fetchCommentsFunctions = useMemo(
    () => ({
      Best: () => fetchOrderedCommentsByVoteNumber(postId),
      Recent: () => fetchOrderedCommentsByPostTime(postId, 'desc'),
      Old: () => fetchOrderedCommentsByPostTime(postId, 'asc'),
    }),
    [postId]
  );

  const fetchCommentsData = useCallback(async () => {
    setIsLoadingComments(true);

    try {
      const fetchComments = fetchCommentsFunctions[sortCommentsMode];
      const commentsData = await fetchComments();
      setComments(commentsData);
    } catch (error) {
      console.log(error);
    }

    setIsLoadingComments(false);
  }, [fetchCommentsFunctions, sortCommentsMode]);

  const changeSortingMode = (event) => {
    const selectedSortingMode = event.target.textContent;
    setSortCommentsMode(selectedSortingMode);
  };

  // Set sort comments mode to recent if not already when a new comment is submitted
  // If mode is recent already run fetch function instead
  const handleCommentSubmit = async () => {
    if (sortCommentsMode === 'Recent') {
      fetchCommentsData();
      return;
    }

    setSortCommentsMode('Recent');
  };

  // Fetch post when postId changes
  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  // Fetch comments when selected sort mode changes
  useEffect(() => {
    fetchCommentsData();
  }, [fetchCommentsData]);

  if (!isLoadingPost && !post) return <PostNotFound />;

  return (
    <Box w='full' py={3} px={{ base: 3, xl: 80 }}>
      {isLoadingPost ? (
        <LoadingPost />
      ) : (
        <PostContent
          title={post.title}
          author={post.author}
          content={post.content}
          commentsNumber={post.commentsNumber}
          votes={post.votes}
          timestamp={post.timestamp}
          postId={postId}
        />
      )}

      <CommentsSection>
        <CreateComment postId={postId} onSubmit={handleCommentSubmit} />

        <Flex direction='column'>
          <DropdownMenu
            description={`Sort By: ${sortCommentsMode}`}
            onClick={changeSortingMode}
            options={dropdownMenuOptions}
            selected={sortCommentsMode}
          />
          <Divider mt={-1} />
        </Flex>

        {isLoadingComments &&
          [...Array(5)].map((v, i) => <LoadingComment key={i} />)}

        {!isLoadingComments &&
          comments.length &&
          comments.map((comment) => (
            <Comment
              key={comment.id}
              commentId={comment.id}
              isPostAuthor={comment.userId === post.userId}
              author={comment.author}
              content={comment.content}
              votes={comment.votes}
              timestamp={comment.timestamp}
            />
          ))}

        {!isLoadingComments && hasNoComments && <NoComments />}
      </CommentsSection>
    </Box>
  );
};

export default Post;
