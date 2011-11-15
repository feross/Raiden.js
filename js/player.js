var Player = Element.$extend({
  __classvars__ : {
    speed : 15,
    opt : {id: 'player'}
  },
  
  __init__ : function() {
    this.$super(Game.width / 2,
                (Game.height / 1.2) | 0,
                0, 0,
                Player.opt);
    
    this.consecutiveShots = 0;
    
    this.lastMouse = {x: 0, y: 0};
  },
  
  update : function() {
    this.$super();
    
    // Shoot a missile?
    if (g.keyboard.shoot || g.mouse.button1) {
      this.shoot();
    } else {
      this.consecutiveShots = 0;
    }
    
    this.dx = this.dy = 0;
    
    // Update the player velocity
    
    // Keyboard
    if (g.keyboard.left) {
      if (this.x > 0) this.dx -= Player.speed;
    }
    if (g.keyboard.up) {
      if (this.y > 0) this.dy -= Player.speed;
    }
    if (g.keyboard.right) {
      if (this.x < Game.width) this.dx += Player.speed;
    }
    if (g.keyboard.down) {
      if (this.y < Game.height) this.dy += Player.speed;
    }
    
    // Mouse
    if ((this.dx == 0 && this.dy == 0) && // no keyboard keys were pressed &&
        (this.lastMouse.x != g.mouse.x || // mouse has moved since last time
        this.lastMouse.y != g.mouse.y)) {
      
      // Save mouse position
      this.lastMouse.x = g.mouse.x;
      this.lastMouse.y = g.mouse.y;
      
      this.dx = g.mouse.x - this.x;
      this.dy = g.mouse.y - this.y;
    }

  },
  
  shoot : function() {
    if (this.consecutiveShots % 3 == 0) {
      PlayerProjectile(this.x, this.y);
    }
    
    this.consecutiveShots += 1;
  }

});