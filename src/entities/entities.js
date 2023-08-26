export const ENTITIES = {
  tree: {
    width: 1,
    height: 1,
    name: 'tree',
    color: 'green',
    collides: true,
    greetings: 'Hello, I am a tree!',
    asset: {
      src: './assets/tree/tree.png',
    },
  },
  rock: {
    width: 1,
    height: 1,
    name: 'rock',
    color: 'grey',
    collides: true,
    greetings: 'Hello, I am a rock!',
  },
  walls: {
    width: 1,
    height: 1,
    name: 'walls',
    color: 'black',
    collides: true,
    greetings: 'Hello, I am a wall!',
    asset: {
      src: './assets/wall/wall.jpg',
    },
  },
  water: {
    width: 1,
    height: 1,
    name: 'water',
    color: 'blue',
    collides: true,
    greetings: 'Hello, I am water!',
    asset: {
      src: './assets/water/water.png',
    },
  },
  ground: {
    width: 1,
    name: 'ground',
    height: 1,
    color: 'darkgrey',
    collides: false,
    greetings: 'Hello, I am ground!',
    // asset: {
    //   src: './assets/ground/ground.png',
    // },
  },
  door: {
    width: 1,
    height: 1,
    name: 'door',
    color: 'brown',
    collides: false,
    greetings: 'Hello, I am a door!',
    // asset: {
    //   src: './assets/door/door.png',
    // },
  },
};
