import {
  Avatar,
  Heading,
  HStack,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import useModal from '../hooks/useModal';
import { useUser } from '../hooks/useUser';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectFollowingCommunity } from '../store/auth';
import { handleFollowingCommunity as handleFollowingCommunityOnServer } from '../utils/firebase/firestore';
import {
  FOLLOW_COMMUNITY,
  UNFOLLOW_COMMUNITY,
  FOLLOW_COMMUNITY_MESSAGE,
  UNFOLLOW_COMMUNITY_MESSAGE,
} from '../constants';
import { useNotification } from '../hooks/useNotification';
import { FollowCommunityButton } from './buttons/FollowCommunityButton';

const CommunityHeader = ({ name, id, setCommunityData }) => {
  const isFollower = useSelector(selectFollowingCommunity(id));
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, userId, followCommunity, unfollowCommunity } = useUser();
  const { onOpen } = useModal('LoginModal');
  const { sendNotification } = useNotification();

  const handleAction = async (action) => {
    let updatedCommunityMemberCount;
    let message;
    const OPTIONS = {
      [FOLLOW_COMMUNITY]: async () => {
        updatedCommunityMemberCount = await handleFollowingCommunityOnServer(
          FOLLOW_COMMUNITY,
          id,
          userId
        );
        followCommunity(id);
        message = `${FOLLOW_COMMUNITY_MESSAGE} ${name}`;
      },

      [UNFOLLOW_COMMUNITY]: async () => {
        updatedCommunityMemberCount = await handleFollowingCommunityOnServer(
          UNFOLLOW_COMMUNITY,
          id,
          userId
        );
        unfollowCommunity(id);
        message = `${UNFOLLOW_COMMUNITY_MESSAGE} ${name}`;
      },
    };

    const handleAction = OPTIONS[action];

    await handleAction();
    setCommunityData((prevCommunityData) => ({
      ...prevCommunityData,
      members: updatedCommunityMemberCount,
    }));
    sendNotification('success', message);
  };

  const handleHeaderClick = () => {
    const currentPath = location.pathname;
    const newPath = `/r/${name}`;

    if (currentPath !== newPath) navigate(newPath);
  };

  const handleFollowButtonClick = async (event) => {
    if (!isLoggedIn) {
      onOpen();
      return;
    }

    try {
      isFollower
        ? handleAction(UNFOLLOW_COMMUNITY)
        : handleAction(FOLLOW_COMMUNITY);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HStack
      as='header'
      spacing={{ base: 3, md: 6 }}
      px={{ base: 3, md: 7 }}
      py={{ base: 5, md: 7 }}
      bg={useColorModeValue('brand.secondary', 'brand.primary')}
    >
      <Avatar
        name={name}
        size={useBreakpointValue({ base: 'md', md: 'lg' })}
        border={`2px solid ${useColorModeValue('white', 'black')}`}
        bg={useColorModeValue('black', 'white')}
        color={useColorModeValue('white', 'black')}
        fontWeight='bold'
        onClick={handleHeaderClick}
        _hover={{ cursor: 'pointer' }}
      />
      <Heading
        fontSize={{ base: 20, md: 22 }}
        color='brand.inputBgLight'
        onClick={handleHeaderClick}
        _hover={{ cursor: 'pointer' }}
      >
        {name}
      </Heading>
      <FollowCommunityButton
        isFollower={isFollower}
        onClick={handleFollowButtonClick}
      />
    </HStack>
  );
};

export default CommunityHeader;
