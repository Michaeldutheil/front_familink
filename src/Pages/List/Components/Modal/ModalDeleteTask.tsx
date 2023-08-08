import { useRef } from 'react';
import { Button, Modal } from 'flowbite-react';
import { ModalDeleteTaskProps } from '../../../../interface';
import { useAppDispatch } from '../../../../hooks/redux';
import { deleteTask } from '../../../../store/reducers/lists';

import warning from '../../../../assets/Icon/attention.png';

function ModalDeleteTask({
  setOpenDeleteModalTask,
  openDeleteModalTask,
  listId,
  taskId,
}: ModalDeleteTaskProps) {
  const dispatch = useAppDispatch();
  const rootRef = useRef<HTMLDivElement>(null);
  const handleDelete = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(deleteTask({ taskId, listId }));
    setOpenDeleteModalTask(!openDeleteModalTask);
  };

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => setOpenDeleteModalTask(!openDeleteModalTask)}
        show={openDeleteModalTask}
        size="md"
        className="modal bg-transparent backdrop-blur-sm"
      >
        <Modal.Body className="text-centebg-slate-100/10">
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200">
              <img src={warning} alt="" />
            </div>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Êtes vous sûr de vouloir supprimer cette tâche ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={handleDelete} color="failure">
                Oui, j&apos;en suis sûr
              </Button>
              <Button
                onClick={() => setOpenDeleteModalTask(!openDeleteModalTask)}
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

export default ModalDeleteTask;
