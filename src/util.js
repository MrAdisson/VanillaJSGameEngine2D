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
