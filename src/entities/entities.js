import { GameManager } from '../gameManager.js';

export const ENTITIES = {
  tree: {
    width: 1,
    height: 1,
    name: 'tree',
    color: 'green',
    collides: () => {
      return true;
    },
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
    collides: () => {
      return true;
    },
    greetings: 'Hello, I am a rock!',
  },
  walls: {
    width: 1,
    height: 1,
    name: 'walls',
    color: 'black',
    collides: () => {
      return true;
    },
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
    collides: () => {
      const game = new GameManager();
      const player = game.getPlayer();
      if (player.isSurfing) {
        return false;
      }
      return true;
    },
    onWalkOver: () => {
      console.log('WALK ON WATER');
      //RANDOM 1/12 TO LOG 'POKEMON ENCOUNTERED'
      const random = Math.floor(Math.random() * 12);
      if (random === 0) {
        console.log('POKEMON ENCOUNTERED');
        const game = new GameManager();
        const player = game.getPlayer();
        game.instantiateBattle(player, 'pikachu', 'water');
      }
    },
    interactingAction: (e) => {
      const game = new GameManager();
      const player = game.getPlayer();
      if (!player.isSurfing) {
        player.isSurfing = true;
        game.getUIManager().openDialog('greetings', 'You are now surfing!');
        game.player.movement.setTarget(game.player.movement.direction);
        game.player.movement.isMoving = true;
      }
    },
    onLeave: () => {
      const game = new GameManager();
      const player = game.getPlayer();
      if (Entity.getEntityAtCoordinates(player.coordinates).type === 'water') return;
      if (player.isSurfing) {
        player.isSurfing = false;
        game.getUIManager().openDialog('greetings', 'You are no longer surfing!');
      }
    },
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
    collides: () => {
      return false;
    },
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
    collides: () => {
      return false;
    },
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
    collides: () => {
      return false;
    },
    greetings: 'Hello, I am grass!',
    onWalkOver: () => {
      console.log('WALK ON GRASS');
      //RANDOM 1/12 TO LOG 'POKEMON ENCOUNTERED'
      const random = Math.floor(Math.random() * 12);
      if (random === 0) {
        console.log('POKEMON ENCOUNTERED');
        const game = new GameManager();
        const player = game.getPlayer();
        game.instantiateBattle(player, 'pikachu', 'default');
      }
    },
    asset: {
      src: './assets/grass/grass.png',
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
  onLeave() {
    if (this.data.onLeave) {
      this.data.onLeave();
    }
  }

  interactingAction() {
    const game = GameManager.getInstance();
    if (this.data.greetings) {
      game.getUIManager().openDialog('greetings', this.data.greetings, this);
    }
    if (this.data.interactingAction) {
      this.data.interactingAction(this);
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
        this.onLeave();
        this.isWalkedOn = false;
      }
    }
  }
  static instances = [];
}
