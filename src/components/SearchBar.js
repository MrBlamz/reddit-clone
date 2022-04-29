import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import { SearchResults } from './SearchResults';
import { debounce } from 'lodash';

export const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const ref = useRef(null);
  const location = useLocation();

  const handleClick = () => {
    if (searchValue) setShowSearch(true);
  };

  // Updates searchValue when not called in the interval timer
  const updateSearchValue = useRef(
    debounce((value) => setSearchValue(value), 500)
  ).current;

  const handleInputChange = (event) => {
    const { value } = event.target;

    setInputValue(value);

    if (!showSearch && value) setShowSearch(true);

    if (!value) setShowSearch(false);

    updateSearchValue(value);
  };

  const onClose = (event) => {
    const isSearchBar = ref.current.contains(event.target);

    if (isSearchBar) return;

    setShowSearch(false);
  };

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      const isEscape = event.key === 'Escape';

      if (isEscape) setShowSearch(false);
    };

    document.addEventListener('keyup', handleEscapeKeyPress);

    return () => document.removeEventListener('keyup', handleEscapeKeyPress);
  }, []);

  useEffect(() => {
    setInputValue('');
    setSearchValue('');
  }, [location]);

  return (
    <>
      <InputGroup
        bg={useColorModeValue('brand.inputBgLight', 'brand.inputBgDark')}
        borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
        borderRadius='100%'
        _hover={{
          borderColor: useColorModeValue('brand.secondary', 'brand.light'),
        }}
        onClick={handleClick}
        ref={ref}
      >
        <InputLeftElement
          pointerEvents='none'
          color='brand.iconDark'
          fontSize='1.5rem'
          children={<IoSearchOutline />}
        />
        <Input
          placeholder='Search Reddit'
          focusBorderColor={useColorModeValue('brand.secondary', 'brand.light')}
          _hover={{ outline: 'none' }}
          value={inputValue}
          onChange={handleInputChange}
        />
      </InputGroup>
      {showSearch && (
        <SearchResults
          position='absolute'
          top={`${ref.current.clientHeight + 8}px`}
          width={`${ref.current.clientWidth}px`}
          zIndex='1000'
          searchValue={searchValue}
          inputValue={inputValue}
          onClose={onClose}
        />
      )}
    </>
  );
};
