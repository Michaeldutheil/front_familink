import { useRef } from 'react';
import { Button, Modal } from 'flowbite-react';
import { ModalWarningFamilyProps } from '../../../../interface';

import validation from '../../../../assets/Icon/validation.png';
import { useAppSelector } from '../../../../hooks/redux';

function ModalWarningFamily({
  setOpenModalWarningFamily,
  openModalWarningFamily,
  setEmail,
  setPseudo,
  email,
  pseudo,
  personne,
}: ModalWarningFamilyProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { family } = useAppSelector((state) => state.user);

  const handleClick = () => {
    setEmail('');
    setPseudo('');
    setOpenModalWarningFamily(!openModalWarningFamily);
  };

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => {
          setOpenModalWarningFamily(!openModalWarningFamily);
          handleClick();
        }}
        show={openModalWarningFamily}
        size="md"
        className="modal bg-transparent backdrop-blur-sm"
      >
        <Modal.Header className="border-1 bg-[#e0dedb] text-center">
          <p className="ml-8 mt-2  text-base">
            <p>Ajout {personne} supplémentaire </p>
            <div className="flex justify-center">
              <p>dans votre famille </p>
              <p className="ml-1 font-semibold text-green-500">{family}</p>
            </div>
          </p>
        </Modal.Header>
        <Modal.Body className="bg-[#e0dedb] text-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200">
              <img src={validation} alt="" />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              <p className="mb-3 flex justify-center text-base">
                <p>Création {personne}:</p>
                <p className="ml-1 mr-1 text-green-500">{pseudo}</p>
                <p>à réussie !</p>
              </p>
              <p className="flex justify-center text-base">
                <p className="mr-1">Pensez à valider le lien sur :</p>
                <p className="text-green-500">{email}</p>
              </p>
              <p className="mt-2 text-base">pour utiliser Familink !</p>.
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleClick} color="success">
                Oui, j&apos;ai bien compris
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalWarningFamily;
