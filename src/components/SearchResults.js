import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { fetchCommunitiesByName } from '../utils/firebase/firestore';
import logo from '../assets/logo/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { isEqual } from 'lodash';

const Container = ({ children, ...props }) => {
  const bgColor = useColorModeValue(
    'brand.iconFadedLight',
    'brand.iconFadedDark'
  );

  return (
    <HStack
      as='a'
      p={2}
      fontSize={14}
      _hover={{
        bg: bgColor,
        cursor: 'pointer',
      }}
      _focus={{
        bg: bgColor,
        outline: 'none',
      }}
      {...props}
    >
      {children}
    </HStack>
  );
};

const Result = ({ name, onClick, ...props }) => {
  return (
    <Container onClick={onClick} {...props}>
      <HStack>
        <Image src={logo} boxSize={5} />
        <Flex direction='column' alignItems='flex-start'>
          <Text fontWeight='bold'>{name}</Text>
        </Flex>
      </HStack>
    </Container>
  );
};

const SearchFor = ({ value, onClick, ...props }) => (
  <Container onClick={onClick} {...props}>
    <HStack>
      <Icon as={IoSearchOutline} boxSize={5} />
      <Text fontSize={14}>Search for {value}</Text>
    </HStack>
  </Container>
);

export const SearchResults = ({
  searchValue,
  inputValue,
  onClose,
  ...props
}) => {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const mountedRef = useRef(true);
  const ref = useRef(null);
  useOutsideClick(ref, onClose);

  const handleClick = (path, event) => {
    navigate(path);
    onClose(event);
  };

  const handleResultClick = (name) => (event) =>
    handleClick(`/r/${name}`, event);

  const handleSearchClick = (event) =>
    handleClick(`/search/${searchValue}`, event);

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!searchValue) return;

      try {
        const data = await fetchCommunitiesByName(searchValue);
        const isSameData = isEqual(data, result);

        if (!isSameData && mountedRef.current) setResult(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCommunities();
  }, [searchValue, result]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <Box
      bg={useColorModeValue('brand.inputBgLight', 'brand.inputBgDark')}
      border='1px solid'
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      borderRadius={5}
      ref={ref}
      {...props}
    >
      {result.map((item) => (
        <Result
          key={item.id}
          name={item.name}
          onClick={handleResultClick(item.name)}
        />
      ))}
      <SearchFor value={inputValue} onClick={handleSearchClick} />
    </Box>
  );
};
