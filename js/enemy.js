var Enemy = Element.$extend({ // abstract class
  __classvars__ : {
    all : []
  },

  __init__ : function(x, y, opt) {
    this.$super(x, y, opt);
  },
  
});

var EnemyShip = Enemy.$extend({
  __classvars__ : {
    opt : {cls: 'enemyShip'}
  },
  
  __init__ : function(x, y) {
    this.$super(x, y, EnemyShip.opt);
  },
  
  update : function() {
    this.y += 2;
  },
  
});