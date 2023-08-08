/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { useState, useEffect, useRef } from 'react';

import { Modal, Button, Label, TextInput } from 'flowbite-react';

import { resetPassword } from '../../../store/reducers/user';
import { ModalResetPasswordProps } from '../../../interface';
import { useAppDispatch } from '../../../hooks/redux';

function ModalResetPassword({
  setOpenModalResetPassword,
  openModalResetPassword,
}: ModalResetPasswordProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = () => {
    const jsonData = { email };
    dispatch(resetPassword(jsonData));
    setOpenModalResetPassword(false);
  };

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        onClose={() => {
          setOpenModalResetPassword(false);
        }}
        show={openModalResetPassword}
        className="modal flex items-center justify-center bg-transparent backdrop-blur-sm"
      >
        <Modal.Body className="rounded" style={{ backgroundColor: '#e0dedb' }}>
          <div className="space-y-6">
            <section className="flex justify-between">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Réinitialiser mon mot de passe
              </h3>

              <Button
                size="xs"
                className="hover:bg-gray-90 rounded-full bg-gray-800 font-medium text-white transition-all duration-300 hover:bg-slate-400 hover:text-familink-black  focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={() =>
                  setOpenModalResetPassword(!openModalResetPassword)
                }
              >
                X
              </Button>
            </section>

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

            <div className="w-full ">
              <Button
                className="hover:bg-gray-90 mb-2 mr-2 mt-5 rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-slate-500 hover:text-familink-black focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                onClick={handleSubmit}
              >
                Réinitialiser mon mot de passe
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalResetPassword;
