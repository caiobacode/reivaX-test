import React from 'react';
import '../style/LoadingScreen.css';
import { useSelector } from 'react-redux';
import { selectLoadingScreen } from '../redux';
import reivaxImg from '../images/reivax.png';

export default function LoadingScreen() {
  const isEnable = useSelector(selectLoadingScreen);
  const divClassName = isEnable ? 'loading-screen-on' : 'loading-screen-off';
  return (
    <div className={divClassName}>
      <div className="loading-img-text-div">
        <img className="reivax-loading-screen" src={reivaxImg} alt="reivax" />
        <div className="loading-spinner" />
      </div>
    </div>
  );
}
