import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { confirmResetPassword } from '../../store/reducers/user';
import { useAppDispatch } from '../../hooks/redux';

import logo from '../../assets/Logo/logo.png';

function ResetMail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const location = useLocation();
  const handleSubmit = () => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    const decodedToken: any = jwtDecode(token as string);
    const { userId } = decodedToken.data;
    const jsonData = {
      password,
      passwordConfirmation: confirmPassword,
      userId,
    };
    dispatch(confirmResetPassword(jsonData));
    navigate('/');
  };

  return (
    <div className="ResetMail flex h-[100vh] flex-col items-center justify-center bg-[#E0DEDB]">
      <img src={logo} alt="logo" className="w-72 " />
      <div className="align-middle">
        <h2 className="mb-10 text-center text-familink-black">
          Changez votre mot de passe
        </h2>
        <div className="mb-2 block text-center">
          <Label
            className="text-familink-black"
            htmlFor="password"
            value="Votre mot de passe"
          />
          <TextInput
            className="rounded-lg border border-familink-black text-familink-black"
            name="password"
            autoComplete="current-password"
            required
            type="password"
            placeholder="*********"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="mb-2 block text-center">
          <Label
            className="text-familink-black"
            htmlFor="confirm-password"
            value="Confirmer mot de passe"
          />
          <TextInput
            className="rounded-lg border border-familink-black text-familink-black"
            id="confirmPassword"
            required
            placeholder="*********"
            type="password"
            autoComplete="new-password"
            aria-label="confirmer votre mot de passe"
            onChange={(event) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
          />{' '}
        </div>
        <div className="mt-5 flex justify-center">
          <Button
            onClick={handleSubmit}
            className="bg-familink-black text-white hover:bg-slate-600"
          >
            <div className="">Réinitialiser son mot de passe</div>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResetMail;
