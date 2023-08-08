import { Carousel, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useAppSelector } from '../../../../hooks/redux';
import ModalBigPicture from '../../../Pictures/Modals/ModalBigPicture';
import MainTitle from '../../../../App/Components/MainTitle/MainTitle';

function Carrousel() {
  const [openBigPicture, setOpenBigPicture] = useState(false);
  const pictures = useAppSelector((state) => state.pictures.pictures);
  const API_URL = import.meta.env.VITE_API_URL_PICTURES;

  const [selectedPhoto, setSelectedPhoto] = useState(0);

  const handleModalOpen = () => {
    setOpenBigPicture(true);
  };
  return (
    <>
      <MainTitle content="le Carrousel" />
      {pictures.length === 0 ? (
        <p className="text-center">Il n&apos;y a pas encore de photos</p>
      ) : (
        <Carousel className="relative" style={{ height: '450px' }}>
          {pictures &&
            pictures.map((picture) => (
              <div key={picture.picture_id}>
                <h3 className="mx-auto my-5 flex w-full items-center">
                  <span className="h-1 flex-grow rounded bg-black/20" />
                  <p className=" bottom-5 left-10 w-fit rounded px-5 py-2  font-journal font-semibold uppercase text-black">
                    {picture.picture_title}
                  </p>
                  <span className="h-1 flex-grow rounded bg-black/20" />
                </h3>
                <button
                  type="button"
                  className="flex h-full w-full justify-center object-cover"
                  onClick={() => {
                    handleModalOpen();
                    setSelectedPhoto(picture);
                  }}
                >
                  <img
                    className="w-max-[200px] h-[400px] object-cover"
                    src={`${API_URL}/${picture.picture_url}`}
                    alt=""
                  />
                </button>
              </div>
            ))}
        </Carousel>
      )}
      <ModalBigPicture
        selectedPhoto={selectedPhoto}
        openBigPicture={openBigPicture}
        setOpenBigPicture={setOpenBigPicture}
      />
    </>
  );
}

export default Carrousel;
