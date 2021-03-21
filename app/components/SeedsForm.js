import React, { useState } from 'react';
import { Typography, Slider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import initialSeeds from './seeds'

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
    setSeedValues(helperVar)
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
                  // valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                />
              </ThemeProvider>
            </div>
          )
        })}
      </div>
    )
  }

export default SeedsForm;
