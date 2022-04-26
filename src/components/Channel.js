import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { audioActions } from '../store';

function Channel({ track }) {

  const dispatch = useDispatch();
  const audioState = useSelector((state) => state);

  const [isMuted, setIsMuted] = useState(false);
  const [position, setPosition] = useState(0);

// add event listener for every audio time update.
  useEffect(() => {
    track.ontimeupdate = (e) => {
      const percentagePos = (
        (e.currentTarget.currentTime.toFixed(2) /
          e.currentTarget.duration.toFixed(2)) *
        100
      ).toFixed(2);
      setPosition(percentagePos);
    };
  }, [track]);


  // update the loop atribute whenever loop state changes
  useEffect(() => {
    if (audioState.loop) {
      track.loop = true;
    } else {
      track.loop = false;
    }
  }, [audioState.loop, track]);


  // control play,pause and stop
  useEffect(() => {
    if (audioState.isPlaying) {
      track.play();
      return;
    }
    if (!audioState.isPlaying) {
      track.pause();
    }
    if (audioState.isStop) {
      track.currentTime = 0;
    }
  }, [audioState, track]);


  // follow the global position and current time states
  useEffect(() => {
    track.currentTime = audioState.currentTime;
    setPosition(audioState.position);
  }, [audioState.currentTime, audioState.position, track]);


//control mute
  function onMuteHandler() {
    setIsMuted(!isMuted);
    track.muted = !track.muted;
  }

  // event listener for every thumb drag or track click
  // this function updates the position and the current time states, so all tracks stay synchronized
  const changeHandler = (e) => {
    const currentTime = (track.duration / 100) * e.target.value;
    dispatch(
      audioActions.setCurrentTime({
        currentTime: currentTime,
        position: e.target.value,
      })
    );
  };

  return (
    <li>
      <div className="channel-container card">
        <div className='progress-bar-container'>
        <div
          className="progress-bar-cover"
          style={{ width: `${position}%` }}
        ></div>
        <input
          className="range"
          type="range"
          value={position}
          onChange={changeHandler}
        ></input>
        </div>
        <Button onClick={onMuteHandler} sx={{ color: 'white' }}>
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </Button>
      </div>
    </li>
  );
}

export default Channel;
