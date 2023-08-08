import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Modal } from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import { Comment, CommentPostData } from '../../../interface';

import './modal.css';

import send from '../../../assets/envoyer.png';
import warning from '../../../assets/Icon/attention.png';
import fail from '../../../assets/Icon/avertissement.png';

import {
  postComments,
  deletePicture,
  deleteComments,
  clearErrorPictures,
} from '../../../store/reducers/picture';

function ModalConfirm({
  openBigPicture,
  setOpenBigPicture,
  selectedPhoto,
}: {
  openBigPicture: boolean;
  setOpenBigPicture: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPhoto: {
    picture_id: number;
    picture_title: string;
    picture_url: string;
    comments: Comment[];
  };
}) {
  const API_URL = import.meta.env.VITE_API_URL_PICTURES;

  const dispatch = useAppDispatch();
  const rootRef = useRef<HTMLDivElement>(null);

  const author = useAppSelector((state) => state.user.pseudo);
  const pictures = useAppSelector((state) => state.pictures.pictures);
  const userId = useAppSelector((state) => state.user.userId) ?? 0;

  const pictureId = selectedPhoto.picture_id;
  const [showError, setShowError] = useState(false);
  const error = useAppSelector((state) => state.pictures.error) ?? '';

  // DETERMINE THE INDEX OF THE PICTURE IN THE ARRAY
  const index = pictures.findIndex(
    (picture) => picture.picture_id === pictureId
  );

  // FOR THE COMMENTS
  const userName = useAppSelector((state) => state.user.pseudo);
  const [commentContent, setCommentContent] = useState('');
  const [deleteCommentStyle, setDeleteCommentStyle] = useState('down');
  const commentsState = useAppSelector(
    (state) => state.pictures.pictures[index]?.comments
  );

  // FOR THE IMAGE
  const [imageClass, setImageClass] = useState('');

  // FOR THE DELETE MODAL
  const [openDelete, setOpenDelete] = useState(false);

  const handleAddComment = (
    event: React.FormEvent<HTMLButtonElement>,
    picture_id: number
  ) => {
    event.preventDefault();
    if (!error) {
      setDeleteCommentStyle('down');
      setImageClass('sent');
      const commentData: CommentPostData = {
        picture_id,
        content: commentContent,
        user_id: userId,
      };
      dispatch(postComments(commentData));
      setCommentContent('');
      setTimeout(() => {
        setImageClass('');
      }, 1000);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        dispatch(clearErrorPictures());
      }, 3000);
    }
  };

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
        dispatch(clearErrorPictures());
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error, dispatch]);

  const handlePictureDelete = (
    event: React.FormEvent<HTMLButtonElement>,
    pictureIdToDelete: number
  ) => {
    event.preventDefault();
    dispatch(deletePicture(pictureIdToDelete));

    setOpenBigPicture(false);
    setOpenDelete(false);
  };

  const handleDeleteComment = (
    event: React.FormEvent<HTMLButtonElement>,
    pictureIdToDelete: number,
    commentId: string
  ) => {
    if (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        dispatch(clearErrorPictures());
      }, 3000);
    } else {
      event.preventDefault();
      dispatch(deleteComments({ pictureId, commentId }));
    }
  };

  return (
    <div ref={rootRef}>
      <Modal
        className="modal bg-transparent backdrop-blur-sm"
        show={openBigPicture}
        root={rootRef.current ?? undefined}
      >
        <Modal.Body>
          <h1 className="text-2xl font-bold uppercase text-black">
            {selectedPhoto.picture_title}
          </h1>

          <img src={`${API_URL}/${selectedPhoto.picture_url}`} alt="" />
          <div>
            {commentsState &&
              commentsState.map((comment: Comment) => (
                <article className="flex" key={comment.comment_id}>
                  <div className="flex h-auto w-full items-center justify-between gap-2 shadow">
                    <p
                      className={`p-2 text-black ${deleteCommentStyle} max-w-full break-words`}
                      key={comment.comment_id}
                    >
                      {comment.comment_content}
                      {comment.pseudo === undefined ? (
                        <i className="text-sm text-gray-500"> par {author}</i>
                      ) : (
                        <i className="text-sm text-gray-500">
                          {' '}
                          par {comment.pseudo}
                        </i>
                      )}
                    </p>

                    {(userName === comment.pseudo ||
                      comment.pseudo === undefined) && (
                      <Button
                        color="red"
                        size="xs"
                        type="button"
                        className=" text-red-600  hover:bg-red-600 hover:text-red-100"
                        onClick={(event) =>
                          handleDeleteComment(
                            event,
                            selectedPhoto.picture_id,
                            comment.comment_id
                          )
                        }
                      >
                        X
                      </Button>
                    )}
                  </div>
                </article>
              ))}
          </div>
          <div className="relative z-0  flex w-full items-center overflow-x-hidden">
            <input
              type="text"
              value={commentContent}
              onChange={(e) => {
                setCommentContent(e.target.value);
              }}
              id="Ajouter un commentaire"
              className="peer mt-2 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 text-sm text-gray-900  focus:outline-none focus:ring-0"
              placeholder=" "
            />
            <label
              htmlFor="Ajouter un commentaire"
              className="absolute top-3 -z-10 mt-2 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 "
            >
              Ajouter un commentaire
            </label>

            <button
              className={`send ${imageClass}`}
              type="button"
              onClick={(event) => {
                handleAddComment(event, selectedPhoto.picture_id);
              }}
            >
              <img className={`send h-5 w-5 `} src={send} alt="" />
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex w-full justify-between">
          <Button onClick={() => setOpenBigPicture(!openBigPicture)}>
            Fermer
          </Button>
          {showError && (
            <Alert color="failure" className="">
              <div className="flex">
                <img className="mr-5 w-5" src={fail} alt="" />
                {error}
              </div>
            </Alert>
          )}
          {author === selectedPhoto.pseudo ||
          selectedPhoto.pseudo === undefined ? (
            <Button color="red" onClick={() => setOpenDelete(!openDelete)}>
              <p>Supprimer</p>
            </Button>
          ) : (
            ''
          )}
        </Modal.Footer>
      </Modal>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => setOpenDelete(!openDelete)}
        show={openDelete}
        size="md"
        className="modal bg-transparent backdrop-blur-sm"
      >
        <Modal.Body className=" text-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200">
              <img src={warning} alt="" />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Êtes vous sure de vouloir supprimer cette photo ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={(event) =>
                  handlePictureDelete(event, selectedPhoto.picture_id)
                }
                color="failure"
              >
                Oui, j&apos;en suis sûr.
              </Button>
              <Button
                onClick={() => setOpenDelete(!openDelete)}
                color="gray"
                className="bg-familink-black hover:text-slate-400"
              >
                Non, Revenir en arrière
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalConfirm;
