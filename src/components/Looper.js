import React from 'react';
import {useDispatch} from 'react-redux';

import Channel from './Channel';
import AudioControl from './AudioControl';
import { audioActions } from '../store';

// import all audio files
import Audio1 from '../audio/_tambourine_shake_higher.mp3';
import Audio2 from '../audio/ALL TRACK.mp3';
import Audio3 from '../audio/B VOC.mp3';
import Audio4 from '../audio/DRUMS.mp3';
import Audio5 from '../audio/HE HE VOC.mp3';
import Audio6 from '../audio/HIGH VOC.mp3';
import Audio7 from '../audio/JIBRISH.mp3';
import Audio8 from '../audio/LEAD 1.mp3';
import Audio9 from '../audio/UUHO VOC.mp3';


function Looper() {

  let tracks = [Audio1,Audio2,Audio3,Audio4,Audio5,Audio6,Audio7,Audio8,Audio9];
  tracks = tracks.map( track => new Audio(track));

  const dispatch = useDispatch();

  const playAll = () =>{
    dispatch(audioActions.setIsPlaying({isPlaying: true}));
  }

  const pauseAll = () =>{
    dispatch(audioActions.setIsPlaying({isPlaying: false}));
}

  const stopAll = () =>{
    dispatch(audioActions.setIsStop())
  }

  const loop = () =>{
    dispatch(audioActions.setLoop());
  }

  return (
    <React.Fragment>
      <section>
        <ul className='list'>
          {tracks.map( track => <Channel track={track} ></Channel>)}
        </ul>
      </section>
      <section>
        <AudioControl onPlay={playAll} onPause={pauseAll} onStop={stopAll} onLoop={loop} ></AudioControl>
      </section>
    </React.Fragment>
  );
}

export default Looper;
