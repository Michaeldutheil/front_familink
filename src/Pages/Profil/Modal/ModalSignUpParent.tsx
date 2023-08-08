import { useState, useRef, useEffect } from 'react';
import validator from 'validator';
import {
  Modal,
  Button,
  Label,
  TextInput,
  Checkbox,
  Alert,
} from 'flowbite-react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { ModalSignUpPropsParent } from '../../../interface';
import { createUser } from '../../../store/reducers/user';

import ModalWarningEnfant from './ModalWarningFamily';

function ModalSignUpParent({
  setOpenSignUpModalParent,
  openSignUpModalParent,
}: ModalSignUpPropsParent) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { familyId } = useAppSelector((state) => state.user);

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordBeingTyped, setIsPasswordBeingTyped] = useState(false);
  const [openModalWarningFamily, setOpenModalWarningFamily] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [personne, setPersonne] = useState('');
  const [emailError, setEmailError] = useState('');
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      setConfirmPasswordError(' ne correspondent pas');
    } else if (confirmPassword.length > 0) {
      setConfirmPasswordError(' sont identiques');
    } else {
      setConfirmPasswordError('');
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    if (password.length < 8) {
      setPasswordError('doit comporter au moins 8 caractères');
    } else {
      setPasswordError('est correct');
    }
  }, [password]);

  useEffect(() => {
    if (email.length > 0 && !validator.isEmail(email)) {
      setEmailError("n'est pas valide");
    } else if (email.length > 0) {
      setEmailError('est valide');
    } else {
      setEmailError('');
    }
  }, [email]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const json = {
      email,
      password,
      passwordConfirmation: confirmPassword,
      first_name: prenom,
      last_name: nom,
      pseudo,
      role_id: 1,
      family_id: familyId,
    };

    dispatch(createUser(json))
      .unwrap()
      .then(() => {
        setOpenSignUpModalParent(false);
        setPersonne("d'un parent");
        setOpenModalWarningFamily(true);
        setPrenom('');
        setNom('');
        setPassword('');
        setConfirmPassword('');
        setShowAlert(false);
      })
      .catch((error) => {
        if (error.message === 'Already used email') {
          setShowAlert(true);
          setAlreadyExist(true);
        } else {
          setAlreadyExist(false);
          setShowAlert(true);
        }
      });
  };

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => setOpenSignUpModalParent(!openSignUpModalParent)}
        show={openSignUpModalParent}
        className="modal flex items-center justify-center bg-transparent backdrop-blur-sm"
      >
        <Modal.Body className="rounded bg-[#E0DEDB]">
          <div className="space-y-6">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                <div className="flex">
                  <span className="mr-1">Crée un compte </span>
                  <p className="mr-1 text-red-500">parent</p>
                  <span>supplémentaire </span>
                </div>
              </h3>
              <Button
                size="xs"
                className="hover:bg-gray-90 rounded-full bg-gray-800 font-medium text-white transition-all duration-300 hover:bg-slate-400 hover:text-familink-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setOpenSignUpModalParent(!openSignUpModalParent)}
              >
                X
              </Button>
            </section>

            {showAlert && (
              <Alert className="flex" color="failure" withBorderAccent>
                <span>
                  <p>
                    <div className="flex">
                      <span className="mr-3 font-medium">Attention !</span>
                      {alreadyExist ? (
                        <p>L&apos;email existe déjà sur familink ...</p>
                      ) : (
                        <p>
                          Une erreur s&apos;est produite lors de la création du
                          compte.
                        </p>
                      )}
                    </div>
                  </p>
                </span>
              </Alert>
            )}
            <form
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Pseudo" value="Son pseudo" />
                </div>
                <TextInput
                  id="pseudo_parent"
                  placeholder="Pseudo"
                  required
                  aria-label="choisir un pseudo"
                  onChange={(event) => setPseudo(event.target.value)}
                  value={pseudo}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstname" value="Son prénom" />
                </div>
                <TextInput
                  id="firstname_parent"
                  required
                  placeholder="Prénom"
                  aria-label="choisir un prénom"
                  onChange={(event) => setPrenom(event.target.value)}
                  value={prenom}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastname" value="Son nom" />
                </div>
                <TextInput
                  id="lastname_parent"
                  required
                  placeholder="Nom"
                  aria-label="choisir un nom"
                  onChange={(event) => setNom(event.target.value)}
                  value={nom}
                />
              </div>
              <div>
                <div className="mb-2 flex">
                  <Label htmlFor="email" value="Son Email" />
                  {emailError && (
                    <p
                      className={`ml-1 text-sm ${
                        emailError === "n'est pas valide" ? 'error' : 'success'
                      }`}
                    >
                      {emailError}
                    </p>
                  )}
                </div>
                <TextInput
                  id="email_parent"
                  required
                  autoComplete="username"
                  placeholder="Email"
                  aria-label="choisir un email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
              </div>
              <div>
                <div className="mb-2 flex">
                  <Label htmlFor="new-password" value="Son mot de passe" />
                  {isPasswordBeingTyped && passwordError && (
                    <p
                      className={`mt-1.2 ml-1  text-sm ${
                        password.length < 8
                          ? 'font-semibold text-familink-black '
                          : 'success'
                      }`}
                    >
                      {passwordError}
                    </p>
                  )}
                </div>
                <TextInput
                  id="password_parent"
                  required
                  placeholder={
                    !isPasswordBeingTyped
                      ? 'doit comporter au moins 8 caractères'
                      : ''
                  }
                  type="password"
                  autoComplete="new-password"
                  aria-label="choisir un mot de passe"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setIsPasswordBeingTyped(true);
                  }}
                  value={password}
                />
              </div>
              <div>
                <div className="mb-2 flex">
                  <Label
                    htmlFor="confirm-password"
                    value="Confirmer mot de passe"
                  />
                  {confirmPasswordError && (
                    <p
                      className={`ml-1 text-sm ${
                        confirmPassword !== password ? 'error' : 'success'
                      }`}
                    >
                      {confirmPasswordError}
                    </p>
                  )}
                </div>
                <TextInput
                  className="mb-4"
                  id="confirmPassword_parent"
                  required
                  placeholder={
                    !isPasswordBeingTyped
                      ? 'doit comporter au moins 8 caractères'
                      : ''
                  }
                  type="password"
                  autoComplete="new-password"
                  aria-label="confirmer votre mot de passe"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  value={confirmPassword}
                />
              </div>
              <div className=" mb-5 flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="consentement_parent"
                    required
                    className=" text-gray-800"
                  />
                  <Label htmlFor="consentement">
                    Je consens au Règlement Général sur la Protection des
                    Données FamiLink
                  </Label>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <Button
                  type="submit"
                  className="hover:bg-gray-90 mb-2 mr-2 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-slate-500 hover:text-familink-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Envoyer
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <ModalWarningEnfant
        setOpenModalWarningFamily={setOpenModalWarningFamily}
        openModalWarningFamily={openModalWarningFamily}
        setEmail={setEmail}
        setPseudo={setPseudo}
        email={email}
        pseudo={pseudo}
        personne={personne}
      />
    </div>
  );
}

export default ModalSignUpParent;
