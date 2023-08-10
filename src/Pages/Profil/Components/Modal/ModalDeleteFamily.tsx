import { useRef } from 'react';
import { Button, Modal } from 'flowbite-react';
import { ModalDeleteFamilyProps } from '../../../../interface';

import warning from '../../../../assets/Icon/attention.png';

function ModalDeleteFamily({
  setOpenModalDeleteFamily,
  openModalDeleteFamily,
  handleDelete,
}: ModalDeleteFamilyProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={rootRef}>
      <Modal
        className="modal bg-transparent backdrop-blur-sm"
        root={rootRef.current ?? undefined}
        onClose={() => setOpenModalDeleteFamily(!openModalDeleteFamily)}
        show={openModalDeleteFamily}
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
              Êtes vous sûr de vouloir supprimer votre compte de votre famille ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  setOpenModalDeleteFamily(!openModalDeleteFamily);
                  handleDelete();
                }}
                color="failure"
              >
                Oui, j&apos;en suis sûr
              </Button>
              <Button
                onClick={() => setOpenModalDeleteFamily(!openModalDeleteFamily)}
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

export default ModalDeleteFamily;
