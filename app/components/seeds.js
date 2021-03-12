import React from 'react'

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

export default initialSeeds;
