import { mapStringToMap } from '../util.js';

const PALLET_TOWN = `TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXTXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXTXXRRXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXOOOXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXOOOXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXOOOXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
`;

const mapStringLegend = {
  R: 'rock',
  T: 'tree',
  W: 'walls',
  O: 'water',
  X: 'ground',
};

const processedMap = mapStringToMap(PALLET_TOWN, mapStringLegend);

export const map1 = {
  ...processedMap,
  name: 'map1',
  playerStart: { x: 1, y: 1 },
};
