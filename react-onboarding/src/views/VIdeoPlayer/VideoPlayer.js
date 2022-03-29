import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVideoUrl } from '../../services/movies';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoSrc, setVideoSrc] = useState('');
  useEffect(() => {
    getVideoUrl(id).then((videoUrl) => {
      if (videoUrl) {
        setVideoSrc(videoUrl);
      }
    });
  }, []);

  return (
    <div className="relative">
      <button
        data-testid="prev-button"
        type="button"
        className="absolute h-6 w-6 top-[35px] left-[35px]"
        onClick={() => navigate(-1)}
      >
        <img src="/images/arrow_back.png" className="w-full h-full" alt="" />
      </button>
      {videoSrc && (
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        <iframe
          src={videoSrc}
          className="w-[100vw] h-[100vh] p-[45px]"
          allow="fullscreen;"
        />
      )}
    </div>
  );
};

export default VideoPlayer;
