var Enemy = Element.$extend({ // abstract class
  __classvars__ : {
    all : []
  },

  __init__ : function(x, y, dx, dy, opt) {
    this.$super(x, y, dx, dy, opt);
    
    Enemy.all.push(this);
  },
  
  update : function() {  
    this.$super();
  }
  
});

var EnemyShip = Enemy.$extend({
  __classvars__ : {
    opt : {cls: 'enemyShip'}
  },
  
  __init__ : function(x, y) {
    this.$super(x, y, 2, 2, EnemyShip.opt);
  },
  
  update : function() {
    this.$super();

  },
  
});