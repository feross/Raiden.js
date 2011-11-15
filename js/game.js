var g, stats;

$(function() {
  g = Game('#window');
  g.start();
});

var Game = Class.$extend({
  __classvars__ : {
    width : 600,
    height : 800,
    fps: 60, // gameplay fps
    showStats : true,
  },
  
  __init__ : function(gameWindow) {
    this.gameWindow = gameWindow;
    
    if (Game.showStats) {
      this.gameStats = MyStats(); // game state fps
      this.drawStats = MyStats(); // draw fps
    }
    
    $(this.gameWindow)
      .width(Game.width)
      .height(Game.height);
    
  },
  
  // Start the game
  start : function() {
    var self = this;

    this.player = Player();
    this.keyboard = Keyboard();
    this.mouse = Mouse();
    
    var run = (function() {
      var loops, now, delta,
          skipTicks = 1000 / Game.fps,
          maxFrameSkip = 10,
          nextGameTick = (new Date).getTime(),
          requestAnimFrame = window.requestAnimFrame,
          element = this.gameWindow;
    
      // Main game loop
      return function loop() {
        loops = 0;
        now = window.mozAnimationStartTime || (new Date).getTime();
        
        while (now > nextGameTick) { // it's time for a game update
          if (loops > maxFrameSkip) {
            // Skip game tick -- BAD!
            // Should only happen on slow CPUs.
            break;
          }
          self.update();
          nextGameTick += skipTicks;
          loops += 1;
        }
        
        // only draw if delta is low, otherwise we were probably
        // focused on another tab.
        delta = now - nextGameTick - skipTicks;
        if (delta < 160) {
          self.draw(1 - ((nextGameTick - now) / skipTicks));
        } else {
          // TODO: maybe pause the game, too
        }
        
        requestAnimFrame(loop, element);
      };
    })();
    
    run();
    
    // window.setInterval(function() {
    //    self.update();
    //    self.draw(0);
    //  }, 16);
  },
  
  /**
   * Update the game state by one tick. (We update at 50fps.)
   *
   * We advance the state of the game world at a constant rate, so that weird
   * performance glitches won't affect the gameplay.
   */
  update : function() {
    _.map(Projectile.all, function(p) { p.update(); });
    _.map(Enemy.all, function(e) { e.update(); });
    this.player.update();
        
    // If stats are enabled, update the game fps.
    this.gameStats && this.gameStats.update();
  },
   
  /**
   * Draw a game frame. (We draw at 60fps.)
   *
   * This uses requestAnimationFrame, which draws at the speed of the monitor
   * refresh rate (usually 60Hz) but falls back to setTimeout at 60fps in old
   * browsers. Since the time delta between draws will be slower or faster
   * than the 30fps constant speed that we update the game state, we use
   * interpolation to draw between game state 'ticks'. We calculate a factor
   * that represents how far between frames we currently are. For example,
   * a factor of 1.0 means that we're drawing immediately after a game update,
   * and a factor of 0.5 means that we're halfway between two frames.
   */
  draw : function(interpolation) {
    _.map(Projectile.all, function(p) { p.draw(interpolation); });
    _.map(Enemy.all, function(e) { e.draw(interpolation); });
    this.player.draw(interpolation);
    
    // If stats are enabled, update the draw fps.
    this.drawStats && this.drawStats.update();
  },
    
});

var Keyboard = Class.$extend({
  __init__ : function() {
    var self = this;
    
    $(window).keydown(function(e) {
      self.handleKeyDownUp(e, true);
    });
    
    $(window).keyup(function(e) {
      self.handleKeyDownUp(e, false);
    });
  },
  
  handleKeyDownUp : function(e, isDown) {
    var key = e.keyCode;
    // console.log(key);
    
    if (key == 37) { // LEFT
      this.left = isDown;
    } else if (key == 38) { // UP
      this.up = isDown;
    } else if (key == 39) { // RIGHT
      this.right = isDown;
    } else if (key == 40) { // DOWN
      this.down = isDown;
    } else if (key == 32 || key == 90) { // SPACE, Z
      this.shoot = isDown;
    } else if (key == 68 && !isDown) { // D
      $('html').toggleClass('debug');
    } else {
      return;
    }
    e.preventDefault();
  },
  
});

var Mouse = Class.$extend({
  __init__ : function() {
    var self = this;
    
    this.x = 0;
    this.y = 0;
    
    var offsetTop = $(g.gameWindow).offset().top;
    var offsetLeft = $(g.gameWindow).offset().left;
    
    $(g.gameWindow).mousemove(function(e) {
      self.x = e.pageX - offsetLeft;
      self.y = e.pageY - offsetTop;
    
    }).mousedown(function(e) {
      self.handleMouseDownUp(e, true);
      
    }).mouseup(function(e) {
      self.handleMouseDownUp(e, false);
    });
  },
  
  handleMouseDownUp : function(e, isDown) {
    var which = e.which;
    
    if (which == 1) {
      this.button1 = isDown;
    } else if (which == 2) {
      this.button2 = isDown;
    } else if (which == 3) {
      this.button3 = isDown;
    }
  }
});


/**
 * requestAnimationFrame shim layer with setTimeout fallback
 * from: http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 */
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||
         function(callback, element) {
           window.setTimeout(callback, 1000 / 60);
         };
})();


var MyStats = Class.$extend({
  __classvars__ : {
    instances : 0
  },
  
  __init__ : function() {
    this.stats = new Stats();

    // Align top-left
    $(this.stats.domElement).css({
      left: 0,
      position: 'absolute',
      top: (MyStats.instances * 45)
    });
    
    $('body').append($(this.stats.domElement));
    
    MyStats.instances += 1;
  },
  
  update : function() {
    return this.stats.update();
  }
});

