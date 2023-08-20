import { useState, useRef } from 'react';

import { Modal, Button, Label, TextInput, Select } from 'flowbite-react';

import { ModalListProps } from '../../../../interface';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { postLists } from '../../../../store/reducers/lists';

function ModalList({ setOpenListModal, openListModal }: ModalListProps) {
  const dispatch = useAppDispatch();
  const rootRef = useRef<HTMLDivElement>(null);

  const [newList, setNewList] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const { userId } = useAppSelector((state) => state.user);
  const { category } = useAppSelector((state) => state.lists);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newList || !newCategory) {
      return;
    }
    const json = {
      title: newList,
      category_id: Number(newCategory),
      user_id: userId,
    };
    dispatch(postLists(json));
    setOpenListModal(false);
    setNewList('');
  };

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => setOpenListModal(!openListModal)}
        show={openListModal}
        className="flex items-center justify-center"
      >
        <Modal.Body className="rounded bg-slate-100/10">
          <div className="space-y-6">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Ajouter une liste
              </h3>
              <Button
                size="xs"
                className="hover:bg-gray-90 rounded-full bg-gray-800 font-medium text-white transition-all duration-300 hover:bg-slate-400 hover:text-familink-black  focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setOpenListModal(!openListModal)}
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
                required
                aria-label="Choisir un titre"
                onChange={(event) => setNewList(event.target.value)}
                value={newList}
              />
            </div>
            <div className="max-w-md" id="select">
              <div className="mb-2 block">
                <Label htmlFor="categories" value="Choisir une catégorie" />
              </div>
              <Select
                id="categories"
                required
                aria-label="choisir sa catégorie"
                onChange={(event) => setNewCategory(event.target.value)}
                value={newCategory}
              >
                <option defaultValue="2">
                  Veuillez sélectionner une catégorie
                </option>
                {category &&
                  category.map((catégorie) => (
                    <option key={catégorie.id} value={catégorie.id}>
                      {catégorie.name}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="flex w-full justify-center ">
              <Button
                className="hover:bg-gray-90 mb-2 mr-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-slate-500 hover:text-familink-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={handleSubmit}
                aria-label="Ajouter une liste"
                disabled={!newList || !newCategory}
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

export default ModalList;
