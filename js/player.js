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
  },
  
  update : function() {
    this.$super();
    
    // Shoot a missile?
    if (g.keyboard.shoot) {
      this.shoot();
    } else {
      this.consecutiveShots = 0;
    }
    
    this.dx = this.dy = 0;
    
    // Update the player velocity
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

  },
  
  shoot : function() {
    if (this.consecutiveShots % 3 == 0) {
      PlayerProjectile(this.x, this.y);
    }
    
    this.consecutiveShots += 1;
  }

});