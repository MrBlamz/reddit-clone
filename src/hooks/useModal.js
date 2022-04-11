import { useDispatch, useSelector } from 'react-redux';
import * as ui from '../store/ui';

const useModal = (name) => {
  const dispatch = useDispatch();

  const isOpen = useSelector(ui[`select${name}Status`]);

  const onOpen = () => dispatch(ui[`open${name}`]());

  const onClose = () => dispatch(ui[`close${name}`]());

  return { isOpen, onOpen, onClose };
};

export default useModal;
