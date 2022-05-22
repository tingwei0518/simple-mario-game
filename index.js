// project set up
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// gravity
const gravity = 0.5;

// player creation
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30
  }

  // define a player actually looks like
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity; // add a positive number onto a position makes pushing player down
    }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }
    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }
}

let image = new Image()
image.src = './img/platform.png'

let player = new Player();
let platforms = [
  new Platform({
    x: -1, y: 500, image
  }), new Platform({
    x: image.width, y: 500, image
  }), new Platform({
    x: image.width * 2, y: 500, image
  }), , new Platform({
    x: image.width * 3 + 100, y: 500, image
  }), new Platform({
    x: image.width * 4 + 100, y: 500, image
  }), new Platform({
    x: image.width * 6, y: 500, image
  }), new Platform({
    x: image.width * 9 + 100, y: 500, image
  }), new Platform({
    x: image.width * 12, y: 500, image
  }), new Platform({
    x: 250, y: 200, image
  }), new Platform({
    x: 550, y: 300, image
  }), new Platform({
    x: 950, y: 450, image
  }), new Platform({
    x: 1300, y: 200, image
  }), new Platform({
    x: 1380, y: 450, image
  }), new Platform({
    x: 1600, y: 150, image
  }), new Platform({
    x: 1800, y: 500, image
  })];

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0;

function init() {
  image = new Image()
  image.src = './img/platform.png'

  player = new Player();
  platforms = [
    new Platform({
      x: -1, y: 500, image
    }), new Platform({
      x: image.width, y: 500, image
    }), new Platform({
      x: image.width * 2, y: 500, image
    }), , new Platform({
      x: image.width * 3 + 100, y: 500, image
    }), new Platform({
      x: image.width * 4 + 100, y: 500, image
    }), new Platform({
      x: image.width * 6, y: 500, image
    }), new Platform({
      x: image.width * 9 + 100, y: 500, image
    }), new Platform({
      x: image.width * 12, y: 500, image
    }), new Platform({
      x: 250, y: 200, image
    }), new Platform({
      x: 550, y: 300, image
    }), new Platform({
      x: 950, y: 450, image
    }), new Platform({
      x: 1300, y: 200, image
    }), new Platform({
      x: 1380, y: 450, image
    }), new Platform({
      x: 1600, y: 150, image
    }), new Platform({
      x: 1800, y: 500, image
    })];

  scrollOffset = 0;
}

// player movement & scroll the background
function animate() {
  requestAnimationFrame(animate) // recursive loop
  ctx.clearRect(0, 0, canvas.width, canvas.height); // maintain player's shape
  player.update();
  platforms.forEach(platform => {
    platform.draw();
  })

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;

    if (keys.right.pressed) {
      scrollOffset += 5
      platforms.forEach(platform => {
        platform.position.x -= 5
      })
    } else if (keys.left.pressed) {
      scrollOffset -= 5
      platforms.forEach(platform => {
        platform.position.x += 5
      })
    }
  }

  // platform collision detection
  platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width) {
      player.velocity.y = 0;
    }
  })

  // win condition
  console.log(scrollOffset)
  if (scrollOffset === 1800) {
    alert("恭喜到終點囉！")
  }

  // lose condition
  if (player.position.y > canvas.height) {
    init()
  }
}

animate();

addEventListener('keydown', (event) => {
  const keyCode = event.key;
  console.log(keyCode);
  switch (keyCode) {
    case 'a':
      console.log('left');
      keys.left.pressed = true;
      break;
    case 's':
      console.log('down');
      break;
    case 'd':
      console.log('right');
      keys.right.pressed = true;
      break;
    case 'w':
      console.log('up');
      player.velocity.y -= 8;
      break;
  }
})

addEventListener('keyup', (event) => {
  const keyCode = event.key;
  console.log(keyCode);
  switch (keyCode) {
    case 'a':
      console.log('left');
      keys.left.pressed = false;
      break;
    case 's':
      console.log('down');
      break;
    case 'd':
      console.log('right');
      keys.right.pressed = false;
      break;
    case 'w':
      console.log('up');
      player.velocity.y -= 8;
      break;
  }
})