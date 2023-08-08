import { useRef } from 'react';
import { Button, Modal } from 'flowbite-react';
import { ModalDeleteListProps } from '../../../interface';

import warning from '../../../assets/Icon/attention.png';
import { useAppDispatch } from '../../../hooks/redux';
import { deleteList } from '../../../store/reducers/lists';

function ModalDeleteList({
  setOpenDeleteModalList,
  openDeleteModalList,
  listId,
}: ModalDeleteListProps) {
  const dispatch = useAppDispatch();
  const rootRef = useRef<HTMLDivElement>(null);

  const handleDelete = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(deleteList(listId));
    setOpenDeleteModalList(!openDeleteModalList);
  };

  return (
    <div ref={rootRef}>
      <Modal
        className="modal bg-transparent backdrop-blur-sm"
        root={rootRef.current ?? undefined}
        onClose={() => setOpenDeleteModalList(!openDeleteModalList)}
        show={openDeleteModalList}
        size="md"
      >
        <Modal.Body>
          <div className=" text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200">
              <img src={warning} alt="" />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Êtes vous sûr de vouloir supprimer cette liste ainsi que toutes
              ses tâches ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDelete} color="failure">
                Oui, j&apos;en suis sûr
              </Button>
              <Button
                onClick={() => setOpenDeleteModalList(!openDeleteModalList)}
                color="gray"
                className="bg-familink-black hover:text-slate-400"
              >
                Non, revenir en arrière
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalDeleteList;
