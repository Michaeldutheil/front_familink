import { useState, useRef } from 'react';

import { Modal, Button, Label, TextInput } from 'flowbite-react';

import { ModalFamilyProps } from '../../../../interface';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { refreshUser } from '../../../../store/reducers/user';
import { updateFamily } from '../../../../store/reducers/family';

function ModalFamily({
  setOpenFamilyModal,
  openFamilyModal,
}: ModalFamilyProps) {
  const dispatch = useAppDispatch();

  const { userId, familyId, family } = useAppSelector((state) => state.user);

  const [newFamily, setNewFamily] = useState(`${family}`);

  const rootRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const json = {
      name: newFamily,
      familyId,
    };
    dispatch(updateFamily(json)).then(() => {
      dispatch(refreshUser(userId));
    });
    setOpenFamilyModal(false);
  };

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => setOpenFamilyModal(!openFamilyModal)}
        show={openFamilyModal}
        className="modal flex items-center justify-center bg-transparent backdrop-blur-sm"
      >
        <Modal.Body className="rounded bg-[#e0dedb]">
          <div className="space-y-6">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Modifier le nom de votre Famille
              </h3>
              <Button
                size="xs"
                className="hover:bg-gray-90 rounded-full bg-gray-800 font-medium text-white transition-all duration-300 hover:bg-slate-400 hover:text-familink-black  focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setOpenFamilyModal(!openFamilyModal)}
              >
                X
              </Button>
            </section>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="Famille"
                  value="
                Votre Famille"
                />
              </div>
              <TextInput
                id="pseudo_family"
                placeholder={family || ''}
                required
                aria-label="Modifier un pseudo"
                onChange={(event) => setNewFamily(event.target.value)}
                value={newFamily}
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

export default ModalFamily;
