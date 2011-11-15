var Projectile = Element.$extend({ // abstract class
  __classvars__ : {
    all : [],
    removeMargin : 100
  },
  
  __init__ : function(x, y, dx, dy, opt) {
    this.$super(x, y, dx, dy, opt);
    
    Projectile.all.push(this);
  },
  
  update : function() {  
    this.$super();
    
    // If projectile goes off-screen, remove it.
    if (this.x < 0 - Projectile.removeMargin ||
        this.x > g.gameWidth + Projectile.removeMargin ||
        this.y < 0 - Projectile.removeMargin ||
        this.y > g.gameHeight + Projectile.removeMargin) {

      this.remove(Projectile.all);
    }
  },
  
});

var PlayerProjectile = Projectile.$extend({
  __classvars__ : {
    speed: -60,
    opt: { cls: 'playerProjectile' }
  },
  
  __init__ : function(x, y) {
    this.$super(
      x, y,
      0, PlayerProjectile.speed,
      PlayerProjectile.opt);
  }
});