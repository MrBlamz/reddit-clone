import {
  Box,
  Divider,
  Fade,
  Flex,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
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
import { useUser } from '../hooks/useUser';

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
  const { userId } = useUser();
  const dropdownMenuOptions = ['Best', 'Recent', 'Old'];
  const [state, setState] = useState({
    post: null,
    comments: [],
    isLoadingPost: true,
    isLoadingComments: true,
    sortCommentsMode: dropdownMenuOptions[0],
  });
  const { post, comments, isLoadingPost, isLoadingComments, sortCommentsMode } =
    state;
  const hasNoComments = isEmptyArray(state.comments);

  const handleCommentDelete = (commentId) =>
    setState((prevState) => ({
      ...prevState,
      post: {
        ...prevState.post,
        commentsNumber: prevState.post.commentsNumber - 1,
      },
      comments: prevState.comments.filter(
        (comment) => comment.id !== commentId
      ),
    }));

  const fetchPostData = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoadingPost: true }));

    try {
      const postData = await fetchPost(postId);
      setState((prevState) => ({ ...prevState, post: postData }));
    } catch (error) {
      console.log(error);
    }

    setState((prevState) => ({ ...prevState, isLoadingPost: false }));
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
    setState((prevState) => ({ ...prevState, isLoadingComments: true }));

    try {
      const fetchComments = fetchCommentsFunctions[sortCommentsMode];
      const commentsData = await fetchComments();
      setState((prevState) => ({ ...prevState, comments: commentsData }));
    } catch (error) {
      console.log(error);
    }

    setState((prevState) => ({ ...prevState, isLoadingComments: false }));
  }, [fetchCommentsFunctions, sortCommentsMode]);

  const changeSortingMode = (event) => {
    const selectedSortingMode = event.target.textContent;
    setState((prevState) => ({
      ...prevState,
      sortCommentsMode: selectedSortingMode,
    }));
  };

  // Set sort comments mode to recent if not already when a new comment is submitted
  // If mode is recent already run fetch function instead
  const handleCommentSubmit = async () => {
    setState((prevState) => ({
      ...prevState,
      post: {
        ...prevState.post,
        commentsNumber: prevState.post.commentsNumber + 1,
      },
    }));

    if (sortCommentsMode === 'Recent') {
      fetchCommentsData();
      return;
    }
    setState((prevState) => ({ ...prevState, sortCommentsMode: 'Recent' }));
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
      {state.isLoadingPost ? (
        <LoadingPost />
      ) : (
        <Fade in={!state.isLoadingPost}>
          <PostContent
            title={post.title}
            author={post.author}
            isAuthor={post.userId === userId}
            content={post.content}
            commentsNumber={post.commentsNumber}
            votes={post.votes}
            timestamp={post.timestamp}
            postId={postId}
          />
        </Fade>
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
              isAuthor={comment.userId === userId}
              author={comment.author}
              content={comment.content}
              votes={comment.votes}
              timestamp={comment.timestamp}
              onDelete={handleCommentDelete}
            />
          ))}

        {!isLoadingComments && hasNoComments && <NoComments />}
      </CommentsSection>
    </Box>
  );
};

export default Post;
