import { GameManager } from '../gameManager.js';

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
  grass: {
    width: 1,
    height: 1,
    name: 'grass',
    color: 'green',
    collides: false,
    greetings: 'Hello, I am grass!',
    onWalkOver: () => {
      console.log('WALK ON GRASS');
      //RANDOM 1/12 TO LOG 'POKEMON ENCOUNTERED'
      const random = Math.floor(Math.random() * 12);
      if (random === 0) {
        console.log('POKEMON ENCOUNTERED');
      }
    },
  },
};

export class Entity {
  constructor({ type, coordinates }) {
    this.type = type;
    this.data = ENTITIES[type];
    Entity.instances.push(this);
    this.coordinates = coordinates;
    this.isWalkedOn = false;
  }
  static getEntityAtCoordinates(coordinates) {
    const entity = Entity.instances.find(
      (entity) => entity.coordinates.x === coordinates.x && entity.coordinates.y === coordinates.y
    );
    return entity ? entity : null;
  }

  onWalkOver() {
    if (this.data.onWalkOver) {
      this.data.onWalkOver();
    }
  }

  interactingAction() {
    const game = GameManager.getInstance();
    if (this.data.greetings) {
      game.getUIManager().openDialog('greetings', this.data.greetings, this);
    }
  }
  update(delta) {
    if (
      this.coordinates.x === GameManager.getInstance().getPlayer().coordinates.x &&
      this.coordinates.y === GameManager.getInstance().getPlayer().coordinates.y
    ) {
      if (!this.isWalkedOn) {
        this.onWalkOver();
        this.isWalkedOn = true;
      }
    } else {
      if (this.isWalkedOn) {
        this.isWalkedOn = false;
      }
    }
  }
  static instances = [];
}
