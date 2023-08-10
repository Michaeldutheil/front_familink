import { Link } from 'react-router-dom';

/* import logo from '../../../assets/logo.png'; */
import { useAppSelector } from '../../../../hooks/redux';

import './header.scss';

function Header() {
  const { pseudo, family, familyId } = useAppSelector((state) => state.user);

  return (
    <h3 className="mx-auto my-5 flex w-full items-center">
      <span className="h-1 flex-grow rounded bg-black/20" />
      <header className="bg-journal-bg mx-3 flex flex-col items-center">
        {/* <img src={logo} alt="Logo" className="invert" /> */}
        {familyId === null || familyId === 1 ? (
          <div className="bg-journal-bg">
            <h1 className="mb-5 text-3xl">
              Bienvenue {pseudo} dans le mode <b>Démo</b>
            </h1>
            <p className="text-1xl mb-5  text-center">
              Cliquez
              <Link className="ml-1 mr-1 text-red-500" to="/profil">
                ici
              </Link>
              pour crée une famille
            </p>
          </div>
        ) : (
          family && (
            <h1 className="bg-journal-bg  text-center  font-journal text-3xl uppercase">
              Bienvenue <b>{pseudo}</b> dans votre familink <b>{family}</b>
            </h1>
          )
        )}
      </header>
      <span className="h-1 flex-grow rounded bg-black/20" />
    </h3>
  );
}

export default Header;
