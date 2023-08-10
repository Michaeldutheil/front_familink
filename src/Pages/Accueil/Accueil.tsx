import { useState, useEffect } from 'react';

import { Button, Alert } from 'flowbite-react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../hooks/redux';

import Mockup from './Mockup';
import ModalLogin from './Components/Modal/ModalLogin';
import ModalSignUp from './Components/Modal/ModalSignUp';
import ModalResetPassword from './Components/Modal/ModalResetPassword';

import Cookies from '../../App/Components/Cookies/Cookies';
import success from '../../assets/Icon/accepter.png';

import './accueil.scss';

function Accueil() {
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false);
  const [openSignUpModal, setOpenSignUpModal] = useState<boolean>(false);
  const [openModalResetPassword, setOpenModalResetPassword] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [alertMessageAccueil, setAlertMessageAccueil] = useState(false);

  const { logged: isLogged } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (alertMessageAccueil === true) {
      setShowAlertSuccess(true);
      const timer = setTimeout(() => {
        setShowAlertSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [alertMessageAccueil]);

  return (
    <>
      {!isLogged && (
        <div className="flex flex-wrap items-center justify-center">
          <div className="flex w-1/2 flex-col gap-2">
            <h1 className="mb-6 text-center text-3xl font-bold text-familink-black">
              Nous sommes FamiLink
            </h1>
            <div className="flex justify-center text-center">
              <Button
                className="hover:bg-gray-90 hover:bg-slate-600git mb-2 mr-2 w-fit whitespace-nowrap rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-black  focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setOpenLoginModal(!openLoginModal)}
              >
                Se connecter
              </Button>

              <Button
                className="mb-2 mr-2 w-fit whitespace-nowrap rounded-full bg-slate-600 px-5 py-2.5 text-sm font-medium text-familink-black transition-all duration-300 hover:bg-gray-800 hover:text-white focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() => setOpenSignUpModal(!openSignUpModal)}
              >
                <span className="grayscale">S&apos;inscrire</span>
              </Button>
            </div>
          </div>
          <Mockup />
          {showAlertSuccess && (
            <div className={`alert ${showAlertSuccess ? 'show' : ''}`}>
              <Alert color="info" className="p-6">
                <div className="flex">
                  <img className="mr-5 w-5" src={success} alt="" />
                  Inscription réussie ! Pensez à valider votre email pour
                  pouvoir vous connecter.
                </div>
              </Alert>
            </div>
          )}
        </div>
      )}

      {isLogged && <Navigate to="/home" />}

      {/* Gere l'ouverture des modals sur l'Accueil */}
      <ModalLogin
        setOpenLoginModal={setOpenLoginModal}
        openLoginModal={openLoginModal}
        setOpenSignUpModal={setOpenSignUpModal}
        openSignUpModal={openSignUpModal}
        openModalResetPassword={openModalResetPassword}
        setOpenModalResetPassword={setOpenModalResetPassword}
      />
      <ModalSignUp
        setOpenSignUpModal={setOpenSignUpModal}
        openSignUpModal={openSignUpModal}
        setOpenLoginModal={setOpenLoginModal}
        openLoginModal={openLoginModal}
        setAlertMessageAccueil={setAlertMessageAccueil}
      />
      <ModalResetPassword
        openModalResetPassword={openModalResetPassword}
        setOpenModalResetPassword={setOpenModalResetPassword}
      />
      <Cookies />
    </>
  );
}

export default Accueil;
