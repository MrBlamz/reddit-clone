import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Stack,
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
import UpVoteButton from './buttons/UpVoteButton';
import DownVoteButton from './buttons/DownVoteButton';

const ActionButton = ({ ariaLabel, icon, text, ...rest }) => (
  <Button
    variant='action'
    aria-label={ariaLabel}
    leftIcon={icon}
    fontSize='xl'
    {...rest}
  >
    <Text fontSize='xs'>{text}</Text>
  </Button>
);

const VotingButtons = ({ upVotes, downVotes, ...rest }) => (
  <Stack
    alignItems='center'
    justifyContent='center'
    lineHeight={0}
    direction={{ base: 'row', lg: 'column' }}
    {...rest}
  >
    <UpVoteButton />
    <Text fontWeight='bold'>{upVotes - downVotes}</Text>
    <DownVoteButton />
  </Stack>
);

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
  upVotes,
  downVotes,
  timestamp,
  isFirst,
  isLast,
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
              <VotingButtons upVotes={upVotes} downVotes={downVotes} />
              <Flex ml={2} flexWrap='wrap'>
                {ACTION_BUTTONS.map((btn) => (
                  <ActionButton
                    p={1}
                    key={btn.ariaLabel}
                    ariaLabel={btn.ariaLabel}
                    icon={btn.icon}
                    text={btn.text}
                  />
                ))}
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
            <VotingButtons upVotes={upVotes} downVotes={downVotes} />
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
                    {ACTION_BUTTONS.map((btn) => (
                      <ActionButton
                        key={btn.text}
                        ariaLabel={btn.ariaLabel}
                        icon={btn.icon}
                        text={btn.text}
                      />
                    ))}
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
