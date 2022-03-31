import React from 'react';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import styles from './login.module.scss';

const Login = () => (
  <div className={styles.background}>
    <NavBar className="relative" isAuthenticated={false} />
    <div
      className={`block p-6 rounded-lg shadow-lg bg-white max-w-sm mb-[40px] lg:mb-[100px] mx-[auto] ${styles.loginForm}`}
    >
      <h2 className="font-medium leading-tight text-4xl mb-[40px] text-center">
        Inicia sesión
      </h2>
      <form>
        <div className="form-group mb-5">
          <input
            type="email"
            className="w-full form-control px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputEmail2"
            aria-describedby="emailHelp"
            placeholder="Email o número de teléfono"
          />
        </div>
        <div className="form-group mb-11">
          <input
            type="password"
            className="w-full form-control block px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputPassword2"
            placeholder="Contraseña"
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-2.5 mb-6 bg-blue-600 text-white text-base font-normal leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out border-none"
        >
          Iniciar sesión
        </button>
        <div className="flex justify-between items-center mb-7 flex-col md:flex-row">
          <div className="form-group form-check mb-2 md:mb-0">
            <input
              type="checkbox"
              className="form-check-input text-sm mt-0.5 h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-0 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
              id="exampleCheck2"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label
              className="form-check-label inline-block ml-1 md:ml-6 text-sm"
              htmlFor="exampleCheck2"
            >
              Recuérdame
            </label>
          </div>
          <p className="m-0 text-center text-sm">Necesitas ayuda?</p>
        </div>
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
            className="text-white text-sm hover:text-gray-300 focus:text-gray-400 transition duration-200 ease-in-out"
          >
            Suscríbete ya.
          </a>
        </p>
      </form>
    </div>
    <Footer className="pb-0 lg:pb-0" />
  </div>
);

export default Login;
