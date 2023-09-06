import React from 'react';
import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './index.scss';

import App from './App/App';
import Accueil from './Pages/Accueil/Accueil';
import Error from './Pages/Error/Error';
import Home from './Pages/Home/Home';
import Agenda from './Pages/Agenda/Agenda';
import Pictures from './Pages/Pictures/Pictures';
import Profil from './Pages/Profil/Profil';
import List from './Pages/List/List';
import Contact from './Pages/Contact/Contact';
import PrivacyPolicy from './Pages/PrivacyPolicy/PrivacyPolicy';
import About from './Pages/About/About';

import store from './store';
import ResetMail from './Pages/ResetMail/ResetMail';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/reset-password"
        element={<ResetMail />}
        errorElement={<Error />}
      />

      <Route path="/" element={<App />} errorElement={<Error />}>
        <Route errorElement={<Error />}>
          <Route index element={<Accueil />} />
          <Route path="/home" element={<Home />} />
          <Route path="/agenda" element={<Agenda isHomePage={undefined} />} />
          <Route path="/pictures" element={<Pictures />} />
          <Route path="/list" element={<List />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Route>
    </>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
