import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { allCategory, fetchLists } from '../store/reducers/lists';
import { fetchPictures, fetchComments } from '../store/reducers/picture';

import NavbarComponent from './Components/Navbar/NavbarComponent';
import Accueil from '../Pages/Accueil/Accueil';
import FooterHome from './Components/Footer/Footer';
import { fetchMessage } from '../store/reducers/message';
import { fetchAgenda } from '../store/reducers/agenda';

function App() {
  const dispatch = useAppDispatch();
  const { familyId } = useAppSelector((state) => state.user);
  const { logged: isLogged } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchLists(familyId));
    }
  }, [dispatch, familyId, isLogged]);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchPictures(familyId));
    }
  }, [dispatch, familyId, isLogged]);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchComments(familyId));
    }
  }, [dispatch, familyId, isLogged]);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchMessage(familyId));
    }
  }, [dispatch, familyId, isLogged]);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchAgenda(familyId));
    }
  }, [dispatch, familyId, isLogged]);

  useEffect(() => {
    if (isLogged) {
      dispatch(allCategory());
    }
  }, [dispatch, isLogged]);

  const body = isLogged ? (
    <div className="m-auto flex min-h-screen flex-col justify-between bg-[#e0dedb] p-4 text-black md:w-[80%] lg:w-3/6">
      <div>
        <NavbarComponent />
        <Outlet />
      </div>

      <FooterHome />
    </div>
  ) : (
    <main className="flex justify-center" style={{ height: '100vh' }}>
      <Accueil />
      <Navigate to="/" />
    </main>
  );

  return body;
}

export default App;
