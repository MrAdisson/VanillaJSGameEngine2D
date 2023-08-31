import { mapStringToMap } from '../util.js';

const BACKGROUND_LAYER = `WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
WXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXW
WXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXW
WXXXXXXRXXXXXXXXXXXXXXXXXXXXXXXW
WXXXXXXRXXWXXRRXXWWWXXXXXXXXXXXW
WXXXXxXXXXWXXXXXxDWWXXOXXXXXXXXW
WXXXWDWXXXWXXXXXXWWWXXOXXXXXXXXW
WXXXWWWXXXWXWWWXXXXXXXOXXXXXXXXW
WXXXXXXXXXWXWXXXXXXOOOOXXXXXXXXW
WXXXXXXWXXXXXXXRRXXXXXXXXXXXXXXW
WXXXXXXWWWXXXXXXRRXXXXXXXXXXXXXW
WXXXXXXXXXXXXXXRXRXOOXXXXXXXXXXW
WXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXW
WXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXW
WXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXW
WXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXW
WXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXW
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
`;

const mapStringLegend = {
  R: 'rock',
  T: 'tree',
  W: 'walls',
  X: 'caveGround',
  x: 'ground',
  O: 'water',
  D: 'door',
};

const processedMap = mapStringToMap(BACKGROUND_LAYER, mapStringLegend);

export const map2 = {
  ...processedMap,
  name: 'map2',
  playerStart: { x: 2, y: 2 },
  //CHANGE MAP POINT LOCATION
  wayPoints: [
    {
      destination: 'map1',
      locations: { from: { x: 17, y: 5 }, to: { x: 16, y: 5 } },
    },
    {
      destination: 'map1',
      locations: { from: { x: 5, y: 6 }, to: { x: 5, y: 5 } },
    },
  ],
  terrains: ['default', 'water', 'cave'],
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
    ground: [
      {
        name: 'Racaillou',
        level: {
          min: 2,
          max: 10,
        },
        chance: 1,
      },
      {
        name: 'Nosferapti',
        level: {
          min: 2,
          max: 10,
        },
        chance: 1,
      },
      {
        name: 'Gravalanche',
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
