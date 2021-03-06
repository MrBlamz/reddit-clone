import { Button, Flex } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import AutoResizeTextArea from './AutoResizeTextArea';

export const Editor = ({ content, onCancel, onSave }) => {
  const [value, setValue] = useState(content);
  const [isSaving, setIsSaving] = useState(false);
  const ref = useRef();

  const handleInputChange = (event) => setValue(event.target.value);

  const handleSave = async () => {
    setIsSaving(true);

    await onSave(value);

    if (ref.current) setIsSaving(false);
  };

  return (
    <>
      <AutoResizeTextArea
        value={value}
        onChange={handleInputChange}
        padding={2}
      />
      <Flex w='full' justifyContent='flex-end' gap={3}>
        <Button
          variant='secondary'
          border='none'
          fontSize={14}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          fontSize={14}
          onClick={handleSave}
          disabled={content === value || !value}
          isLoading={isSaving}
          ref={ref}
        >
          Save
        </Button>
      </Flex>
    </>
  );
};
