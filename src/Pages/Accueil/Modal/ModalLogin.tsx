/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useState, useEffect, useRef, FormEvent } from 'react';

import {
  Modal,
  Button,
  Label,
  TextInput,
  Checkbox,
  Alert,
  Spinner,
} from 'flowbite-react';

import warning from '../../../assets/Icon/attention.png';
import success from '../../../assets/Icon/accepter.png';

import { login } from '../../../store/reducers/user';
import { ModalLoginProps } from '../../../interface';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

function ModalLogin({
  setOpenLoginModal,
  openLoginModal,
  setOpenSignUpModal,
  openSignUpModal,
  setOpenModalResetPassword,
  openModalResetPassword,
}: ModalLoginProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const [showAlertErrorLogin, setShowAlertErrorLogin] = useState(false);
  const [showAlertSuccessLogin, setShowAlertSuccessLogin] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { alert, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (alert && alert.type === 'error') {
      setShowAlertErrorLogin(true);
      const timer = setTimeout(() => {
        setShowAlertErrorLogin(false);
      }, 5000);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [alert]);

  useEffect(() => {
    if (alert && alert.type === 'success') {
      setShowAlertSuccessLogin(true);
      const timer = setTimeout(() => {
        setShowAlertSuccessLogin(false);
      }, 5000);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [alert]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(login(formData));
  };

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => {
          setOpenLoginModal(!openLoginModal);
        }}
        show={openLoginModal}
        className="modal flex items-center justify-center bg-transparent backdrop-blur-sm"
      >
        <Modal.Body className="rounded" style={{ backgroundColor: '#e0dedb' }}>
          <div className="space-y-6">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Bienvenue sur FamiLink
              </h3>

              <Button
                size="xs"
                className="hover:bg-gray-90 rounded-full bg-gray-800 font-medium text-white transition-all duration-300 hover:bg-slate-400 hover:text-familink-black  focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setOpenLoginModal(!openLoginModal)}
              >
                X
              </Button>
            </section>
            {showAlertErrorLogin && (
              <div className={`alert ${showAlertErrorLogin ? 'show' : ''}`}>
                <Alert color="failure" className="p-6">
                  <div className="flex">
                    <img className="mr-5 w-5" src={warning} alt="" />
                    {alert && alert.message}
                  </div>
                </Alert>
              </div>
            )}
            {showAlertSuccessLogin && (
              <Alert color="success" className="p-6">
                <div className="flex">
                  <img className="mr-5 w-5" src={warning} alt="" />
                  {alert && alert.message}
                </div>
              </Alert>
            )}
            {loading && (
              <div className={`alert ${loading ? 'show' : ''}`}>
                <Alert color="warning" className="p-6">
                  <div className="flex">
                    <Spinner
                      className="mr-5"
                      aria-label="Info spinner example"
                      color="warning"
                    />
                    En cours de chargement
                  </div>
                </Alert>
              </div>
            )}
            <form
              onSubmit={(event) => {
                handleSubmit(event);
                if (alert && alert.type === 'success') {
                  setOpenLoginModal(!openLoginModal);
                }
                if (rememberMe) {
                  // Stocker les informations d'identification dans le stockage du navigateur
                  localStorage.setItem('email', email);
                  localStorage.setItem('password', password);
                } else {
                  // Supprimer les informations d'identification précédemment enregistrées
                  localStorage.removeItem('email');
                  localStorage.removeItem('password');
                }
              }}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Votre email" />
                </div>
                <TextInput
                  name="email"
                  placeholder="email@email.fr"
                  autoComplete="username"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Votre mot de passe" />
                </div>
                <TextInput
                  name="password"
                  autoComplete="current-password"
                  required
                  type="password"
                  placeholder="*********"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <div className="mt-5 flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    className="text-gray-800"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <Label htmlFor="remember">Se Souvenir de moi</Label>
                </div>

                <div
                  tabIndex={0}
                  role="button"
                  className="text-sm text-familink-black underline hover:cursor-pointer hover:underline dark:text-cyan-500"
                  onClick={() =>
                    setOpenModalResetPassword(!openModalResetPassword)
                  }
                  onKeyDown={() => {
                    setOpenModalResetPassword(!openModalResetPassword);
                  }}
                >
                  Mot de passe oublié ?
                </div>
              </div>
              <div className="w-full ">
                <Button
                  type="submit"
                  className="hover:bg-gray-90 mb-2 mr-2 mt-5 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-slate-500 hover:text-familink-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Se connecter
                </Button>
              </div>
            </form>

            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              <p>Pas encore inscrit ?</p>
              <p
                onClick={() => {
                  setOpenLoginModal(!openLoginModal);
                  setOpenSignUpModal(!openSignUpModal);
                }}
                onKeyDown={() => {
                  setOpenLoginModal(!openLoginModal);
                  setOpenSignUpModal(!openSignUpModal);
                }}
                className="text-familink-black hover:cursor-pointer dark:text-cyan-500"
                role="button"
                aria-label="Créer un compte"
              >
                Créer un compte
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalLogin;
