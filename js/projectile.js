var Projectile = Element.$extend({ // abstract class
  __classvars__ : {
    all : [],
  },
  
  __init__ : function(x, y, dx, dy, opt) {
    this.$super(x, y, dx, dy, opt);
    
    Projectile.all.push(this);
  },
  
  update : function() {  
    this.$super();
    
    // TODO: If projectile goes off-screen, call this.remove();
  },
  
  remove : function() {
    $.grep(Projectile.all, function(e) {
      return e !== this;
    });
    
    this.$super();
  }
  
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