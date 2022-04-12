import { useDispatch, useSelector } from 'react-redux';
import * as ui from '../store/ui';

/* Used in case of a null value passed to useSelector to prevent error since
   useSelector must receive a function.
*/
const placeholderFunction = () => {};

const useModal = (name) => {
  const dispatch = useDispatch();

  const isOpen = useSelector(ui[`select${name}Status`] || placeholderFunction);

  const isLogin = useSelector(ui[`select${name}Mode`] || placeholderFunction);

  const onOpen = () => dispatch(ui[`open${name}`]());

  const onClose = () => dispatch(ui[`close${name}`]());

  const changeMode = () => dispatch(ui[`change${name}Mode`]());

  return { isOpen, isLogin, onOpen, onClose, changeMode };
};

export default useModal;
