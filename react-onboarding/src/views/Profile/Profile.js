/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import useAuth from '../../hooks/useAuth';
import getImageUrl from '../../utils/getImageUrl';
import './profile.scss';

const Profile = () => {
  const { userDetails, updateUserDetails } = useAuth();
  const [name, setName] = useState(userDetails?.name);
  const [language, setLanguage] = useState(userDetails?.language);
  const [isKid, setIsKid] = useState(userDetails?.isKid);
  const [allowedContent, setAllowedContent] = useState(
    userDetails?.allowedContent,
  );
  const [savedClassName, setSavedClassName] = useState('border-[#0578ff]');
  const navigate = useNavigate();

  const saveForm = () => {
    setSavedClassName('border-green-500');
    updateUserDetails({
      allowedContent,
      language,
      name,
      isKid,
    });
    setTimeout(() => {
      setSavedClassName('border-[#0578ff]');
    }, 1000);
  };

  const getProfileImage = () => {
    if (userDetails?.avatar?.tmdb?.avatar_path) {
      return (
        <img
          src={getImageUrl(userDetails?.avatar?.tmdb?.avatar_path)}
          alt=""
          className="w-[165px] h-[165px] rounded mr-[84px] mb-6"
        />
      );
    }
    return (
      <div className="bg-[#f2f2f2] w-[165px] h-[165px] rounded mr-[84px] mb-6 p-[22px]">
        <img
          id="profile"
          src="/images/profile.png"
          className="w-[120px] h-[120px]"
          alt=""
        />
      </div>
    );
  };

  return (
    <div className="bg-[#161616] w-full h-full">
      <NavBar className="relative" showOnlyLogo />
      <div className="max-w-[847px] pb-[24px] m-[auto] px-[30px] md:px-0">
        <h2 className="font-medium leading-tight text-5xl content mb-[12px]">
          Edit Profile
        </h2>
        <div className="border border-solid border-[#979797] mb-[40px]" />
        <div className="flex w-full flex-col md:flex-row">
          {getProfileImage()}
          <form action="" className="flex flex-col flex-1">
            <div className="flex mb-6 gap-4 flex-col md:flex-row">
              <input
                type="text"
                id="name"
                className={`p-2 w-full text-xl font-medium input leading-none border border-solid ${savedClassName}`}
                required
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="flex md:self-center flex-1 md:items-end">
                <input
                  type="checkbox"
                  className={`${savedClassName} border border-solid input text-xl form-check-input appearance-none h-6 w-6 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
                  id="kid"
                  defaultChecked={isKid}
                  onChange={(e) => setIsKid(e.target.checked)}
                />
                <label
                  className="form-check-label inline-block text-xl font-light"
                  htmlFor="kid"
                >
                  Kid?
                </label>
              </div>
            </div>
            <div className="mb-6 w-fit">
              <label htmlFor="language" className="block mb-2 text-xl w-fit">
                Language:
              </label>
              <div className="select-wrapper">
                <select
                  id="language"
                  className={`p-2 text-xl border border-solid input w-full custom-select ${savedClassName}`}
                  required
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="Español">Español</option>
                  <option value="English">English</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Italian">Italian</option>
                </select>
              </div>
            </div>
            <div className="mb-6 w-fit">
              <label htmlFor="language" className="block mb-2 text-xl w-fit">
                Allowed TV shows and movies:
              </label>
              <div className="select-wrapper">
                <select
                  id="language"
                  className={`p-2 text-xl input w-full custom-select border border-solid ${savedClassName}`}
                  required
                  value={allowedContent}
                  onChange={(e) => setAllowedContent(e.target.value)}
                >
                  <option value="A">Option A</option>
                  <option value="B">Option B</option>
                  <option value="C">Option C</option>
                  <option value="D">Option D</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="border border-solid border-[#979797] mb-[40px] mt-10" />
        <div className="flex gap-4 w-full md:w-[fit-content] justify-between mb-4">
          <button
            type="button"
            onClick={saveForm}
            className="px-9 h-10 bg-blue-600 uppercase text-white text-sm font-normal leading-tight rounded-sm shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out border-none"
          >
            Save
          </button>
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="border border-solid border-[#0578ff] w-[166px] inline-block px-6 h-10 text-white font-normal text-sm leading-tight uppercase rounded-sm bg-transparent hover:bg-gray-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
