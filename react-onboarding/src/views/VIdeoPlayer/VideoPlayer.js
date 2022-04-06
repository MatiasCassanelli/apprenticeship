import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { setVideoTime } from '../../redux/player/actions';
import { getPlayerTime } from '../../redux/player/selectors';
import { getVideoUrl } from '../../services/movies';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoSrc, setVideoSrc] = useState('');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const dispatch = useDispatch();
  const prevTime = useSelector(getPlayerTime(id));

  const videoRef = useRef();
  const currentTime = useRef(0);

  useEffect(() => {
    getVideoUrl(id).then((videoUrl) => {
      if (videoUrl) {
        setVideoSrc(videoUrl);
      }
    });
  }, []);

  useEffect(() => {
    let intervalId;
    if (videoPlaying) {
      intervalId = setInterval(() => {
        currentTime.current = videoRef.current.getCurrentTime();
      }, 100);
    }
    return () => {
      clearInterval(intervalId);
      dispatch(setVideoTime({ [id]: currentTime.current }));
    };
  }, [videoPlaying]);

  const onPlayerReady = (e) => {
    videoRef.current = e.target;
    if (prevTime) {
      videoRef.current.seekTo(prevTime);
    }
  };

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
        <YouTube
          videoId={videoSrc}
          className="w-[100vw] h-[100vh]"
          onReady={onPlayerReady}
          onPlay={() => {
            setVideoPlaying(true);
          }}
          onPause={() => {
            setVideoPlaying(false);
          }}
          onEnd={() => {
            setVideoPlaying(false);
          }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
