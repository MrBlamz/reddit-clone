import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import FormNavigation from './FormNavigation';

const MultiStepForm = ({
  children,
  initialValues,
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true,
}) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const nextStep = (values) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };
  const previousStep = (values) => {
    setSnapshot(values);
    setStepNumber(stepNumber - 1);
  };

  const handleSubmit = (values, actions) => {
    if (step.props.onSubmit) {
      step.props.onSubmit(values, actions);
    }

    if (isLastStep) {
      onSubmit(values, actions);
    } else {
      actions.setSubmitting(false);
      actions.setTouched({});
      nextStep(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
      validateOnChange={validateOnChange}
      validateOnBlur={validateOnBlur}
    >
      {(formik) => (
        <Form>
          {step}
          <FormNavigation
            isLastStep={isLastStep}
            hasPrevious={stepNumber > 0}
            onBackClick={() => previousStep(formik.values)}
            isSubmitting={formik.isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export const FormStep = ({ children }) => children;

export default MultiStepForm;
