import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { BiShare } from 'react-icons/bi';
import { BsArrowsAngleExpand, BsBookmark, BsCardText } from 'react-icons/bs';
import { VscComment } from 'react-icons/vsc';
import { getElapsedTimeAsString } from '../utils/date';
import VotingButtons from './buttons/VotingButtons';
import ActionButton from './buttons/ActionButton';

const ExpandButton = ({ ...rest }) => (
  <IconButton
    variant='action'
    aria-label='Expand post'
    icon={<BsArrowsAngleExpand />}
    transform='rotate(90deg)'
    fontSize='xl'
    color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
    {...rest}
  />
);

const DocumentIcon = ({ ...rest }) => (
  <Center
    ml={2}
    bg={useColorModeValue('brand.iconBgLight', 'brand.iconBgDark')}
    w='130px'
    h='full'
    {...rest}
  >
    <Icon
      as={BsCardText}
      boxSize={5}
      color={useColorModeValue('brand.iconLight', 'brand.iconDark')}
    />
  </Center>
);

const Header = ({ title, communityName, author, elapsedTime }) => {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.stopPropagation();
    navigate(`/r/${communityName}`);
  };

  return (
    <Flex direction='column' alignItems='flex-start'>
      <Box>
        <Text as='h3' fontWeight='600'>
          {title}
        </Text>
      </Box>
      <HStack fontSize='xs'>
        <Link onClick={handleClick}>
          <Text fontWeight='bold'>{`r/${communityName}`}</Text>
        </Link>
        <Text>{`Posted by u/${author}`}</Text>
        <Text>{elapsedTime}</Text>
      </HStack>
    </Flex>
  );
};

const PostCard = ({
  title,
  author,
  commentsNumber,
  communityName,
  votes,
  timestamp,
  isFirst,
  isLast,
  id,
  ...rest
}) => {
  const ACTION_BUTTONS = [
    {
      ariaLabel: 'Open Comments',
      icon: <VscComment />,
      text: `${commentsNumber} ${
        commentsNumber === 1 ? 'Comment' : 'Comments'
      }`,
    },
    {
      ariaLabel: 'Share post',
      icon: <BiShare style={{ transform: 'rotateY(180deg)' }} />,
      text: 'Share',
    },
    {
      ariaLabel: 'Save post',
      icon: <BsBookmark />,
      text: 'Save',
    },
  ];
  const [isMobile] = useMediaQuery('(max-width: 62rem)');
  const borderColor = useColorModeValue(
    'brand.borderLight',
    'brand.borderDark'
  );

  const VoteButtons = () => (
    <VotingButtons
      votes={votes}
      direction={isMobile ? 'row' : 'column'}
      fontSize={isMobile && '14px'}
    />
  );

  const Buttons = () =>
    ACTION_BUTTONS.map((btn) => (
      <ActionButton
        p={isMobile ? 1 : 4}
        key={btn.ariaLabel}
        ariaLabel={btn.ariaLabel}
        icon={btn.icon}
        text={btn.text}
      />
    ));

  return (
    <Flex
      width='full'
      minH='90px'
      position='relative'
      bg={useColorModeValue('brand.light', 'brand.dark')}
      px={{ base: 2, lg: 0 }}
      pt={{ base: 2, lg: 0 }}
      border='1px'
      borderTopRadius={isFirst ? '5px' : 0}
      borderBottomRadius={isLast ? '5px' : 0}
      borderColor={borderColor}
      borderBottomColor={isLast ? borderColor : 'transparent'}
      _hover={{
        cursor: 'pointer',
        border: '1px',
        borderColor: useColorModeValue('brand.dark', 'brand.light'),
      }}
      {...rest}
    >
      {isMobile ? (
        <>
          <VStack width='full' alignItems='flex-start'>
            <Header
              title={title}
              author={author}
              communityName={communityName}
              elapsedTime={getElapsedTimeAsString(timestamp)}
            />

            <Flex>
              <VoteButtons />
              <Flex ml={2} flexWrap='wrap'>
                <Buttons />
              </Flex>
            </Flex>
          </VStack>
          <Box
            display={{ base: 'none', md: 'block' }}
            position='relative'
            pb={2}
          >
            <DocumentIcon />
            <ExpandButton position='absolute' bottom='2' right='0' />
          </Box>
        </>
      ) : (
        <>
          <Flex p={2}>
            <VoteButtons />
            <DocumentIcon />
          </Flex>
          <Box>
            <Flex p={2} pb={0} pl={0} w='full' h='full'>
              <Flex direction='column' px={2}>
                <Header
                  title={title}
                  author={author}
                  communityName={communityName}
                  elapsedTime={getElapsedTimeAsString(timestamp)}
                />
                <HStack mt='auto'>
                  <ExpandButton />
                  <Divider orientation='vertical' h='50%' />
                  <Flex>
                    <Buttons />
                  </Flex>
                </HStack>
              </Flex>
            </Flex>
          </Box>
        </>
      )}
    </Flex>
  );
};

export default PostCard;
