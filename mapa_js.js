(function (cjs, an) {
  var p; // shortcut to reference prototypes
  var lib = {};
  var ss = {};
  var img = {};
  lib.ssMetadata = [
    {
      name: "mapa_atlas_1",
      frames: [
        [771, 799, 194, 68],
        [1219, 579, 203, 108],
        [253, 862, 194, 68],
        [1219, 689, 203, 108],
        [253, 792, 257, 68],
        [253, 579, 251, 211],
        [512, 792, 257, 68],
        [506, 579, 251, 211],
        [759, 579, 228, 211],
        [989, 579, 228, 211],
        [0, 579, 251, 407],
        [0, 0, 1938, 577],
      ],
    },
  ];

  (lib.AnMovieClip = function () {
    this.actionFrames = [];
    this.ignorePause = false;
    this.gotoAndPlay = function (positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndPlay.call(this, positionOrLabel);
    };
    this.play = function () {
      cjs.MovieClip.prototype.play.call(this);
    };
    this.gotoAndStop = function (positionOrLabel) {
      cjs.MovieClip.prototype.gotoAndStop.call(this, positionOrLabel);
    };
    this.stop = function () {
      cjs.MovieClip.prototype.stop.call(this);
    };
  }).prototype = p = new cjs.MovieClip();
  // symbols:

  (lib.CachedBmp_10 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(0);
  }).prototype = p = new cjs.Sprite();

  (lib.CachedBmp_9 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(1);
  }).prototype = p = new cjs.Sprite();

  (lib.CachedBmp_8 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(2);
  }).prototype = p = new cjs.Sprite();

  (lib.CachedBmp_7 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(3);
  }).prototype = p = new cjs.Sprite();

  (lib.CachedBmp_6 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(4);
  }).prototype = p = new cjs.Sprite();

  (lib.CachedBmp_5 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(5);
  }).prototype = p = new cjs.Sprite();

  (lib.CachedBmp_4 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(6);
  }).prototype = p = new cjs.Sprite();

  (lib.CachedBmp_3 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(7);
  }).prototype = p = new cjs.Sprite();

  (lib.CachedBmp_2 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(8);
  }).prototype = p = new cjs.Sprite();

  (lib.CachedBmp_1 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(9);
  }).prototype = p = new cjs.Sprite();

  (lib.geomarcadores = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(10);
  }).prototype = p = new cjs.Sprite();

  (lib.Group1 = function () {
    this.initialize(ss["mapa_atlas_1"]);
    this.gotoAndStop(11);
  }).prototype = p = new cjs.Sprite();
  // helper functions:

  function mc_symbol_clone() {
    var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
    clone.gotoAndStop(this.currentFrame);
    clone.paused = this.paused;
    clone.framerate = this.framerate;
    return clone;
  }

  function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
    var prototype = cjs.extend(symbol, cjs.MovieClip);
    prototype.clone = mc_symbol_clone;
    prototype.nominalBounds = nominalBounds;
    prototype.frameBounds = frameBounds;
    return prototype;
  }

  (lib.Symbol3 = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.instance = new lib.CachedBmp_8();
    this.instance.setTransform(3.9, 43.6, 0.5, 0.5);

    this.instance_1 = new lib.CachedBmp_7();
    this.instance_1.setTransform(0, 0, 0.5, 0.5);

    this.instance_2 = new lib.CachedBmp_10();
    this.instance_2.setTransform(3.9, 43.6, 0.5, 0.5);

    this.instance_3 = new lib.CachedBmp_9();
    this.instance_3.setTransform(0, 0, 0.5, 0.5);

    this.shape = new cjs.Shape();
    this.shape.graphics.f().s("#DBF863").ss(1, 1, 1).p("AqTwYIUnAAMAAAAgxI0nAAg");
    this.shape.setTransform(40.8, 128.8);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#009B38").s().p("AqTQYMAAAggwIUnAAMAAAAgwg");
    this.shape_1.setTransform(40.8, 128.8);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.instance_1 }, { t: this.instance }] })
        .to({ state: [{ t: this.instance_3 }, { t: this.instance_2 }] }, 1)
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] }, 2)
        .wait(1),
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-26.2, 0, 134, 234.7);

  (lib.Symbol2 = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.instance = new lib.CachedBmp_4();
    this.instance.setTransform(1.85, 37.95, 0.5, 0.5);

    this.instance_1 = new lib.CachedBmp_3();
    this.instance_1.setTransform(0.05, 0, 0.5, 0.5);

    this.instance_2 = new lib.CachedBmp_6();
    this.instance_2.setTransform(1.85, 37.95, 0.5, 0.5);

    this.instance_3 = new lib.CachedBmp_5();
    this.instance_3.setTransform(0.05, 0, 0.5, 0.5);

    this.shape = new cjs.Shape();
    this.shape.graphics.f().s("#DBF863").ss(1, 1, 1).p("AsKvtIYVAAIAAfbI4VAAg");
    this.shape.setTransform(63.725, 115.475);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#009B38").s().p("AsKPuIAA/bIYVAAIAAfbg");
    this.shape_1.setTransform(63.725, 115.475);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.instance_1 }, { t: this.instance }] })
        .to({ state: [{ t: this.instance_3 }, { t: this.instance_2 }] }, 1)
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] }, 2)
        .wait(1),
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-15.1, 0, 157.7, 217.1);

  (lib.markindividual = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.instance = new lib.geomarcadores();
    this.instance.setTransform(7, -21, 0.1676, 0.1676);

    this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

    this._renderFirstFrame();
  }).prototype = getMCSymbolPrototype(lib.markindividual, new cjs.Rectangle(7, -21, 42.1, 68.2), null);

  (lib.CDMX = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.instance = new lib.CachedBmp_1();
    this.instance.setTransform(5.8, 0, 0.5, 0.5);

    this.instance_1 = new lib.CachedBmp_2();
    this.instance_1.setTransform(5.8, 0, 0.5, 0.5);

    this.shape = new cjs.Shape();
    this.shape.graphics.f().s("#DBF863").ss(1, 1, 1).p("ApXuSISvAAIAAclIyvAAg");
    this.shape.setTransform(59.975, 84.475);

    this.shape_1 = new cjs.Shape();
    this.shape_1.graphics.f("#009B38").s().p("ApXOTIAA8lISvAAIAAclg");
    this.shape_1.setTransform(59.975, 84.475);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.instance }] })
        .to({ state: [{ t: this.instance_1 }] }, 1)
        .to({ state: [{ t: this.shape_1 }, { t: this.shape }] }, 2)
        .wait(1),
    );

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(-1, -8, 122, 185);

  (lib.mark = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    // Layer_1
    this.instance = new lib.markindividual();
    this.instance.setTransform(19.1, 31, 1, 1, 0, 0, 0, 19.1, 31);

    this.timeline.addTween(cjs.Tween.get(this.instance).to({ y: 11 }, 14).to({ y: 31 }, 15).wait(1));

    this._renderFirstFrame();
  }).prototype = p = new cjs.MovieClip();
  p.nominalBounds = new cjs.Rectangle(7, -41, 42.1, 88.2);

  // stage content:
  (lib.mapa = function (mode, startPosition, loop, reversed) {
    if (loop == null) {
      loop = true;
    }
    if (reversed == null) {
      reversed = false;
    }
    var props = new Object();
    props.mode = mode;
    props.startPosition = startPosition;
    props.labels = {};
    props.loop = loop;
    props.reversed = reversed;
    cjs.MovieClip.apply(this, [props]);

    this.actionFrames = [0];
    this.isSingleFrame = false;
    // timeline functions:
    this.frame_0 = function () {
      if (this.isSingleFrame) {
        return;
      }
      if (this.totalFrames == 1) {
        this.isSingleFrame = true;
      }
      this.stop();

      this.button_1.addEventListener("click", fl_ClickToGoToWebPage);

      function fl_ClickToGoToWebPage() {
        window.showLightBox("Calera");
      }

      this.button_2.addEventListener("click", fl_ClickToGoToWebPage_2);

      function fl_ClickToGoToWebPage_2() {
        window.showLightBox("Apan");
      }

      this.button_3.addEventListener("click", fl_ClickToGoToWebPage_3);

      function fl_ClickToGoToWebPage_3() {
        window.showLightBox("CDMX");
      }
    };

    // actions tween:
    this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

    // Layer_3
    this.button_2 = new lib.Symbol3();
    this.button_2.name = "button_2";
    this.button_2.setTransform(644.05, 400.5, 1, 1, 0, 0, 0, 50.8, 38.8);
    new cjs.ButtonHelper(this.button_2, 0, 1, 2, false, new lib.Symbol3(), 3);

    this.instance = new lib.mark();
    this.instance.setTransform(543.3, 413.65, 1, 1, 0, 0, 0, 19.1, 31);

    this.instance_1 = new lib.mark();
    this.instance_1.setTransform(633.55, 493.85, 1, 1, 0, 0, 0, 19.1, 31);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.instance_1 }, { t: this.instance }, { t: this.button_2 }] })
        .wait(1),
    );

    // Layer_2
    this.button_3 = new lib.CDMX();
    this.button_3.name = "button_3";
    this.button_3.setTransform(489.55, 281);
    new cjs.ButtonHelper(this.button_3, 0, 1, 2, false, new lib.CDMX(), 3);

    this.button_1 = new lib.Symbol2();
    this.button_1.name = "button_1";
    this.button_1.setTransform(424.05, 277.45, 1, 1, 0, 0, 0, 65, 42.6);
    new cjs.ButtonHelper(this.button_1, 0, 1, 2, false, new lib.Symbol2(), 3);

    this.instance_2 = new lib.mark();
    this.instance_2.setTransform(412.15, 359.15, 1, 1, 0, 0, 0, 19.1, 31);

    this.timeline.addTween(
      cjs.Tween.get({})
        .to({ state: [{ t: this.instance_2 }, { t: this.button_1 }, { t: this.button_3 }] })
        .wait(1),
    );

    // Capa_67
    this.instance_3 = new lib.Group1();
    this.instance_3.setTransform(56, 254, 0.6159, 0.6159);

    this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

    this._renderFirstFrame();
  }).prototype = p = new lib.AnMovieClip();
  p.nominalBounds = new cjs.Rectangle(696, 634.9, 553.5999999999999, -25.5);
  // library properties:
  lib.properties = {
    id: "41AF9C09B82E8C41B8C794079C09B682",
    width: 1280,
    height: 800,
    fps: 24,
    color: "#000066",
    opacity: 1.0,
    manifest: [{ src: "https://static.wixstatic.com/media/b449d2_244747a8ee8c4054b672154330db4dcf~mv2.png", id: "mapa_atlas_1" }],
    preloads: [],
  };

  // bootstrap callback support:

  (lib.Stage = function (canvas) {
    createjs.Stage.call(this, canvas);
  }).prototype = p = new createjs.Stage();

  p.setAutoPlay = function (autoPlay) {
    this.tickEnabled = autoPlay;
  };
  p.play = function () {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndPlay(this.getTimelinePosition());
  };
  p.stop = function (ms) {
    if (ms) this.seek(ms);
    this.tickEnabled = false;
  };
  p.seek = function (ms) {
    this.tickEnabled = true;
    this.getChildAt(0).gotoAndStop((lib.properties.fps * ms) / 1000);
  };
  p.getDuration = function () {
    return (this.getChildAt(0).totalFrames / lib.properties.fps) * 1000;
  };

  p.getTimelinePosition = function () {
    return (this.getChildAt(0).currentFrame / lib.properties.fps) * 1000;
  };

  an.bootcompsLoaded = an.bootcompsLoaded || [];
  if (!an.bootstrapListeners) {
    an.bootstrapListeners = [];
  }

  an.bootstrapCallback = function (fnCallback) {
    an.bootstrapListeners.push(fnCallback);
    if (an.bootcompsLoaded.length > 0) {
      for (var i = 0; i < an.bootcompsLoaded.length; ++i) {
        fnCallback(an.bootcompsLoaded[i]);
      }
    }
  };

  an.compositions = an.compositions || {};
  an.compositions["41AF9C09B82E8C41B8C794079C09B682"] = {
    getStage: function () {
      return exportRoot.stage;
    },
    getLibrary: function () {
      return lib;
    },
    getSpriteSheet: function () {
      return ss;
    },
    getImages: function () {
      return img;
    },
  };

  an.compositionLoaded = function (id) {
    an.bootcompsLoaded.push(id);
    for (var j = 0; j < an.bootstrapListeners.length; j++) {
      an.bootstrapListeners[j](id);
    }
  };

  an.getComposition = function (id) {
    return an.compositions[id];
  };

  an.makeResponsive = function (isResp, respDim, isScale, scaleType, domContainers) {
    var lastW,
      lastH,
      lastS = 1;
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    function resizeCanvas() {
      var w = lib.properties.width,
        h = lib.properties.height;
      var iw = window.innerWidth,
        ih = window.innerHeight;
      var pRatio = window.devicePixelRatio || 1,
        xRatio = iw / w,
        yRatio = ih / h,
        sRatio = 1;
      if (isResp) {
        if ((respDim == "width" && lastW == iw) || (respDim == "height" && lastH == ih)) {
          sRatio = lastS;
        } else if (!isScale) {
          if (iw < w || ih < h) sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 1) {
          sRatio = Math.min(xRatio, yRatio);
        } else if (scaleType == 2) {
          sRatio = Math.max(xRatio, yRatio);
        }
      }
      domContainers[0].width = w * pRatio * sRatio;
      domContainers[0].height = h * pRatio * sRatio;
      domContainers.forEach(function (container) {
        container.style.width = w * sRatio + "px";
        container.style.height = h * sRatio + "px";
      });
      stage.scaleX = pRatio * sRatio;
      stage.scaleY = pRatio * sRatio;
      lastW = iw;
      lastH = ih;
      lastS = sRatio;
      stage.tickOnUpdate = false;
      stage.update();
      stage.tickOnUpdate = true;
    }
  };
  an.handleSoundStreamOnTick = function (event) {
    if (!event.paused) {
      var stageChild = stage.getChildAt(0);
      if (!stageChild.paused || stageChild.ignorePause) {
        stageChild.syncStreamSounds();
      }
    }
  };
  an.handleFilterCache = function (event) {
    if (!event.paused) {
      var target = event.target;
      if (target) {
        if (target.filterCacheList) {
          for (var index = 0; index < target.filterCacheList.length; index++) {
            var cacheInst = target.filterCacheList[index];
            if (cacheInst.startFrame <= target.currentFrame && target.currentFrame <= cacheInst.endFrame) {
              cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
            }
          }
        }
      }
    }
  };
})((createjs = createjs || {}), (AdobeAn = AdobeAn || {}));
var createjs, AdobeAn;
