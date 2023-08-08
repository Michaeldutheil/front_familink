import { useState, useEffect } from 'react';

import { Alert, Card } from 'flowbite-react';

import Agenda from '../Agenda/Agenda';
import Header from './Components/Header/Header';
import MessageBoard from './Components/MessageBoard/MessageBoard';
import Carrousel from './Components/Carrousel/Carrousel';
// import ListAndWeather from './Components/ListAndWeather/ListAndWeather';

import './home.css';
import accepter from '../../assets/Icon/accepter.png';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import List from '../List/List';
import { resetAlert } from '../../store/reducers/user';
import News from './Components/News/News';

function Home() {
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const { alert } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (alert && alert.type === 'success') {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(resetAlert());
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [dispatch, alert]);

  return (
    <main className="Home m-auto flex h-[100%] flex-col  gap-1">
      {showAlert && (
        <div className={`alert ${showAlert ? 'show' : ''}`}>
          <Alert color="success" className="p-6">
            <div className="flex">
              <img className="mr-5 w-5" src={accepter} alt="" />
              Connexion réussie
            </div>
          </Alert>
        </div>
      )}

      <Card
        className="border-none shadow-none"
        style={{ backgroundColor: '#e0dedb' }}
      >
        <Header />
      </Card>
      <Card
        className="border-none shadow-none"
        style={{ backgroundColor: '#e0dedb' }}
      >
        <News />
      </Card>
      <Card
        className="border-none shadow-none"
        style={{ backgroundColor: '#e0dedb' }}
      >
        <List />
      </Card>
      <Card
        className="border-none shadow-none"
        style={{ backgroundColor: '#e0dedb' }}
      >
        <Agenda isHomePage />
      </Card>
      <Card
        className="border-none shadow-none"
        style={{ backgroundColor: '#e0dedb' }}
      >
        <MessageBoard />
      </Card>

      <Card
        className="border-none shadow-none"
        style={{ backgroundColor: '#e0dedb' }}
      >
        <Carrousel />
      </Card>
    </main>
  );
}

export default Home;
