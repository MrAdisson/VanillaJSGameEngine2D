export const getSign = (number) => {
  if (number > 0) {
    return 1;
  } else if (number < 0) {
    return -1;
  } else {
    return 0;
  }
};

export const mapStringToMap = (mapString, mapStringLegend) => {
  const map = {
    objectsLocation: {},
    getEntityAtCoordinates: (location) => {
      for (const entitie in map.objectsLocation) {
        if (map.objectsLocation[entitie].find((loc) => loc.x === location.x && loc.y === location.y)) {
          return entitie;
        }
      }
      return null;
    },
  };
  const mapStringArray = mapString.split('\n');
  mapStringArray.forEach((row, y) => {
    row.split('').forEach((cell, x) => {
      if (mapStringLegend[cell] === undefined) return;
      if (!map.objectsLocation[mapStringLegend[cell]]) {
        map.objectsLocation[mapStringLegend[cell]] = [];
      }
      map.objectsLocation[mapStringLegend[cell]].push({ x, y });
    });
  });
  return map;
};

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  console.log(target);
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!isObject(target[key])) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
