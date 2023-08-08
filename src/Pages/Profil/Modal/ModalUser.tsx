import { useState, useRef, useEffect } from 'react';

import { Modal, Button, Label, TextInput } from 'flowbite-react';

import { ModalUserProps } from '../../../interface';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { updateUser, refreshUser } from '../../../store/reducers/user';

function ModalUser({ setOpenUserModal, openUserModal }: ModalUserProps) {
  const dispatch = useAppDispatch();

  const { userId, pseudo, firstName, lastName } = useAppSelector(
    (state) => state.user
  );

  const [newPseudo, setNewPseudo] = useState(`${pseudo}`);
  const [newFirstName, setNewFirstName] = useState(`${firstName}`);
  const [newLastName, setNewLastName] = useState(`${lastName}`);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (newPseudo && newFirstName && newLastName) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [newPseudo, newFirstName, newLastName]);

  const handleSubmit = (event: React.FormEvent) => {
    if (isSubmitDisabled === false) {
      event.preventDefault();
      const json = {
        pseudo: newPseudo,
        first_name: newFirstName,
        last_name: newLastName,
        userId,
      };
      dispatch(updateUser(json)).then(() => {
        dispatch(refreshUser(userId));
      });
      setOpenUserModal(false);
    }
  };

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => setOpenUserModal(!openUserModal)}
        show={openUserModal}
        className="modal flex items-center justify-center bg-transparent backdrop-blur-sm"
      >
        <Modal.Body className="rounded bg-[#E0DEDB]">
          <div className="space-y-6">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Modifier vos informations
              </h3>
              <Button
                size="xs"
                className="hover:bg-gray-90 rounded-full bg-gray-800 font-medium text-white transition-all duration-300 hover:bg-slate-400 hover:text-familink-black  focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setOpenUserModal(!openUserModal)}
              >
                X
              </Button>
            </section>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="pseudo"
                  value="
                Votre pseudo"
                />
              </div>
              <TextInput
                id="pseudo_user"
                placeholder="ne peut pas être vide"
                required
                aria-label="Modifier un pseudo"
                onChange={(event) => setNewPseudo(event.target.value)}
                value={newPseudo}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="prénom" value="Votre prénom" />
              </div>
              <TextInput
                id="prénom_user"
                placeholder="ne peut pas être vide"
                required
                aria-label="Modifier un prénom"
                onChange={(event) => setNewFirstName(event.target.value)}
                value={newFirstName}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nom" value="Votre nom" />
              </div>
              <TextInput
                id="nom_user"
                placeholder="ne peut pas être vide"
                required
                aria-label="Modifier un nom"
                onChange={(event) => setNewLastName(event.target.value)}
                value={newLastName}
              />
            </div>
            <div className="flex w-full justify-center ">
              <Button
                className="hover:bg-gray-90 mb-2 mr-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-slate-500 hover:text-familink-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={handleSubmit}
                aria-label="Ajouter une liste"
              >
                Modifier
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalUser;
