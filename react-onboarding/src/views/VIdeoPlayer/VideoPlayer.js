import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import { setVideoTime } from '../../redux/player/actions';
import { getPlayerTime } from '../../redux/player/selectors';
import { getMovieDetails } from '../../services/movies';
import useWatchList from '../../hooks/useWatchList';

const VideoPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const [videoSrc, setVideoSrc] = useState('');
  const [videoPlaying, setVideoPlaying] = useState(false);
  const dispatch = useDispatch();
  const prevTime = useSelector(getPlayerTime(id));
  const { addToWatchList } = useWatchList();

  const videoRef = useRef();
  const currentTime = useRef(0);

  useEffect(() => {
    getMovieDetails(id).then((_movie) => {
      if (_movie?.trailerKey) {
        setVideoSrc(_movie?.trailerKey);
        setMovie(_movie);
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

  useEffect(
    () => () => {
      if (movie && videoRef.current) {
        addToWatchList(movie);
      }
    },
    [movie],
  );

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
