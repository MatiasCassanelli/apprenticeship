import React, { useEffect } from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import styles from './login.module.scss';
import { getAuthToken } from '../../services/user';
import useQueryParams from '../../hooks/useQueryParams';
import useAuth from '../../hooks/useAuth';

const Login = ({ redirected }) => {
  const query = useQueryParams();
  const approved = query.get('approved');
  const requestToken = query.get('request_token');
  const { signIn, isAuthenticated, signOut } = useAuth();

  useEffect(() => {
    if (redirected && approved === 'true') {
      const expires = new Date();
      expires.setTime(expires.getTime() + 60 * 60 * 1000);
      document.cookie = `reqToken=${requestToken}; expires=${expires.toUTCString()}; path=/`;
      signIn(requestToken);
    }
  }, [redirected]);

  return (
    <div className={styles.background}>
      <NavBar className="relative" />
      <div
        className={`block p-6 rounded-lg shadow-lg bg-white max-w-sm mb-[40px] lg:mb-[100px] mx-[auto] ${styles.loginForm}`}
      >
        <h2 className="font-medium leading-tight text-4xl mb-[40px] text-center">
          {isAuthenticated ? 'Sesión iniciada' : 'Inicia sesión'}
        </h2>
        <div>
          {isAuthenticated ? (
            <button
              onClick={signOut}
              type="button"
              className="w-full px-6 py-2.5 mb-6 bg-blue-600 text-white text-base font-normal leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out border-none"
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              onClick={getAuthToken}
              type="button"
              className="w-full px-6 py-2.5 mb-6 bg-blue-600 text-white text-base font-normal leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out border-none"
            >
              Iniciar sesión
            </button>
          )}
          <Link to="/">
            <div className="flex justify-center items-center mb-7 flex-col md:flex-row">
              <p className="m-0 text-center text-sm">Volver a Home</p>
            </div>
          </Link>
          <div className="text-white text-sm hover:text-gray-300 focus:text-gray-400 transition duration-200 ease-in-out flex justify-center mb-10 mt-10">
            <img
              src="/images/facebook.png"
              alt="facebook icon"
              className="mr-3"
            />
            Iniciar sesión con Facebook
          </div>
          <p className="text-center text-sm">
            ¿Primera vez en Movy?
            <a
              href="#!"
              className="text-white text-sm hover:text-gray-300 focus:text-gray-400 transition duration-200 ease-in-out ml-0.5"
            >
              Suscríbete ya.
            </a>
          </p>
        </div>
      </div>
      <Footer className="pb-0 lg:pb-0" />
    </div>
  );
};

export default Login;

Login.propTypes = {
  redirected: T.bool,
};

Login.defaultProps = {
  redirected: false,
};
