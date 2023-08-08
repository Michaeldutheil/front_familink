import { useState, useRef } from 'react';
import { Modal, Button, Label, TextInput } from 'flowbite-react';

import { ModalTaskProps } from '../../../../interface';

import { addTask } from '../../../../store/reducers/lists';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';

function ModalTask({
  setOpenTaskModal,
  openTaskModal,
  listId,
}: ModalTaskProps) {
  const [newTask, setNewTask] = useState('');
  const dispatch = useAppDispatch();

  const { userId } = useAppSelector((state) => state.user);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTask) {
      return;
    }

    const json = {
      title: '',
      content: newTask,
      state: 'false',
      user_id: userId,
      list_id: listId,
    };

    dispatch(addTask(json));
    setOpenTaskModal(false);
    setNewTask('');
  };

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => setOpenTaskModal(!openTaskModal)}
        show={openTaskModal}
        className="modal flex items-center justify-center bg-transparent backdrop-blur-sm" // Ajoutez cet attribut
      >
        <Modal.Body className="rounded bg-slate-100/10">
          <div className="space-y-6">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Ajouter une tâche
              </h3>
              <Button
                size="xs"
                className="hover:bg-gray-90 rounded-full bg-gray-800 font-medium text-white transition-all duration-300 hover:bg-slate-400 hover:text-familink-black  focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setOpenTaskModal(!openTaskModal)}
              >
                X
              </Button>
            </section>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Titre" />
              </div>

              <TextInput
                id="title"
                placeholder="titre"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
              />
            </div>

            <div className="flex w-full justify-center ">
              <Button
                className="hover:bg-gray-90 mb-2 mr-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-slate-500 hover:text-familink-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={handleSubmit}
                disabled={!newTask}
              >
                Créer
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalTask;
