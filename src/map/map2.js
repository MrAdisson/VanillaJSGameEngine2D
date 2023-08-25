import { mapStringToMap } from '../util.js';

const PALLET_TOWN = `TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXWWWXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXOOOXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXOOOXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXOOOXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXT
`;

const mapStringLegend = {
  R: 'rock',
  T: 'tree',
  W: 'walls',
  O: 'water',
};

export const map2 = mapStringToMap(PALLET_TOWN, mapStringLegend);
