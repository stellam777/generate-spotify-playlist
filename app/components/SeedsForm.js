import React from 'react';
import { Typography, Slider } from '@material-ui/core';
import initialSeeds from './seeds'

const SeedsForm = ({ seedValues, setSeedValues }) => {

  const handleChange =(seed, newValue) => {
    const newSeeds = {...seedValues};
    newSeeds[seed].value = newValue;

    newSeeds[seed].enabled = newSeeds[seed].value[0] === initialSeeds[seed].value[0] && newSeeds[seed].value[1] === initialSeeds[seed].value[1] ? false : true,
    setSeedValues(newSeeds)
  }

    return (
      <div className='mt-4'>
        {Object.keys(seedValues).map((seed, i) => {
          return (
            <div key={seedValues[seed].id}>
              <p>{seed}:</p>
              <Slider
                value={seedValues[seed].value}
                min={seedValues[seed].min}
                max={seedValues[seed].max}
                step={seedValues[seed].step}
                onChange={(e, newValue) => handleChange(seed, newValue)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
              />
            </div>
          )
        })}
      </div>
    )
  }

export default SeedsForm;
