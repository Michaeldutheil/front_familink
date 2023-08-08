/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { Avatar, Dropdown, Navbar } from 'flowbite-react';

import { Link, Navigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../../hooks/redux';

import { logout } from '../../../store/reducers/user';
import { logoutList } from '../../../store/reducers/lists';
import { logoutPicture } from '../../../store/reducers/picture';

import mockup from '../../../assets/Logo/logo.png';
import love from '../../../assets/Avatar/love.png';

const pages = [
  { name: 'Home', path: '/home' },
  { name: 'Agenda', path: '/agenda' },
  { name: 'Liste', path: '/list' },
  { name: 'Photos', path: '/pictures' },
];

function NavbarComponent() {
  const { pseudo, email, familyId } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutList());
    dispatch(logoutPicture());
  };

  const handleDisconnect = () => {
    <Navigate to="/home" />;
  };

  return (
    <Navbar
      rounded
      className="flex w-full font-journal"
      style={{ backgroundColor: '#e0dedb' }}
    >
      <Navbar.Brand as={Link} to="/home">
        <img alt="Logo" className="mr-3 h-6 sm:h-9" src={mockup} />
      </Navbar.Brand>
      <div className="flex  md:order-1">
        <Dropdown
          className="bg-gray-200"
          inline
          label={<Avatar alt="User settings" img={love} rounded />}
        >
          <Dropdown.Header className="flex flex-col gap-1">
            <span className="text-center uppercase">{pseudo}</span>
            <span className="">{email}</span>
          </Dropdown.Header>
          <Link to="/profil">
            <Dropdown.Item>
              {' '}
              <p className="">Profil</p>
            </Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <button
            className="w-full"
            type="button"
            onClick={() => {
              handleLogout();
              handleDisconnect();
            }}
            onKeyDown={handleLogout}
          >
            <Dropdown.Item>
              <p className="" aria-label="Se Déconnecter">
                Se Déconnecter
              </p>
            </Dropdown.Item>
          </button>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="flex-2">
        {pages.map(
          (page) =>
            familyId !== 1 && (
              <Link key={page.name} to={page.path}>
                <p className="text-l relative box-content px-5 py-3 text-center font-journal font-semibold uppercase  transition-all duration-1000  hover:bg-black/80 hover:text-white hover:outline hover:outline-black">
                  <span className="absolute inset-0 hover:border-2 hover:border-white" />
                  {page.name}
                </p>
              </Link>
            )
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
