import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { PetVector } from './PetVector';
import { useStyles } from './styles';
import { PET_SIZE, ANIMAL_KIND, COLOR } from '../../config';
import { Selector } from '../../components/Selector';
import { Range } from '../../components/Range';
import { LINE_SIZES, kindOptions, sizeOptions, colorOptions } from './data';
import { ManSvg } from './ManSvg';
import { Map } from '../../components/Map';

const defaultPosition = [50.472139999999996, 30.5185647];

export const LostPet = () => {
  const s = useStyles();
  const [size, setSize] = useState(PET_SIZE.Small);
  const [kind, setKind] = useState(ANIMAL_KIND.Cat);
  const [color, setColor] = useState(COLOR.black);
  const [userPosition, setPosition] = useState(defaultPosition);
  const [mapOffset, setMapOffset] = useState(30);

  useEffect(() => {
    function getCurrentPosition() {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((p) => resolve(p));
      });
    }

    (async () => {
      try {
        const { coords } = await getCurrentPosition();
        const position = [coords.latitude, coords.longitude];
        setPosition(position);
      } catch (e) {
        setPosition(defaultPosition);
      }
    })();
  }, []);

  const handleChangeSizeCallback = (value) => {
    setSize(value);
  };

  const handleChangeKindCallback = (value) => {
    setKind(value);
  };

  const handleChangeColorCallback = (value) => {
    setColor(value);
  };

  const handleChangeOffsetMapCallback = (value) => {
    setMapOffset(value);
  };

  const currentLineOffset = LINE_SIZES[kind][size];

  const blackColor = '#000';
  const whiteColor = '#fff';
  const manColor = color === COLOR.white ? whiteColor : blackColor;
  const bcgColor = color === COLOR.white ? blackColor : whiteColor;

  const cardStyle = {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    display: 'flex',
    backgroundColor: bcgColor,
    transition: '.2s',
  };

  return (
    <Grid container spacing={2} style={{ minWidth: '1340px' }}>
      <Grid item xs={7}>
        <Paper className={s.paper}>
          <Selector
            handleChangeCallback={handleChangeSizeCallback}
            options={sizeOptions}
            value={size}
            title="Size"
          />
          <Selector
            handleChangeCallback={handleChangeKindCallback}
            options={kindOptions}
            value={kind}
            title="Kind"
          />
          <Selector
            handleChangeCallback={handleChangeColorCallback}
            options={colorOptions}
            value={color}
            title="Color"
          />
          <div>
            <Map userPosition={userPosition} circleRadius={mapOffset} />
            <Range handleChangeCallback={handleChangeOffsetMapCallback} />
          </div>
          <Button color="primary">Submit</Button>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={s.paper} className={s.container}>
          <Grid container>
            <Grid
              item
              xs={6}
              style={{
                ...cardStyle,
                flexDirection: 'column',
                borderRadius: '5px 0 0 5px',
              }}
            >
              <div className={s.level} style={{ bottom: currentLineOffset }} />
              <PetVector size={size} kind={kind} color={color} />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                ...cardStyle,
                borderRadius: '0 5px 5px 0',
              }}
            >
              <div style={{ width: '100%', fill: manColor }}>
                <ManSvg />
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
