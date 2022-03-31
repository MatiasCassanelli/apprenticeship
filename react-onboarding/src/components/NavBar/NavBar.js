import React from 'react';
import T from 'prop-types';
import 'tw-elements';
import './navBar.scss';
import { Link } from 'react-router-dom';

const NavBar = ({ className, isAuthenticated }) => (
  <nav
    className={`${className} nav-bar absolute w-full flex flex-wrap items-center justify-between py-3 text-gray-200 navbar navbar-expand-lg`}
  >
    <div className="container-fluid w-full flex flex-wrap items-center justify-between">
      {isAuthenticated ? (
        <>
          <button
            className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapse-menu"
            aria-controls="collapse-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className="w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              />
            </svg>
          </button>
          <div className="logo order-1">
            <div className="oval" />
            Movy
          </div>
          <div
            className="collapse navbar-collapse flex-grow items-center order-3 lg:oder-2"
            id="collapse-menu"
          >
            <ul className="navbar-nav flex flex-col pl-0 list-style-none my-0 mr-auto pt-1.5 gap-4">
              <Link to="/">
                <li className="nav-item">Home</li>
              </Link>
              <li className="nav-item">Movies</li>
              <li className="nav-item">Series</li>
              <li className="nav-item">Recently Added</li>
              <li className="nav-item">My List</li>
            </ul>
          </div>
          <div className="profile-menu order-2 lg:order-3">
            <img id="search" src="/images/search.png" alt="" />
            <img
              id="profile"
              src="/images/profile-image.png"
              alt=""
              className="border border-solid border-[#0578FF] rounded-full"
            />
            <img id="arrow" src="/images/arrow-down-filled.png" alt="" />
          </div>
        </>
      ) : (
        <>
          <div className="logo flex-1">
            <div className="oval" />
            <Link to="/" className="text-white movy">
              Movy
            </Link>
          </div>
          <div className="text-white text-sm">Register</div>
          <button
            type="button"
            className="px-5 py-0.5 ml-4 bg-blue-600 text-white text-sm leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out border-none"
          >
            Login
          </button>
        </>
      )}
    </div>
  </nav>
);

export default NavBar;

NavBar.propTypes = {
  className: T.string,
  isAuthenticated: T.bool,
};

NavBar.defaultProps = {
  className: '',
  isAuthenticated: true,
};
