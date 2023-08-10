import { useRef } from 'react';
import { Button, Modal } from 'flowbite-react';
import { ModalDeleteUserProps } from '../../../../interface';

import warning from '../../../../assets/Icon/attention.png';

function ModalDeleteUser({
  setOpenModalDeleteUser,
  openModalDeleteUser,
  handleDeleteUser,
}: ModalDeleteUserProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef}>
      <Modal
        className="modal bg-transparent backdrop-blur-sm"
        root={rootRef.current ?? undefined}
        onClose={() => setOpenModalDeleteUser(!openModalDeleteUser)}
        show={openModalDeleteUser}
        size="md"
      >
        <Modal.Header className="bg-slate-300  text-center">
          <p className="ml-3 mt-1 text-center">
            Attention ce choix est irréversible
          </p>
        </Modal.Header>
        <Modal.Body className="bg-slate-300 text-center">
          <div className="bg-slate-300 text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200">
              <img src={warning} alt="" />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Êtes vous sûr de vouloir supprimer votre compte de familink ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  setOpenModalDeleteUser(!openModalDeleteUser);
                  handleDeleteUser();
                }}
                color="failure"
              >
                Oui, j&apos;en suis sûr
              </Button>
              <Button
                onClick={() => setOpenModalDeleteUser(!openModalDeleteUser)}
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

export default ModalDeleteUser;
