import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Alert, Card, Tooltip } from 'flowbite-react';
import { useAppSelector } from '../../hooks/redux';

import './pictures.css';

import fail from '../../assets/Icon/avertissement.png';

import ModalBigPicture from './Modals/ModalBigPicture';
import ModalUpload from './Modals/ModalUpload';

function Pictures() {
  const API_URL = import.meta.env.VITE_API_URL_PICTURES;
  const [showError, setShowError] = useState(false);
  const error = useAppSelector((state) => state.pictures.error) ?? '';

  const [, setPictureId] = useState<number | null>(0);
  const familyId = useAppSelector((state) => state.user.familyId);

  // FOR THE PICTURES
  const pictures = useAppSelector((state) => state.pictures.pictures);
  const orderPictures = pictures.slice().reverse();

  // FOR THE MODAL
  const [openBigPicture, setOpenBigPicture] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState({
    picture_id: 0,
    picture_title: '',
    picture_url: '',
    comments: [],
  });
  const [openUploadPicture, setOpenUploadPicture] = useState(false);
  const [isActive] = useState(false);

  const toRender = orderPictures.map((picture: any) => {
    const commentLength = picture.comments?.length;
    let commentText;

    if (commentLength === 0 || commentLength === undefined) {
      commentText = 'Pas de commentaire';
    } else if (commentLength === 1) {
      commentText = 'Il y a 1 commentaire';
    } else {
      commentText = `Il y a ${commentLength} commentaires`;
    }

    return familyId === 1 || familyId === null ? (
      <Navigate to="/home" />
    ) : (
      <Card
        style={{ backgroundColor: '#e0dedb' }}
        className="mb-2 w-full"
        key={picture.picture_id}
      >
        <h2 className="text-xl font-bold uppercase">{picture.picture_title}</h2>
        <div className="mx-auto">
          <Tooltip
            className={`flex items-center justify-center ${
              isActive ? 'active' : ''
            }`}
            content="Cliquez pour aggrandir ou commenter"
          >
            <button
              className=""
              type="button"
              onClick={() => {
                setOpenBigPicture(!openBigPicture);
                setSelectedPhoto(picture);

                setPictureId(picture.picture_id);
              }}
            >
              <img src={`${API_URL}/${picture.picture_url}`} alt="" />
            </button>
          </Tooltip>
        </div>
        <p>{commentText}</p>
      </Card>
    );
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowError(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showError]);

  return (
    <main>
      <div className="flex w-full items-center justify-end gap-5">
        {showError && (
          <Alert color="failure" className="flex-1">
            <div className="flex">
              <img className="mr-5 w-5" src={fail} alt="" />
              {error}
            </div>
          </Alert>
        )}
        <button
          className="text-l relative my-3 box-content border border-white bg-black/80 px-5 py-3 text-center font-journal font-semibold  uppercase text-white outline  outline-black transition-all duration-1000 hover:bg-black/60"
          type="button"
          onClick={() => setOpenUploadPicture(!openUploadPicture)}
        >
          Charger une photo
        </button>
      </div>
      {toRender}

      {pictures.length > 0 && (
        <button
          className="text-l float-right my-3 box-content border border-white bg-black/80 px-5 py-3 text-center font-journal font-semibold  uppercase text-white outline  outline-black transition-all duration-1000 hover:bg-black/60"
          type="button"
          onClick={() => setOpenUploadPicture(!openUploadPicture)}
        >
          Charger une photo
        </button>
      )}
      <ModalBigPicture
        openBigPicture={openBigPicture}
        setOpenBigPicture={setOpenBigPicture}
        selectedPhoto={selectedPhoto}
      />
      <ModalUpload
        setShowError={setShowError}
        openUploadPicture={openUploadPicture}
        setOpenUploadPicture={setOpenUploadPicture}
      />
    </main>
  );
}

export default Pictures;
