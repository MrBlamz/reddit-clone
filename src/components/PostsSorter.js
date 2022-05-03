import { Button, HStack, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { SORT_POSTS_OPTIONS } from '../constants';
import { IoMdMoon, IoMdRocket, IoMdSunny } from 'react-icons/io';

const BUTTON_OPTIONS = [
  { text: SORT_POSTS_OPTIONS[0], icon: <IoMdRocket size={20} /> },
  {
    text: SORT_POSTS_OPTIONS[1],
    icon: <IoMdMoon size={20} />,
  },
  { text: SORT_POSTS_OPTIONS[2], icon: <IoMdSunny size={20} /> },
];

const isSelected = (buttonText, selectedMode) => buttonText === selectedMode;

export const PostsSorter = ({
  selectedSortingMode,
  setSelectedSortingMode,
}) => {
  const selectedButtonBgColor = useColorModeValue(
    'brand.iconFadedLight',
    'brand.iconFadedDark'
  );
  const selectedButtonColor = useColorModeValue(
    'brand.secondary',
    'brand.primary'
  );

  const handleClick = (mode) => () => setSelectedSortingMode(mode);

  useEffect(() => {
    if (!selectedSortingMode) setSelectedSortingMode(BUTTON_OPTIONS[0].text);
  }, [selectedSortingMode, setSelectedSortingMode]);

  return (
    <HStack
      spacing={3}
      p={3}
      bg={useColorModeValue('brand.light', 'brand.dark')}
      border='1px'
      borderRadius={5}
      borderColor={useColorModeValue('brand.borderLight', 'brand.borderDark')}
    >
      {BUTTON_OPTIONS.map((option, i) => (
        <Button
          key={i}
          variant='action'
          leftIcon={option.icon}
          borderRadius={50}
          bg={
            isSelected(option.text, selectedSortingMode) &&
            selectedButtonBgColor
          }
          color={
            isSelected(option.text, selectedSortingMode)
              ? selectedButtonColor
              : 'GrayText'
          }
          onClick={handleClick(option.text)}
        >
          {option.text}
        </Button>
      ))}
    </HStack>
  );
};
