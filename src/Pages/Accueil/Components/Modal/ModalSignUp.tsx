import { useState, useRef, useEffect } from 'react';
import {
  Modal,
  Button,
  Label,
  TextInput,
  Checkbox,
  Alert,
} from 'flowbite-react';

import validator from 'validator';

import { useAppDispatch } from '../../../../hooks/redux';
import { createUser } from '../../../../store/reducers/user';
import { ModalSignUpProps } from '../../../../interface';

import ModalPrivacyPolicy from './ModalPrivacyPolicy';

function ModalSignUp({
  setOpenSignUpModal,
  openSignUpModal,
  setAlertMessageAccueil,
}: ModalSignUpProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [openModalPrivacy, setOpenModalPrivacy] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordBeingTyped, setIsPasswordBeingTyped] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (confirmPassword.length > 0 && confirmPassword !== password) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
    } else if (confirmPassword.length > 0) {
      setConfirmPasswordError('Les mots de passe sont identiques');
    } else {
      setConfirmPasswordError('');
    }
  }, [confirmPassword, password]);

  useEffect(() => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;

    if (password.length < 8 || !password.match(passwordRegex)) {
      setPasswordError(
        'doit comporter au moins 8 caractères, une majuscule et un caractère spécial'
      );
    } else {
      setPasswordError('Le mot de passe est correct');
    }
  }, [password]);

  useEffect(() => {
    if (email.length > 0 && !validator.isEmail(email)) {
      setEmailError('email invalide');
    } else if (email.length > 3 && validator.isEmail(email)) {
      setEmailError('email valide');
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
      family_id: 1,
    };

    dispatch(createUser(json))
      .unwrap()
      .then(() => {
        setOpenSignUpModal(false);
        setEmail('');
        setPseudo('');
        setPrenom('');
        setNom('');
        setPassword('');
        setConfirmPassword('');
        setAlertMessageAccueil(true);
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
        onClose={() => setOpenSignUpModal(!openSignUpModal)}
        show={openSignUpModal}
        className="modal flex items-center justify-center bg-transparent backdrop-blur-sm"
      >
        <Modal.Body className="rounded" style={{ backgroundColor: '#e0dedb' }}>
          <div className="space-y-6">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Rejoindre la FamiLink
              </h3>
              <Button
                size="xs"
                className="hover:bg-gray-90 rounded-full bg-gray-800 font-medium text-white transition-all duration-300 hover:bg-slate-400 hover:text-familink-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setOpenSignUpModal(!openSignUpModal)}
              >
                X
              </Button>
            </section>
            {showAlert && (
              <Alert className="flex" color="failure" withBorderAccent>
                <div>
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
                </div>
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="Pseudo" value="Votre pseudo" />
                </div>
                <TextInput
                  id="pseudo"
                  placeholder="Pseudo"
                  required
                  aria-label="choisir un pseudo"
                  onChange={(event) => setPseudo(event.target.value)}
                  value={pseudo}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="firstname" value="Votre prénom" />
                </div>
                <TextInput
                  id="firstname"
                  required
                  placeholder="Prénom"
                  aria-label="choisir un prénom"
                  onChange={(event) => setPrenom(event.target.value)}
                  value={prenom}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="lastname" value="Votre nom" />
                </div>
                <TextInput
                  id="lastname"
                  required
                  placeholder="Nom"
                  aria-label="choisir un nom"
                  onChange={(event) => setNom(event.target.value)}
                  value={nom}
                />
              </div>
              <div>
                <div className="mb-2 flex">
                  <Label htmlFor="email" value="Votre Email" />
                  {emailError && (
                    <p
                      className={`ml-1 text-sm ${
                        emailError === 'email invalide' ? 'error' : 'success'
                      }`}
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                <TextInput
                  id="email"
                  required
                  autoComplete="username"
                  placeholder="Email"
                  aria-label="choisir un email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
              </div>
              <div>
                <div className="mb-2 mt-1  flex">
                  <Label htmlFor="new-password" value="Votre mot de passe" />
                  {isPasswordBeingTyped && passwordError && (
                    <p
                      className={`ml-1 mt-1 text-xs ${
                        password.length < 8 ||
                        !password.match(
                          /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/
                        )
                          ? 'font-semibold text-red-600'
                          : 'font-semibold text-green-600'
                      }`}
                    >
                      {passwordError}
                    </p>
                  )}
                </div>

                <TextInput
                  id="password"
                  required
                  placeholder={
                    !isPasswordBeingTyped
                      ? 'doit comporter au moins 8 caractères, une majuscule et un caractère spécial'
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
                  id="confirmPassword"
                  required
                  placeholder={
                    !isPasswordBeingTyped
                      ? 'doit comporter au moins 8 caractères, une majuscule et un caractère spécial'
                      : ''
                  }
                  type="password"
                  autoComplete="new-password"
                  aria-label="confirmer votre mot de passe"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  value={confirmPassword}
                />
              </div>
              <div className="mb-5 flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="consentement"
                    required
                    className="text-gray-800"
                  />
                  <Label className="" htmlFor="consentement">
                    J'ai lu et j'accepte les conditions générales d'utilisation
                    de FamiLink
                  </Label>{' '}
                  <span
                    className="cursor-pointer text-blue-700 text-familink-black"
                    onClick={() => {
                      setOpenModalPrivacy(!openModalPrivacy);
                      setOpenSignUpModal(false);
                    }}
                    onKeyDown={() => setOpenModalPrivacy(!openModalPrivacy)}
                    role="button"
                    tabIndex={0}
                  >
                    (Lire les CGU)
                  </span>
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
      <ModalPrivacyPolicy
        openModalPrivacy={openModalPrivacy}
        setOpenModalPrivacy={setOpenModalPrivacy}
        openSignUpModal={openSignUpModal}
        setOpenSignUpModal={setOpenSignUpModal}
      />
    </div>
  );
}

export default ModalSignUp;
