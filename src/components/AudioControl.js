import Button from '@mui/material/Button';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import LoopIcon from '@mui/icons-material/Loop';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

import { useState } from 'react';

function AudioControl(props) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playPauseHandler = () => {
    const prev = isPlaying;
    setIsPlaying(!prev);
    if (!prev) {
      props.onPlay();
    } else {
      props.onPause();
    }
    setIsPlaying(!isPlaying);
  };

  const stopAllHandler = () => {
    setIsPlaying(false);
    props.onStop();
  };

  const loopHandler = () => {
    props.onLoop();
  };

  return (
    <div className='audio-control-container card'>
      <Button onClick={playPauseHandler} sx={{color:'white'}}>
        {isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}
      </Button>
      <Button onClick={stopAllHandler} sx={{color:'white'}}>
        <StopCircleIcon />
      </Button>
      <Button onClick={loopHandler} sx={{color:'white'}}>
        <LoopIcon />
      </Button>
    </div>
  );
}

export default AudioControl;
