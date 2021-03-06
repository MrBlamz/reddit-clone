import { Button, HStack } from '@chakra-ui/react';

const FormNavigation = ({
  hasPrevious,
  onBackClick,
  isSubmitting,
  isLastStep,
  submitButtonText,
}) => {
  return (
    <HStack mt={3}>
      {hasPrevious && (
        <Button variant='secondary' w='full' onClick={onBackClick}>
          Back
        </Button>
      )}
      <Button type='submit' variant='primary' w='full' isLoading={isSubmitting}>
        {isLastStep && submitButtonText
          ? submitButtonText
          : isLastStep
          ? 'Submit'
          : 'Next'}
      </Button>
    </HStack>
  );
};

export default FormNavigation;
