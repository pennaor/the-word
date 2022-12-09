import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setModal } from '../redux/reducers/appReducer';

const REQUEST_ERROR = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const resolveRedirectPath = (status) => {
  let path = '';
  if (status === UNAUTHORIZED || status === NOT_FOUND) {
    path = '/login';
  }
  return path;
};

const generateFeedback = (response) => {
  const feedback = {
    title: 'Oops! We have a problem!',
    message: '',
    redirectPath: '',
  };
  if (!response || response.status >= SERVER_ERROR) {
    feedback.message = 'This service is currently unavailable';
    return feedback;
  }
  if (response.status >= REQUEST_ERROR) {
    feedback.redirectPath = resolveRedirectPath(response.status);
    feedback.message = response.data.message || 'Something wrong.';
    return feedback;
  }
  feedback.title = 'Success!';
  feedback.message = response.data.message || 'All good here.';
  return feedback;
};

export default function useModal() {
  const modal = useSelector((state) => state.app.modal);

  const dispatch = useDispatch();

  const history = useHistory();

  const writeOnModal = useCallback((title, message, redirectPath) => {
    dispatch(setModal({ title, message, redirectPath }));
  }, [dispatch]);

  const writeResponseOnModal = useCallback(({ response }) => {
    const feedback = generateFeedback(response);
    dispatch(setModal({ ...feedback }));
  }, [dispatch]);

  const clearModal = useCallback(() => {
    if (modal.redirectPath) {
      history.replace(modal.redirectPath);
      return history.go(0);
    }
    dispatch(setModal({ title: '', message: '', redirectPath: '' }));
  }, [modal, history, dispatch]);

  return {
    modal,
    writeOnModal,
    writeResponseOnModal,
    clearModal,
  };
}
