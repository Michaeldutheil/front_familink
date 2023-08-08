import { useState, useRef, useEffect } from 'react';
import { Alert, Button, Card, Modal } from 'flowbite-react';
import './modal.css';

import send from '../../../assets/envoyer.png';
import {
  clearErrorPictures,
  postPictures,
} from '../../../store/reducers/picture';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

function ModalUpload({
  setShowError,
  setOpenUploadPicture,
  openUploadPicture,
}: {
  setShowError: (value: boolean) => void;
  setOpenUploadPicture: (value: boolean) => void;
  openUploadPicture: boolean;
}) {
  const dispatch = useAppDispatch();
  const rootRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const userId = useAppSelector((state) => state.user.userId);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const error = useAppSelector((state) => state.pictures.error) ?? '';

  // FUNCTION TO ADD A PICTURE
  const handleAddPicture = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!error) {
      const formData = new FormData();
      formData.append('title', title);
      if (file !== null) {
        formData.append('image', file);
      }
      if (userId !== undefined) {
        formData.append('user_id', String(userId));
      }
      setOpenUploadPicture(!openUploadPicture);
      dispatch(postPictures(formData));
      setTitle('');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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

  return (
    <div ref={rootRef}>
      <Modal
        className="modal bg-transparent backdrop-blur-sm"
        show={openUploadPicture}
        root={rootRef.current ?? undefined}
      >
        <form onSubmit={handleAddPicture} encType="multipart/form-data">
          <Card>
            <p>Charger une photo</p>
            <div className="relative z-0  flex w-full items-center overflow-x-hidden">
              <input
                required
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                id="Mettre un commentaire"
                className="peer mt-2 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 text-sm text-gray-900  focus:outline-none focus:ring-0"
                placeholder=" "
              />
              <label
                htmlFor="Mettre un commentaire"
                className="absolute top-3 -z-10 mt-2 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 "
              >
                Titre de votre photo
              </label>
              <button className="send" type="button">
                <img className={`send h-5 w-5 `} src={send} alt="" />
              </button>
            </div>
            <div className="flex w-full items-center justify-center">
              <input
                ref={fileInputRef}
                required
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                name="file"
                onChange={(e) => {
                  const selectedFile = e.target.files && e.target.files[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                  }
                }}
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>
            <Modal.Footer className="flex w-full justify-between">
              <Button type="submit">Upload</Button>

              <Button
                onClick={() => setOpenUploadPicture(!openUploadPicture)}
                color="red"
              >
                <p>Annuler</p>
              </Button>
            </Modal.Footer>
          </Card>
        </form>
      </Modal>
    </div>
  );
}

export default ModalUpload;
