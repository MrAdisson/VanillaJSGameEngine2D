import { mapStringToMap } from '../util.js';

const PALLET_TOWN = `TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXGGGGXXXXTTXXTXXXXXXXXXXXXXXXT
TXXXRGGXXTXXXTXXXXXXXXXXXXXXXXXT
TXXGGGXXXXTXTXXXXWWWXXXXXXXXXXXT
TXXXXXXXXXXXXXTXXDWWXXXXXXXXXXXT
TXXTWDWTXXTXXTXXXWWWXXXXXXXXXXXT
TXXTWWWTXXXXXXTXXXXXXXXXXXXXXXXT
TXXTTTTTXXXXTXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXTXXXXXXXXXXXXXXXXXXXXT
TXXRRXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXRXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TOOOOOXXXXXXXXXXXXXXXXXXXXXXXXXT
TOOOOOXXXXXXXXXXXXXXXXXXXXXXXXXT
TOOOOOXXXXXXXXXXXXXXXXXXGGGGGGGT
TGGOOOXXXXXXXXXXXXXXXXXXGGGGGGGT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
`;

const mapStringLegend = {
  R: 'rock',
  T: 'tree',
  W: 'walls',
  O: 'water',
  X: 'ground',
  D: 'door',
  G: 'grass',
};

const processedMap = mapStringToMap(PALLET_TOWN, mapStringLegend);

export const map1 = {
  ...processedMap,
  name: 'map1',
  playerStart: { x: 1, y: 1 },
  wayPoints: [
    {
      destination: 'map2',
      locations: { from: { x: 17, y: 5 }, to: { x: 16, y: 5 } },
    },
    {
      destination: 'map2',
      locations: { from: { x: 5, y: 6 }, to: { x: 5, y: 5 } },
    },
  ],
  terrains: ['default', 'water'],
  encounters: {
    water: [
      {
        name: 'Magicarpe',
        level: {
          min: 2,
          max: 10,
        },
        chance: 1,
      },
      {
        name: 'Tentacool',
        level: {
          min: 2,
          max: 10,
        },
        chance: 1,
      },
    ],
    grass: [
      {
        name: 'Mystherbe',
        level: {
          min: 2,
          max: 10,
        },
        chance: 1,
      },
      {
        name: 'Pikachu',
        level: {
          min: 2,
          max: 10,
        },
        chance: 0.5,
      },
      {
        name: 'Evoli',
        level: {
          min: 2,
          max: 10,
        },
        chance: 0.1,
      },
    ],
  },
};
