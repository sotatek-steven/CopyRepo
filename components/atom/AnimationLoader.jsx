import React, { useState, useEffect, useCallback } from 'react';

import { Stage } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { Box } from '@mui/material';
import Spine from './Spine';

window.PIXI = PIXI;

const mixes = [
  {
    from: 'animation',
    to: 'animation',
    duration: 0.2,
  },
  {
    from: 'animation',
    to: 'animation',
    duration: 0.4,
  },
  {
    from: 'animation',
    to: 'animation',
    duration: 0.4,
  },
];

const AnimationLoader = (props) => {
  const [spineData, setSpineData] = useState();
  const [animationState, setAnimationState] = useState();
  const [skinName, setSkinName] = useState('animation');
  const [currentMixes, setCurrentMixes] = useState(mixes);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [scale, setScale] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    if (props.skinName) {
      setSkinName(props.skinName);
    }
    if (props.mixes) {
      setCurrentMixes(props.mixes);
    }
    if (props.width) {
      setWidth(props.width);
    }
    if (props.height) {
      setHeight(props.height);
    }
    if (props.scale) {
      setScale(props.scale);
    }
    if (props.x) {
      setX(props.x);
    }
    if (props.y) {
      setY(props.y);
    }

    const initSpine = async () => {
      const loader = new PIXI.Loader();
      loader.add(props.name, props.link).load((_, res) => {
        setSpineData(res[props.name].spineData);
      });
    };
    initSpine();
  }, [props.link, props.name]);

  useEffect(() => {
    if (props.skinName) {
      setSkinName(props.skinName);
    }
  }, [props.skinName]);

  useEffect(() => {
    if (props.mixes) {
      setCurrentMixes(props.mixes);
    }
  }, [props.mixes]);

  const stateRef = useCallback((state) => {
    if (state) {
      state.setAnimation(0, skinName, false);
      state.addAnimation(0, skinName, true, 0);
    }
    setAnimationState(state);
  }, [skinName]);

  const loadAnimation = useCallback(() => {
    if (animationState) {
      animationState.setAnimation(0, skinName, false);
      animationState.addAnimation(0, skinName, true, 0);
    }
  }, [animationState]);

  const [sizeScreen, setSizeScreen] = useState(window.innerWidth);
  useEffect(() => {
    window.onresize = () => {
      setSizeScreen(window.innerWidth);
    };
  }, [sizeScreen]);
  return (
    <Box
      height={height || 400}
      display={'flex'}
      justifyContent={'center'}
      onClick={loadAnimation}
    >
      <Stage
        options={{ transparent: true }}
        width={width || (sizeScreen < 500 ? 300 : 400)}
        height={height || 400}
      >
        {spineData && (
          <Spine
            scale={scale || (sizeScreen < 500 ? 1.1 : 1.3)}
            x={x || (sizeScreen < 500 ? 150 : 200)}
            y={y || 170}
            spineData={spineData}
            mixes={currentMixes}
            animationStateCallback={stateRef}
          />
        )}
      </Stage>
      <style>
        {`
          canvas {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}
      </style>
    </Box>
  );
};

export default AnimationLoader;
