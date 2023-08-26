export const ENTITIES = {
  tree: {
    width: 1,
    height: 1,
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
    color: 'grey',
    collides: true,
    greetings: 'Hello, I am a rock!',
  },
  walls: {
    width: 1,
    height: 1,
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
    color: 'blue',
    collides: true,
    greetings: 'Hello, I am water!',
    asset: {
      src: './assets/water/water.png',
    },
  },
  ground: {
    width: 1,
    height: 1,
    color: 'brown',
    collides: false,
    greetings: 'Hello, I am ground!',
    asset: {
      src: './assets/ground/ground.png',
    },
  },
  door: {
    width: 1,
    height: 1,
    color: 'brown',
    collides: false,
    greetings: 'Hello, I am a door!',
    // asset: {
    //   src: './assets/door/door.png',
    // },
  },
};
