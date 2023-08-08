/* eslint-disable @typescript-eslint/no-redeclare */
import { useEffect, useState } from 'react';

import { Card, TextInput, Button, Dropdown, Alert } from 'flowbite-react';

import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  createFamily,
  assignUserToFamily,
  deleteFamily,
} from '../../store/reducers/family';

import ModalUser from './Modal/ModalUser';

import { refreshUser, resetAlert } from '../../store/reducers/user';

import crayon from '../../assets/Icon/crayon.png';
import familyIcon from '../../assets/Icon/famille.png';
import './profil.css';
import success from '../../assets/Icon/accepter.png';
import warning from '../../assets/Icon/page-derreur.png';

import ModalFamily from './Modal/ModalFamily';
import ModalSignUpParent from './Modal/ModalSignUpParent';
import ModalSignUpEnfant from './Modal/ModalSignUpEnfant';
import ModalDeleteFamily from './Modal/ModalDeleteList';

function Profil() {
  const [newOldFamily, setNewOldFamily] = useState('');
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const [openModalDeleteFamily, setOpenModalDeleteFamily] =
    useState<boolean>(false);
  const [openSignUpModalParent, setOpenSignUpModalParent] =
    useState<boolean>(false);
  const [openSignUpModalEnfant, setOpenSignUpModalEnfant] =
    useState<boolean>(false);
  const [openFamilyModal, setOpenFamilyModal] = useState<boolean>(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  const dispatch = useAppDispatch();

  const {
    family,
    familyId,
    pseudo,
    email,
    userId,
    firstName,
    lastName,
    role,
    alert,
  } = useAppSelector((state) => state.user);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const json = {
      name: newOldFamily,
    };
    dispatch(createFamily(json)).then((newFamily) => {
      if (newFamily.payload) {
        dispatch(
          assignUserToFamily({ userId, familyId: newFamily.payload.id })
        ).then(() => {
          dispatch(refreshUser(userId));
        });
      }
    });
    setNewOldFamily('');
  };

  useEffect(() => {
    if (alert) {
      setShowAlertSuccess(true);
      const timer = setTimeout(() => {
        setShowAlertSuccess(false);
        dispatch(resetAlert());
      }, 2500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [dispatch, alert]);

  const handleDelete = () => {
    dispatch(deleteFamily(userId)).then(() => {
      dispatch(refreshUser(userId));
    });
  };

  return (
    <Card className="mb-5 mt-5">
      <div className=" flex justify-end px-4 pt-4">
        {role !== 2 && familyId !== 1 && (
          <Dropdown inline label="Invitation">
            <Dropdown.Item
              onClick={() => setOpenSignUpModalParent(!openSignUpModalParent)}
            >
              Parent
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => setOpenSignUpModalEnfant(!openSignUpModalEnfant)}
            >
              Enfant
            </Dropdown.Item>
          </Dropdown>
        )}
      </div>
      <div className="flex flex-col items-center ">
        <h5 className="mb-1 flex text-xl  text-gray-900 dark:text-white">
          <p className="mr-2 font-medium">Pseudo: </p>
          <p className="mr-5 text-gray-500">{pseudo}</p>
          <div
            tabIndex={0}
            role="button"
            onClick={() => setOpenUserModal(!openUserModal)}
            onKeyDown={() => setOpenUserModal(!openUserModal)}
          >
            <img
              alt="modifier informations"
              aria-label="Modifier user"
              className="mt-1 w-5"
              src={crayon}
            />
          </div>
        </h5>
        <div className="flex">
          <span className="mr-5 flex text-sm text-gray-500 dark:text-gray-400">
            <p className="mr-2">prénom: </p> {firstName}
          </span>
          <span className="flex text-sm text-gray-500 dark:text-gray-400">
            <p className="mr-2">nom: </p> {lastName}
          </span>
        </div>
        <div className="flex">
          <span className="flex text-sm text-gray-500 dark:text-gray-400">
            <p className="mr-2">email: </p> {email}
          </span>
        </div>
        {family && (
          <span className="mt-5 flex text-sm text-gray-500 dark:text-gray-400">
            {family && (
              <span className="mr-5 mt-5 text-sm text-gray-500 dark:text-gray-400">
                {familyId === null || familyId === 1
                  ? 'Aucune famille'
                  : `FamiLink: ${family}`}
              </span>
            )}
            {familyId !== 1 && role !== 2 && (
              <div
                tabIndex={0}
                role="button"
                onClick={() => setOpenFamilyModal(!openUserModal)}
                onKeyDown={() => setOpenFamilyModal(!openUserModal)}
              >
                <img
                  alt="modifier crayon"
                  aria-label="Modifier user"
                  className="mt-4 w-5"
                  src={crayon}
                />
              </div>
            )}
          </span>
        )}

        <div className="mt-4 flex space-x-3 lg:mt-6">
          {role !== 2 &&
            (familyId === 1 ? (
              <div className="inline-flex items-center rounded-lg bg-familink-black px-4 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                <p className="mr-5">Créer une famille:</p>
                <TextInput
                  className="mr-5"
                  name="family"
                  placeholder="Nom de la famille"
                  autoComplete="family"
                  required
                  onChange={(event) => setNewOldFamily(event.target.value)}
                />

                <div
                  tabIndex={0}
                  role="button"
                  onClick={handleSubmit}
                  onKeyDown={handleSubmit}
                >
                  <img
                    src={familyIcon}
                    className="w-5 invert hover:cursor-pointer
                    "
                    alt="Crée Famille"
                  />
                </div>
              </div>
            ) : (
              family && (
                <Button
                  className="inline-flex items-center rounded-lg bg-familink-black px-4 py-2 text-center text-sm font-medium text-white hover:bg-red-500 hover:text-familink-black focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  onClick={() =>
                    setOpenModalDeleteFamily(!openModalDeleteFamily)
                  }
                >
                  <p>Supprimer mon compte de la famille {family}</p>
                </Button>
              )
            ))}
        </div>
      </div>
      <ModalUser
        setOpenUserModal={setOpenUserModal}
        openUserModal={openUserModal}
      />
      <ModalFamily
        setOpenFamilyModal={setOpenFamilyModal}
        openFamilyModal={openFamilyModal}
      />
      <ModalSignUpParent
        setOpenSignUpModalParent={setOpenSignUpModalParent}
        openSignUpModalParent={openSignUpModalParent}
      />
      <ModalSignUpEnfant
        setOpenSignUpModalEnfant={setOpenSignUpModalEnfant}
        openSignUpModalEnfant={openSignUpModalEnfant}
      />
      <ModalDeleteFamily
        setOpenModalDeleteFamily={setOpenModalDeleteFamily}
        openModalDeleteFamily={openModalDeleteFamily}
        handleDelete={handleDelete}
      />
      {showAlertSuccess && (
        <div className={`alert ${showAlertSuccess ? 'show' : ''}`}>
          {alert && alert.type === 'success' && (
            <Alert color="info" className="p-6">
              <div className="flex">
                <img className="mr-5 w-5" src={success} alt="" />
                {alert && alert.message}
              </div>
            </Alert>
          )}
          {alert && alert.type === 'error' && (
            <Alert color="failure" className="p-6">
              <div className="flex">
                <img className="mr-5 w-5" src={warning} alt="" />
                {alert && alert.message}
              </div>
            </Alert>
          )}
        </div>
      )}
    </Card>
  );
}

export default Profil;
