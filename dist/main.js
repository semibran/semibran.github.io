var modal = {
  template: '#modal',
  props: ['content']
};

var thumb = {
  template: '#thumb',
  props: ['image']
};

var gallery = [
  {
    title: "Mega Man Battle Royale",
    id: "mega-man",
    platform: "HTML5",
    type: "game",
    href: "https://grandonbroseph.github.io/mega-man-battle-royale/",
    quote: "Play as heroes and villains from the Mega Man series as you engage each other in competitive, fast-paced head-to-head combat in seventeen unique stages. What's not to love?",
    description: "You'll need two people to play this one, but it's worth the effort - Gemini Man is heaps fun."
  },
  {
    title: "Breakout",
    id: "breakout",
    platform: "Flash",
    type: "game",
    description: "Breakout clone with a few interesting power-ups and distracting particle VFX. As for the victory/defeat screens; well, let's just say they used to be funny."
  },
  {
    title: "Tetris",
    id: "tetris",
    platform: "HTML5",
    type: "game",
    href: "https://grandonbroseph.github.io/tetris/",
    quote: "No, that's not me playing.",
    description: "A retro-style Tetris game (Retris?) complete with a local head-to-head battle system, garbage collection, a fleshed-out AI, and colors that'll make your eyes bleed."
  },
  {
    title: "Protagon",
    id: "shmup",
    platform: "Flash",
    type: "game",
    quote: "A simple shooter about a flying square's struggle against the evil Antagon.",
    description: "This game never got quite <em>that</em> entertaining, but at least you can still shoot stuff. Fly over an endless grassy (gradient) expanse and shoot other ships out of the sky!"
  },
  {
    title: "Yum Yum Dragon Feast",
    id: "snake",
    platform: "Flash",
    type: "game",
    quote: "An ordinary Cake (cat + snake!) undertakes a journey through the labyrinth to-- turn vegan? Something's not right here...",
    description: "Eat fruits to collect \"bars\" and proceed to the next level. Consume multiple fruits of the same kind consecutively for bonus points!"
  },
  {
    title: "When Worlds Collide",
    id: "worlds",
    platform: "HTML5",
    type: "game",
    href: "https://grandonbroseph.github.io/worlds/",
    quote: "A circle-circle physics engine that's out of this world! All sizes and masses are to scale.",
    description: "I had originally intended to make this app into some sort of multiplayer bumper cars thing. For now, you just control a random planet/moon with the arrow keys and hit other space rocks."
  },
  {
    title: "Connect Four",
    id: "connect-four",
    platform: "Flash",
    type: "game",
    quote: "A retro-style version of Connect Four (you know it's your favorite game) with game-breaking powerups.",
    description: "I really like the facial expressions in this one. The anvil is pretty great, too..."
  },
  {
    title: "Chess",
    id: "chess",
    platform: "HTML5",
    type: "game",
    href: "https://grandonbroseph.github.io/chess/",
    description: "This one works on mobile devices, so you can actually move the pieces around. It's still a little broken, but I'd like to add more stuff one of these days."
  },
  {
    title: "Mario Quiz",
    id: "mario-quiz",
    platform: "HTML5",
    type: "game",
    href: "https://grandonbroseph.github.io/mario-quiz/",
    description: "A nifty Mario-themed quiz game designed for the classroom. Note that it does take a few minutes to load the first time around since the music files are so huge. That being said I really want to redo this one asap, I had something gnarly going on there."
  },
  {
    title: "Dungeon Generator",
    id: "dungeon",
    platform: "HTML5",
    type: "game",
    href: "https://grandonbroseph.github.io/dungeon/",
    description: "This program procedurally carves out a virtual maze (dungeon). For now it just makes a good screensaver but I'm planning on using it for something fancy."
  },
  {
    title: "Proto Man",
    id: "proto-man",
    platform: "Python",
    type: "game",
    quote: "Follow Proto Man as he brings a halt to a new world threat brewing behind the scenes!",
    description: "A single-player Mega Man clone I made in Python. Unfortunately, the latest version ended up breaking so I can't really post it up anymore."
  },
  {
    title: "Stickfight",
    id: "stickfight",
    platform: "Flash",
    type: "movie",
    description: "I used to make a lot of short animations about stick figures punching each other, but this one's gotta be my fav."
  }
];

var mobile = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var touch = 'ontouchstart' in window || navigator.maxTouchPoints;

var wrap;
var hero;
var heroImage;
var header;

new Vue({
  el: '#wrap',
  data: {
    mobile: mobile,
    touch: touch,
    showNav: false,
    showOverlay: false,
    showHeader: true,
    colorHeader: false,
    index: -1,
    indexDirection: 0,
    gallery: gallery,
    platforms: ['HTML5', 'Flash', 'Python']
  },
  methods: {
    move: function(direction) {
      if (direction < 0)
        this.indexDirection = -1;
      else if (direction > 0)
        this.indexDirection = 1;
      this.index = this.index + direction;
      this.showHeader = false;
    },
    moveTo: function(index) {
      this.move(index - this.index);
    },
    prev: function() {
      this.move(-1);
    },
    next: function() {
      this.move(1);
    },
    close: function() {
      this.index = -1;
    }
  },
  computed: {
    scrollable: function() {
      return this.index === -1;
    },
    isAtFirst: function() {
      return this.index === 0
    },
    isAtLast: function() {
      return this.index === this.gallery.length - 1
    },
    current: function() {
      return this.gallery[this.index]
    },
    imageTransition: function() {
      var suffix;
      if (this.indexDirection < 0) {
        suffix = '-left';
      } else if (this.indexDirection > 0) {
        suffix = '-right';
      }
      return suffix ? 'slide-image' + suffix : null
    }
  },
  mounted: function() {
    var that = this;
    var scrollTick, scrollLast;
    wrap = document.querySelector('#wrap');
    hero = document.querySelector('#hero');
    heroImage = document.querySelector('#hero-image');
    header = document.querySelector('#header');
    function scroll(event) {
      if (!scrollTick) {
        window.requestAnimationFrame(function() {
          var heroRect = hero.getBoundingClientRect();
          var headerRect = header.getBoundingClientRect();
          var scrollPos = document.body.scrollTop;
          var scrollDiff = scrollPos - scrollLast;
          var scrollMax = heroRect.height - headerRect.height;
          var scrollPct = (scrollPos / scrollMax * 100) * .5;
          if (!touch && !mobile)
            heroImage.style.transform = 'translateY(' + scrollPct + '%)';
          that.showHeader = scrollPos <= headerRect.height;
          that.colorHeader = scrollPos > scrollMax;
          if (that.colorHeader) {
            if (scrollDiff) {
              if (scrollDiff < 0) {
                that.showHeader = true;
              } else if (scrollDiff > 0) {
                that.showHeader = false;
              }
            }
          }
          if (!that.showHeader)
            that.showNav = false;
          scrollTick = false;
          scrollLast = scrollPos;
        });
      }
      scrollTick = true;
    }
    ['scroll', 'orientationchange', 'touchmove', 'load'].some(function(event) {
      window.addEventListener(event, scroll);
    });
  },
  components: {
    thumb: thumb,
    modal: modal
  }
});