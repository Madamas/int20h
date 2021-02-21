import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { PetVector } from './PetVector';
import { PET_SIZE, ANIMAL_KIND, COLOR, SEX } from '../../config';
import { Selector } from '../../components/Selector';
import { Range } from '../../components/Range';
import {
  LINE_SIZES,
  kindOptions,
  sizeOptions,
  colorOptions,
  sexOptions,
  breedOptions,
} from './data';
import { ManSvg } from './ManSvg';
import { Map } from '../../components/Map';
import { useStyles } from './styles';
import { applicationFound, applicationLost } from '../../api';
import { modalStore } from '../../store';

const defaultPosition = [50.472139999999996, 30.5185647];

export const LostPet = () => {
  const s = useStyles();
  const [size, setSize] = useState(PET_SIZE.Small);
  const [kind, setKind] = useState(ANIMAL_KIND.Cat);
  const [color, setColor] = useState(COLOR.black);
  const [sex, setSex] = useState(SEX.male);
  const [breed, setBreed] = useState('');
  const [special, setSpecial] = useState('');
  const [userPosition, setPosition] = useState(defaultPosition);
  const [mapOffset, setMapOffset] = useState(30);

  const isLost = window.location.pathname === '/lostpet';

  const history = useHistory();

  const currentLineOffset = LINE_SIZES[kind][size];
  const currentBreeds = breedOptions[kind];

  const blackColor = '#000';
  const whiteColor = '#fff';
  const manColor = color === COLOR.white ? whiteColor : blackColor;
  const bcgColor = color === COLOR.white ? blackColor : whiteColor;

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

  const handleChangeSexCallback = (value) => {
    setSex(value);
  };

  const handleChangeBreedCallback = (value) => {
    setBreed(value);
  };

  const handleChangeSpecialCallback = (event) => {
    setSpecial(event.target.value);
  };

  const handleClickSendPetRequest = async () => {
    const specialValue = special.split(',');
    const breedValue = breed || currentBreeds[0].text;

    try {
      if (isLost) {
        await applicationLost({
          kind,
          breed: breedValue,
          color,
          size,
          sex,
          special: specialValue,
          coordinates: defaultPosition,
        });
      } else {
        await applicationFound({
          kind,
          breed: breedValue,
          color,
          size,
          sex,
          special: specialValue,
          coordinates: defaultPosition,
        });
      }
      modalStore.openSuccess(() => history.push('/'));
    } catch (error) {
      modalStore.openFailed(() => history.push('/'));
    }
  };

  const shouldRenderPetVector = [ANIMAL_KIND.Cat, ANIMAL_KIND.Dog].includes(
    kind
  );

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
          <Grid container spacing={2} justify="space-between">
            <Grid item xs={6}>
              <Grid container direction="column">
                <Selector
                  handleChangeCallback={handleChangeSizeCallback}
                  options={sizeOptions}
                  value={size}
                  title="Розмір"
                />
                <Selector
                  handleChangeCallback={handleChangeSexCallback}
                  options={sexOptions}
                  value={sex}
                  title="Стать"
                />
                <Selector
                  handleChangeCallback={handleChangeKindCallback}
                  options={kindOptions}
                  value={kind}
                  title="Вид"
                />
                <Selector
                  handleChangeCallback={handleChangeBreedCallback}
                  options={currentBreeds}
                  value={breed}
                  title="Порода"
                />
                <Selector
                  handleChangeCallback={handleChangeColorCallback}
                  options={colorOptions}
                  value={color}
                  title="Колір"
                />
                <Range handleChangeCallback={handleChangeOffsetMapCallback} />
                <TextField
                  placeholder="Особливі примітки (шрам, кличка)"
                  multiline
                  onChange={handleChangeSpecialCallback}
                />
                <Button
                  color="primary"
                  onClick={handleClickSendPetRequest}
                  style={{ marginTop: '10px' }}
                >
                  Надіслати
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Map userPosition={userPosition} circleRadius={mapOffset} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {shouldRenderPetVector && (
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
                <div
                  className={s.level}
                  style={{ bottom: currentLineOffset }}
                />
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
      )}
    </Grid>
  );
};
