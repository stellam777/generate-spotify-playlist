import React, { useState } from 'react';
import { Typography, Slider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
// import initialSeeds from './seeds'

const initialSeeds = {
  acousticness: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 1,
  },
  danceability: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 2,
  },
  energy: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 3,
  },
  loudness: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 4
  },
  instrumentalness: {
    min: 0,
    max: 1,
    value: [0, 1],
    step: .1,
    enabled: false,
    id: 5
  },
  popularity: {
    min: 0,
    max: 100,
    value: [0, 100],
    step: 1,
    enabled: false,
    id: 6
  },
  tempo: {
    min: 0,
    max: 200,
    value: [0, 200],
    step: .1,
    enabled: false,
    id: 7
  },
}

const SeedsForm = ({ seedValues, setSeedValues }) => {
  const [helperVar, setHelperVar] = useState(null);

  const muiTheme = createMuiTheme({
  overrides:{
    MuiSlider: {
      thumb:{
      color: '#CB88FF',
      },
      track: {
        color: '#CB88FF',
      },
      rail: {
        color: '#CB88FF',
      }
    }
}
});

  const handleChange =(seed, newValue) => {
    const newSeeds = {...seedValues};
    newSeeds[seed].value = newValue;

    newSeeds[seed].enabled = newSeeds[seed].value[0] === initialSeeds[seed].value[0] && newSeeds[seed].value[1] === initialSeeds[seed].value[1] ? false : true,
    //setSeedValues(newSeeds)
    setHelperVar(newSeeds)
  }

  const setData = () => {
    setSeedValues(helperVar);
    localStorage.setItem('seeds', JSON.stringify(helperVar));
  }

  const resetSeeds = () => {
   setSeedValues({
      acousticness: {
        min: 0,
        max: 1,
        value: [0, 1],
        step: .1,
        enabled: false,
        id: 1,
      },
      danceability: {
        min: 0,
        max: 1,
        value: [0, 1],
        step: .1,
        enabled: false,
        id: 2,
      },
      energy: {
        min: 0,
        max: 1,
        value: [0, 1],
        step: .1,
        enabled: false,
        id: 3,
      },
      loudness: {
        min: 0,
        max: 1,
        value: [0, 1],
        step: .1,
        enabled: false,
        id: 4
      },
      instrumentalness: {
        min: 0,
        max: 1,
        value: [0, 1],
        step: .1,
        enabled: false,
        id: 5
      },
      popularity: {
        min: 0,
        max: 100,
        value: [0, 100],
        step: 1,
        enabled: false,
        id: 6
      },
      tempo: {
        min: 0,
        max: 200,
        value: [0, 200],
        step: .1,
        enabled: false,
        id: 7
      },
    })
  }

    return (
      <div className='mt-4 seeds-form'>
        {Object.keys(seedValues).map((seed, i) => {
          return (
            <div key={seedValues[seed].id} className="mt-2">
              <p className='seed-title'>{seed}:</p>
              <ThemeProvider theme={muiTheme}>
                <Slider
                  value={seedValues[seed].value}
                  min={seedValues[seed].min}
                  max={seedValues[seed].max}
                  step={seedValues[seed].step}
                  onChange={(e, newValue) => handleChange(seed, newValue)}
                  onMouseUp={setData}
                  aria-labelledby="range-slider"
                />
              </ThemeProvider>
            </div>
          )
        })}
        <div className="text-center">
          <button className='btn btn-sm custom-btn align-center' onClick={resetSeeds}>Reset</button>
        </div>
      </div>
    )
  }

export default SeedsForm;
