import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoSearchOutline } from 'react-icons/io5';

const SearchBar = (props) => {
  return (
    <InputGroup
      bg={useColorModeValue('brand.inputBgLight', 'brand.inputBgDark')}
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
      borderRadius='100%'
      _hover={{
        borderColor: useColorModeValue('brand.secondary', 'brand.light'),
      }}
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
      />
    </InputGroup>
  );
};

export default SearchBar;
