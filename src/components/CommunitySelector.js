import {
  Avatar,
  Box,
  Button,
  Flex,
  forwardRef,
  HStack,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { useUser } from '../hooks/useUser';
import useModal from '../hooks/useModal';
import { fetchCommunityData } from '../utils/firebase/firestore';

const MenuItem = ({ name, members, onClick }) => (
  <HStack
    w='full'
    p={2}
    cursor='pointer'
    _hover={{
      bg: useColorModeValue('brand.iconFadedLight', 'brand.iconFadedDark'),
    }}
    onClick={onClick}
  >
    <Avatar
      size='sm'
      name={name}
      border={`2px solid ${useColorModeValue('white', 'black')}`}
      bg={useColorModeValue('black', 'white')}
      color={useColorModeValue('white', 'black')}
      fontWeight='bold'
    />
    <Box>
      <Text fontSize={14} fontWeight='bold'>
        {name}
      </Text>
      <Text
        fontSize={12}
        color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
      >{`${members} ${members === 1 ? 'member' : 'members'}`}</Text>
    </Box>
  </HStack>
);

const Menu = forwardRef(({ width, communities, onMenuItemClick }, ref) => {
  const { onOpen } = useModal('CreateCommunityModal');

  return (
    <Box
      position='absolute'
      w={width + 2}
      maxH={200}
      bg={useColorModeValue('brand.light', 'brand.dark')}
      border='1px solid'
      borderTop='none'
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      borderRadius='0 0 5px 5px'
      zIndex={1000}
      overflowY='scroll'
      ref={ref}
    >
      <Flex alignItems='center' fontSize={12} p={2}>
        <Text
          fontWeight='bold'
          color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
        >
          YOUR COMMUNITIES
        </Text>
        <Spacer />
        <Button
          variant='secondary'
          border='none'
          h={6}
          px={2}
          fontSize={12}
          onClick={onOpen}
        >
          Create new
        </Button>
      </Flex>
      <Box>
        {communities
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((community) => (
            <MenuItem
              key={community.id}
              name={community.name}
              members={community.members}
              id={community.id}
              onClick={onMenuItemClick(community.name, community.id)}
            />
          ))}
      </Box>
    </Box>
  );
});

const SelectedCommunity = ({ name }) => (
  <HStack>
    <Avatar
      size='xs'
      name={name}
      border={`2px solid ${useColorModeValue('white', 'black')}`}
      bg={useColorModeValue('black', 'white')}
      color={useColorModeValue('white', 'black')}
      fontWeight='bold'
    />
    <Text fontSize={14} fontWeight='bold'>
      {`r/${name}`}
    </Text>
  </HStack>
);

export const CommunitySelector = ({ onSelect, ...props }) => {
  const { isLoggedIn, followingCommunities } = useUser();
  const [state, setState] = useState({
    userCommunities: [],
    isOpen: false,
    selectedCommunity: null,
  });
  const { userCommunities, isOpen, selectedCommunity } = state;
  const ref = useRef();
  const menuRef = useRef();

  const handleClick = () => {
    if (!isLoggedIn) return;

    setState((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };

  const handleOutsideClick = (event) => {
    if (!state.isOpen) return;

    if (menuRef.current.contains(event.target)) return;

    setState((prevState) => ({ ...prevState, isOpen: false }));
  };

  const handleMenuItemClick = (name, id) => () => {
    const selectedCommunity = { name, id };

    setState((prevState) => ({
      ...prevState,
      selectedCommunity: selectedCommunity,
      isOpen: false,
    }));

    if (onSelect) onSelect(selectedCommunity);
  };

  useOutsideClick(ref, handleOutsideClick);

  useEffect(() => {
    const fetchUserCommunitiesData = async () => {
      const communitiesData = await Promise.all(
        followingCommunities.map(
          async (communityId) => await fetchCommunityData(communityId)
        )
      );

      setState((prevState) => ({
        ...prevState,
        userCommunities: communitiesData,
      }));
    };

    fetchUserCommunitiesData();
  }, [followingCommunities]);

  return (
    <Box position='relative' {...props}>
      <Flex
        direction='column'
        alignItems='flex-start'
        p={2}
        bg={useColorModeValue('brand.light', 'brand.dark')}
        border='1px solid'
        borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
        borderRadius={isOpen ? '5px 5px 0 0' : 5}
        cursor={isLoggedIn ? 'pointer' : 'not-allowed'}
        opacity={!isLoggedIn && 0.4}
        ref={ref}
        onClick={handleClick}
      >
        <HStack w='full'>
          {selectedCommunity ? (
            <SelectedCommunity name={selectedCommunity.name} />
          ) : (
            <Text fontWeight='bold' fontSize={14}>
              Choose a community
            </Text>
          )}
          <Spacer />
          <Icon
            as={isOpen ? RiArrowDropUpLine : RiArrowDropDownLine}
            boxSize={6}
          />
        </HStack>
      </Flex>
      {isOpen && (
        <Menu
          width={ref.current.clientWidth}
          communities={userCommunities}
          ref={menuRef}
          onMenuItemClick={handleMenuItemClick}
        />
      )}
    </Box>
  );
};
