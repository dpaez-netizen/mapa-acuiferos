/* ============================================================
   GLUE del mapa de acuiferos. Requiere que ANTES de este archivo
   ya esten cargados, en este orden:
     1) https://code.createjs.com/1.0.0/createjs.min.js
     2) mapa_js.js
     3) apan_es_js.js
     4) calera_es_js.js
     5) cdmx_es_js.js
     6) apan_en_js.js
     7) calera_en_js.js
   ============================================================ */

(function () {
  var css = '.mapa-host { position: relative; }\n.mapa-host #animation_container {\n  position: static !important; left: auto !important; right: auto !important; top: auto !important; bottom: auto !important;\n  height: auto !important; margin: auto; max-width: 1280px; width: 100% !important;\n}\n.mapa-host canvas, .mapa-host #dom_overlay_container {\n  max-width: 1280px !important; width: 100% !important; height: auto !important;\n  top: 0; bottom: 0; margin: auto; position: relative !important;\n}\n#lightbox { position: fixed; inset: 0; z-index: 999999; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; padding: 20px; }\n#lightbox.hide { display: none; }\n#lightbox [data-modal-close] { position: absolute; top: 16px; right: 16px; width: 44px; height: 44px; border-radius: 50%; background: #fff; border: none; font-size: 24px; line-height: 1; cursor: pointer; z-index: 2; }\n#container-stories { position: relative; width: 100%; max-width: 1280px; aspect-ratio: 1280 / 800; margin: auto; }\n#container-stories > div { position: absolute; inset: 0; }\n#animation_containerApan, #_preload_div_Apan,\n#animation_containerCalera, #_preload_div_Calera,\n#animation_containerCDMX, #_preload_div_CDMX,\n#animation_containerApanEn, #_preload_div_ApanEn,\n#animation_containerCaleraEn, #_preload_div_CaleraEn {\n  height: auto !important; margin: auto; max-width: 1280px; width: 100% !important;\n}\n#_preload_div_Apan, #_preload_div_Calera, #_preload_div_CDMX, #_preload_div_ApanEn, #_preload_div_CaleraEn {\n  height: 100% !important;\n}\n#animation_containerApan canvas, #dom_overlay_containerApan,\n#animation_containerCalera canvas, #dom_overlay_containerCalera,\n#animation_containerCDMX canvas, #dom_overlay_containerCDMX,\n#animation_containerApanEn canvas, #dom_overlay_containerApanEn,\n#animation_containerCaleraEn canvas, #dom_overlay_containerCaleraEn {\n  max-width: 1280px !important; width: 100% !important; height: auto !important;\n  top: 0; bottom: 0; margin: auto; position: relative !important;\n}';
  var styleTag = document.createElement('style');
  styleTag.setAttribute('data-mapa-acuiferos', '1');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);
})();

window.playSound = function (id, loop, offset) {
  if (window.lastTimeSound) {
    var currentTime = (new Date()).getTime();
    if (currentTime < window.lastTimeSound + 1000) return;
  }
  window.lastTimeSound = (new Date()).getTime();
  return createjs.Sound.play(id, { interrupt: createjs.Sound.INTERRUPT_EARLY, loop: loop, offset: offset });
};

/* ============================================================
   IMPORTANTE: todo lo de aqui abajo (variables canvas/stage/etc.
   y las funciones init, handleFileLoad y handleComplete de cada
   region) vive a nivel GLOBAL (fuera de cualquier funcion), a
   proposito: las
   composiciones de Adobe Animate (mapa_js.js, apan_es_js.js, etc.)
   ya vienen compiladas esperando encontrar "stage", "stageApan",
   etc. como variables globales de verdad (via window). Si esto se
   mete dentro de otra función/closure, esas variables dejan de ser
   visibles para el codigo de Animate y truena con
   "ReferenceError: stage is not defined".
   ============================================================ */

/* ================= MAPA PRINCIPAL ================= */
var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;

function construirMapa(host) {
  host.innerHTML = '<div id="animation_container" style="background-color:rgba(0,0,102,00);">' +
    '<canvas id="canvas" width="1280" height="800" style="position:absolute; display:block; background-color:rgba(0,0,102,00);"></canvas>' +
    '<div id="dom_overlay_container" style="pointer-events:none; overflow:hidden; width:1280px; height:800px; position:absolute; left:0px; top:0px; display:block;"></div>' +
    '</div>';
}

function init() {
  canvas = document.getElementById("canvas");
  anim_container = document.getElementById("animation_container");
  dom_overlay_container = document.getElementById("dom_overlay_container");
  var comp = AdobeAn.getComposition("41AF9C09B82E8C41B8C794079C09B682");
  var lib = comp.getLibrary();
  var loader = new createjs.LoadQueue(false);
  loader.addEventListener("fileload", function (evt) { handleFileLoad(evt, comp) });
  loader.addEventListener("complete", function (evt) { handleComplete(evt, comp) });
  loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
  var images = comp.getImages();
  if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}
function handleComplete(evt, comp) {
  var lib = comp.getLibrary();
  var ss = comp.getSpriteSheet();
  var queue = evt.target;
  var ssMetadata = lib.ssMetadata;
  for (var i = 0; i < ssMetadata.length; i++) {
    ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
  }
  exportRoot = new lib.mapa();
  stage = new lib.Stage(canvas);
  stage.enableMouseOver();
  fnStartAnimation = function () {
    stage.addChild(exportRoot);
    createjs.Ticker.framerate = lib.properties.fps;
    createjs.Ticker.addEventListener("tick", stage);
  };
  AdobeAn.makeResponsive(true, 'both', false, 1, [canvas, anim_container, dom_overlay_container]);
  AdobeAn.compositionLoaded(lib.properties.id);
  fnStartAnimation();
}

/* ================= APAN (ES) ================= */

	var canvasApan, stageApan, exportRootApan, anim_containerApan, dom_overlay_containerApan, fnStartAnimationApan;
	function initApan() {
		if(exportRootApan && stageApan) { // THIS CODE IS FOR START AGAIN THE ANIMATION
        stageApan.getChildAt(0).gotoAndPlay(0);
        stageApan.removeChildAt(0);
        createjs.Ticker.removeEventListener("tick", stageApan);
        createjs.Sound.stop();
				var comp = AdobeAnApan.getComposition("ADB731659DD5194895D90CE1B0911A0BAPAN");
				var lib = comp.getLibrary();
        exportRootApan = new lib.APAN_NEW();
        stageApan.addChild(exportRootApan);
        createjs.Ticker.addEventListener("tick", stageApan);
        stageApan.update();
		}
		canvasApan = document.getElementById("canvasApan");
		anim_containerApan = document.getElementById("animation_containerApan");
		dom_overlay_containerApan = document.getElementById("dom_overlay_containerApan");
		var comp = AdobeAnApan.getComposition("ADB731659DD5194895D90CE1B0911A0BAPAN");
		var lib = comp.getLibrary();
		var loader = new createjs.LoadQueue(false);
		loader.installPlugin(createjs.Sound);
		loader.addEventListener("fileload", function (evt) { handleFileLoadApan(evt, comp) });
		loader.addEventListener("complete", function (evt) { handleCompleteApan(evt, comp) });
		var lib = comp.getLibrary();
		loader.loadManifest(lib.properties.manifest);
	}
	function handleFileLoadApan(evt, comp) {
		var images = comp.getImages();
		if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
	}
	function handleCompleteApan(evt, comp) {
		//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
		var lib = comp.getLibrary();
		var ss = comp.getSpriteSheet();
		var queue = evt.target;
		var ssMetadata = lib.ssMetadata;
		for (i = 0; i < ssMetadata.length; i++) {
			ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
		}
		var preloaderDiv = document.getElementById("_preload_div_Apan");
		preloaderDiv.style.display = 'none';
		canvasApan.style.display = 'block';
		exportRootApan = new lib.APAN_NEW();
		stageApan = new lib.Stage(canvasApan);
		stageApan.enableMouseOver();
		// El código JavaScript modificado ahora usa stageApan directamente
		//Registers the "tick" event listener.
		fnStartAnimationApan = function () {
			stageApan.addChild(exportRootApan);
			createjs.Ticker.framerate = lib.properties.fps;
			createjs.Ticker.addEventListener("tick", stageApan);
		}
		//Code to support hidpi screens and responsive scaling.
		AdobeAnApan.makeResponsive(true, 'both', true, 1, [canvasApan, preloaderDiv, anim_containerApan, dom_overlay_containerApan]);
		AdobeAnApan.compositionLoaded(lib.properties.id);
		fnStartAnimationApan();
	}
	

/* ================= CALERA (ES) ================= */

	var canvasCalera, stageCalera, exportRootCalera, anim_containerRootCalera, dom_overlay_containerCalera, fnStartAnimationCalera;
	function initCalera() {
		if(exportRootCalera && stageCalera) { // THIS CODE IS FOR START AGAIN THE ANIMATION
        stageCalera.getChildAt(0).gotoAndPlay(0);
        stageCalera.removeChildAt(0);
        createjs.Ticker.removeEventListener("tick", stageCalera);
        createjs.Sound.stop();
				var comp = AdobeAnCalera.getComposition("ADB731659DD5194895D90CE1B0911A0B");
				var lib = comp.getLibrary();
        exportRootCalera = new lib.aguasfirmes_CALERANEW();
        stageCalera.addChild(exportRootCalera);
        createjs.Ticker.addEventListener("tick", stageCalera);
        stageCalera.update();
		}
		canvasCalera = document.getElementById("canvasCalera");
		anim_containerRootCalera = document.getElementById("animation_containerCalera");
		dom_overlay_containerCalera = document.getElementById("dom_overlay_containerCalera");
		var comp = AdobeAnCalera.getComposition("ADB731659DD5194895D90CE1B0911A0B");
		var lib = comp.getLibrary();
		var loader = new createjs.LoadQueue(false);
		loader.installPlugin(createjs.Sound);
		loader.addEventListener("fileload", function (evt) { handleFileLoadCalera(evt, comp) });
		loader.addEventListener("complete", function (evt) { handleCompleteCalera(evt, comp) });
		var lib = comp.getLibrary();
		loader.loadManifest(lib.properties.manifest);
	}
	function handleFileLoadCalera(evt, comp) {
		var images = comp.getImages();
		if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
	}
	function handleCompleteCalera(evt, comp) {
		//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
		var lib = comp.getLibrary();
		var ss = comp.getSpriteSheet();
		var queue = evt.target;
		var ssMetadata = lib.ssMetadata;
		for (i = 0; i < ssMetadata.length; i++) {
			ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
		}
		var preloaderDiv = document.getElementById("_preload_div_Calera");
		preloaderDiv.style.display = 'none';
		canvasCalera.style.display = 'block';
		exportRootCalera = new lib.aguasfirmes_CALERANEW();
		stageCalera = new lib.Stage(canvasCalera);
		stageCalera.enableMouseOver();
		// El código JavaScript modificado ahora usa stageCalera directamente
		//Registers the "tick" event listener.
		fnStartAnimationCalera = function () {
			stageCalera.addChild(exportRootCalera);
			createjs.Ticker.framerate = lib.properties.fps;
			createjs.Ticker.addEventListener("tick", stageCalera);
		}
		//Code to support hidpi screens and responsive scaling.
		AdobeAnCalera.makeResponsive(true, 'both', true, 1, [canvasCalera, preloaderDiv, anim_containerRootCalera, dom_overlay_containerCalera]);
		AdobeAnCalera.compositionLoaded(lib.properties.id);
		fnStartAnimationCalera();
	}


/* ================= CDMX (ES) ================= */

var canvasCDMX, stageCDMX, exportRootCDMX, anim_containerCDMX, dom_overlay_containerCDMX, fnStartAnimationCDMX;
function initCDMX() {
	if(exportRootCDMX && stageCDMX) { // THIS CODE IS FOR START AGAIN THE ANIMATION
        stageCDMX.getChildAt(0).gotoAndPlay(0);
        stageCDMX.removeChildAt(0);
        createjs.Ticker.removeEventListener("tick", stageCDMX);
        createjs.Sound.stop();
				var comp = AdobeAnCDMX.getComposition("ADB731659DD5194895D90CE1B0911A0BCDMX");
				var lib = comp.getLibrary();
        exportRootCDMX = new lib.aguasfirmes_CDMX();
        stageCDMX.addChild(exportRootCDMX);
        createjs.Ticker.addEventListener("tick", stageCDMX);
        stageCDMX.update();
		}
	canvasCDMX = document.getElementById("canvasCDMX");
	anim_containerCDMX = document.getElementById("animation_containerCDMX");
	dom_overlay_containerCDMX = document.getElementById("dom_overlay_containerCDMX");
	var comp=AdobeAnCDMX.getComposition("ADB731659DD5194895D90CE1B0911A0BCDMX");
	var lib=comp.getLibrary();
	var loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
	loader.addEventListener("fileload", function(evt){handleFileLoadCDMX(evt,comp)});
	loader.addEventListener("complete", function(evt){handleCompleteCDMX(evt,comp)});
	var lib=comp.getLibrary();
	loader.loadManifest(lib.properties.manifest);
}
function handleFileLoadCDMX(evt, comp) {
	var images=comp.getImages();	
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}
function handleCompleteCDMX(evt,comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	var preloaderDiv = document.getElementById("_preload_div_CDMX");
	preloaderDiv.style.display = 'none';
	canvasCDMX.style.display = 'block';
	exportRootCDMX = new lib.aguasfirmes_CDMX();
	stageCDMX = new lib.Stage(canvasCDMX);
	stageCDMX.enableMouseOver();
	// El código JavaScript modificado ahora usa stageCDMX directamente
	//Registers the "tick" event listener.
	fnStartAnimationCDMX = function() {
		stageCDMX.addChild(exportRootCDMX);
		createjs.Ticker.framerate = lib.properties.fps;
		createjs.Ticker.addEventListener("tick", stageCDMX);
	}	    
	//Code to support hidpi screens and responsive scaling.
	AdobeAnCDMX.makeResponsive(true,'both',true,1,[canvasCDMX,preloaderDiv,anim_containerCDMX,dom_overlay_containerCDMX]);	
	AdobeAnCDMX.compositionLoaded(lib.properties.id);
	fnStartAnimationCDMX();
}


/* ================= APAN (EN) ================= */

	var canvasApanEn, stageApanEn, exportRootApanEn, anim_containerApanEn, dom_overlay_containerApanEn, fnStartAnimationApanEn;
	function initApanEn() {
		if(exportRootApanEn && stageApanEn) { // THIS CODE IS FOR START AGAIN THE ANIMATION
        stageApanEn.getChildAt(0).gotoAndPlay(0);
        stageApanEn.removeChildAt(0);
        createjs.Ticker.removeEventListener("tick", stageApanEn);
        createjs.Sound.stop();
				var comp = AdobeAnApanEn.getComposition("ADB731659DD5194895D90CE1B0911A0BAPANEN");
				var lib = comp.getLibrary();
        exportRootApanEn = new lib.aguasfirmes_escena_apanen();
        stageApanEn.addChild(exportRootApanEn);
        createjs.Ticker.addEventListener("tick", stageApanEn);
        stageApanEn.update();
		}
		canvasApanEn = document.getElementById("canvasApanEn");
		anim_containerApanEn = document.getElementById("animation_containerApanEn");
		dom_overlay_containerApanEn = document.getElementById("dom_overlay_containerApanEn");
		var comp = AdobeAnApanEn.getComposition("ADB731659DD5194895D90CE1B0911A0BAPANEN");
		var lib = comp.getLibrary();
		var loader = new createjs.LoadQueue(false);
		loader.installPlugin(createjs.Sound);
		loader.addEventListener("fileload", function (evt) { handleFileLoadApanEn(evt, comp) });
		loader.addEventListener("complete", function (evt) { handleCompleteApanEn(evt, comp) });
		var lib = comp.getLibrary();
		loader.loadManifest(lib.properties.manifest);
	}
	function handleFileLoadApanEn(evt, comp) {
		var images = comp.getImages();
		if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
	}
	function handleCompleteApanEn(evt, comp) {
		//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
		var lib = comp.getLibrary();
		var ss = comp.getSpriteSheet();
		var queue = evt.target;
		var ssMetadata = lib.ssMetadata;
		for (i = 0; i < ssMetadata.length; i++) {
			ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
		}
		var preloaderDiv = document.getElementById("_preload_div_ApanEn");
		preloaderDiv.style.display = 'none';
		canvasApanEn.style.display = 'block';
		exportRootApanEn = new lib.aguasfirmes_escena_apanen();
		stageApanEn = new lib.Stage(canvasApanEn);
		stageApanEn.enableMouseOver();
		//Registers the "tick" event listener.
		fnStartAnimationApanEn = function () {
			stageApanEn.addChild(exportRootApanEn);
			createjs.Ticker.framerate = lib.properties.fps;
			createjs.Ticker.addEventListener("tick", stageApanEn);
		}
		//Code to support hidpi screens and responsive scaling.
		AdobeAnApanEn.makeResponsive(true, 'both', true, 1, [canvasApanEn, preloaderDiv, anim_containerApanEn, dom_overlay_containerApanEn]);
		AdobeAnApanEn.compositionLoaded(lib.properties.id);
		fnStartAnimationApanEn();
	}
	

/* ================= CALERA (EN) ================= */

	var canvasCaleraEn, stageCaleraEn, exportRootCaleraEn, anim_containerRootCaleraEn, dom_overlay_containerCaleraEn, fnStartAnimationCaleraEn;
	function initCaleraEn() {
		if(exportRootCaleraEn && stageCaleraEn) { // THIS CODE IS FOR START AGAIN THE ANIMATION
        stageCaleraEn.getChildAt(0).gotoAndPlay(0);
        stageCaleraEn.removeChildAt(0);
        createjs.Ticker.removeEventListener("tick", stageCaleraEn);
        createjs.Sound.stop();
				var comp = AdobeAnCaleraEn.getComposition("ADB731659DD5194895D90CE1B0911A0BCALERAEN");
				var lib = comp.getLibrary();
        exportRootCaleraEn = new lib.aguasfirmes_escena_CaleraEn();
        stageCaleraEn.addChild(exportRootCaleraEn);
        createjs.Ticker.addEventListener("tick", stageCaleraEn);
        stageCaleraEn.update();
		}
		canvasCaleraEn = document.getElementById("canvasCaleraEn");
		anim_containerRootCaleraEn = document.getElementById("animation_containerCaleraEn");
		dom_overlay_containerCaleraEn = document.getElementById("dom_overlay_containerCaleraEn");
		var comp = AdobeAnCaleraEn.getComposition("ADB731659DD5194895D90CE1B0911A0BCALERAEN");
		var lib = comp.getLibrary();
		var loader = new createjs.LoadQueue(false);
		loader.installPlugin(createjs.Sound);
		loader.addEventListener("fileload", function (evt) { handleFileLoadCaleraEn(evt, comp) });
		loader.addEventListener("complete", function (evt) { handleCompleteCaleraEn(evt, comp) });
		var lib = comp.getLibrary();
		loader.loadManifest(lib.properties.manifest);
	}
	function handleFileLoadCaleraEn(evt, comp) {
		var images = comp.getImages();
		if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
	}
	function handleCompleteCaleraEn(evt, comp) {
		//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
		var lib = comp.getLibrary();
		var ss = comp.getSpriteSheet();
		var queue = evt.target;
		var ssMetadata = lib.ssMetadata;
		for (i = 0; i < ssMetadata.length; i++) {
			ss[ssMetadata[i].name] = new createjs.SpriteSheet({ "images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames })
		}
		var preloaderDiv = document.getElementById("_preload_div_CaleraEn");
		preloaderDiv.style.display = 'none';
		canvasCaleraEn.style.display = 'block';
		exportRootCaleraEn = new lib.aguasfirmes_escena_CaleraEn();
		stageCaleraEn = new lib.Stage(canvasCaleraEn);
		stageCaleraEn.enableMouseOver();
		//Registers the "tick" event listener.
		fnStartAnimationCaleraEn = function () {
			stageCaleraEn.addChild(exportRootCaleraEn);
			createjs.Ticker.framerate = lib.properties.fps;
			createjs.Ticker.addEventListener("tick", stageCaleraEn);
		}
		//Code to support hidpi screens and responsive scaling.
		AdobeAnCaleraEn.makeResponsive(true, 'both', true, 1, [canvasCaleraEn, preloaderDiv, anim_containerRootCaleraEn, dom_overlay_containerCaleraEn]);
		AdobeAnCaleraEn.compositionLoaded(lib.properties.id);
		fnStartAnimationCaleraEn();
	}


window.addEventListener('load', function () {

  /* ================= LIGHTBOX / MODAL ================= */
  function hideTarget(selector) {
    var target = document.querySelector(selector);
    if (target) target.style.display = 'none';
  }

  window.stopCanvasCDMX = function () {
    if (typeof stageCDMX !== 'undefined' && stageCDMX) { createjs.Ticker.removeEventListener("tick", stageCDMX); }
    createjs.Sound.stop();
  };
  window.stopCanvasCalera = function () {
    if (typeof stageCalera !== 'undefined' && stageCalera) { createjs.Ticker.removeEventListener("tick", stageCalera); }
    createjs.Sound.stop();
  };
  window.stopCanvasApan = function () {
    if (typeof stageApan !== 'undefined' && stageApan) { createjs.Ticker.removeEventListener("tick", stageApan); }
    createjs.Sound.stop();
  };
  window.stopCanvasCaleraEn = function () {
    if (typeof stageCaleraEn !== 'undefined' && stageCaleraEn) { createjs.Ticker.removeEventListener("tick", stageCaleraEn); }
    createjs.Sound.stop();
  };
  window.stopCanvasApanEn = function () {
    if (typeof stageApanEn !== 'undefined' && stageApanEn) { createjs.Ticker.removeEventListener("tick", stageApanEn); }
    createjs.Sound.stop();
  };
  window.stopAllCanvases = function () {
    window.stopCanvasCDMX();
    window.stopCanvasCalera();
    window.stopCanvasApan();
    window.stopCanvasCaleraEn();
    window.stopCanvasApanEn();
  };

  window.showLightBox = function (aquifer) {
    var refLightBox = document.getElementById('lightbox');
    var refLightBoxContent = document.getElementById('container-stories');
    var lang = (document.documentElement.lang || 'es').toLowerCase().indexOf('en') === 0 ? 'en' : 'es';
    hideTarget("#storyboard-calera");
    hideTarget("#storyboard-apan");
    hideTarget("#storyboard-cdmx");
    hideTarget("#storyboard-calera-en");
    hideTarget("#storyboard-apan-en");
    switch (aquifer) {
      case 'Calera': showAquifer('calera', refLightBoxContent, lang); break;
      case 'Apan': showAquifer('apan', refLightBoxContent, lang); break;
      case 'CDMX': showAquifer('cdmx', refLightBoxContent, 'es'); break;
    }
    refLightBox.classList.remove('hide');
  };

  function showAquifer(straquifer, refLightBoxContent, lang) {
    switch (straquifer) {
      case 'calera':
        if (lang === 'en') { initCaleraEn(); } else { initCalera(); }
        break;
      case 'apan':
        if (lang === 'en') { initApanEn(); } else { initApan(); }
        break;
      case 'cdmx':
        initCDMX();
        break;
    }
    var esEn = (lang === 'en' && straquifer !== 'cdmx');
    var storyboardSelector = '#storyboard-' + straquifer + (esEn ? '-en' : '');
    var aquiferElement = document.querySelector(storyboardSelector);
    if (!refLightBoxContent.querySelector(storyboardSelector)) {
      refLightBoxContent.appendChild(aquiferElement);
    }
    aquiferElement.style.display = 'inherit';
  }

  /* ================= CONSTRUCCION DEL LIGHTBOX (una sola vez, en document.body) ================= */
  function construirLightbox() {
    if (document.getElementById('lightbox')) return;

    var wrapper = document.createElement('div');
    wrapper.innerHTML =
      '<div id="lightbox" class="hide">' +
        '<button type="button" data-modal-close aria-label="Cerrar">&times;</button>' +
        '<div id="container-stories"></div>' +
      '</div>' +
      '<div id="storyboard-apan" style="display:none;">' +
'<div id="animation_containerApan">\n\t<canvas id="canvasApan" width="1280" height="800"\n\t\tstyle="position: absolute; display: none;"></canvas>\n\t<div id="dom_overlay_containerApan"\n\t\tstyle="pointer-events:none; overflow:hidden; width:1280px; height:800px; position: absolute; left: 0px; top: 0px; display: none;">\n\t</div>\n</div>\n<div id=\'_preload_div_Apan\'\n\tstyle=\'position:absolute; top:0; left:0; display: inline-block; height:800px; width: 1280px; text-align: center;\'>\n\t<span\n\t\tstyle=\'display: inline-block; height: 100%; vertical-align: middle;\'></span>\n\t<img src=\'/{{directory}}/templates/storyboards/apan/images/_preloader.gif?1640173326933\'\n\t\tstyle=\'vertical-align: middle; max-height: 100%\' />\n</div>' +
      '</div>' +
      '<div id="storyboard-calera" style="display:none;">' +
'<div id="animation_containerCalera">\n\t<canvas id="canvasCalera" width="1280" height="800"\n\t\tstyle="position: absolute; display: none;"></canvas>\n\t<div id="dom_overlay_containerCalera"\n\t\tstyle="pointer-events:none; overflow:hidden; width:1280px; height:800px; position: absolute; left: 0px; top: 0px; display: none;">\n\t</div>\n</div>\n<div id=\'_preload_div_Calera\'\n\tstyle=\'position:absolute; top:0; left:0; display: inline-block; height:800px; width: 1280px; text-align: center;\'>\n\t<span\n\t\tstyle=\'display: inline-block; height: 100%; vertical-align: middle;\'></span>\n\t<img src=\'/{{directory}}/templates/storyboards/calera/images/_preloader.gif?1640169541462\'\n\t\tstyle=\'vertical-align: middle; max-height: 100%\' />\n</div>' +
      '</div>' +
      '<div id="storyboard-cdmx" style="display:none;">' +
'<div id="animation_containerCDMX">\n\t<canvas id="canvasCDMX" width="1280" height="800"\n\t\tstyle="position: absolute; display: none;"></canvas>\n\t<div id="dom_overlay_containerCDMX"\n\t\tstyle="pointer-events:none; overflow:hidden; width:1280px; height:800px; position: absolute; left: 0px; top: 0px; display: none;">\n\t</div>\n</div>\n<div id=\'_preload_div_CDMX\'\n\tstyle=\'position:absolute; top:0; left:0; display: inline-block; height:800px; width: 1280px; text-align: center;\'>\n\t<span\n\t\tstyle=\'display: inline-block; height: 100%; vertical-align: middle;\'></span>\n\t<img src=\'/{{directory}}/templates/storyboards/cdmx/images/_preloader.gif?1764696900649\'\n\t\tstyle=\'vertical-align: middle; max-height: 100%\' />\n</div>' +
      '</div>' +
      '<div id="storyboard-apan-en" style="display:none;">' +
'<div id="animation_containerApanEn">\n\t<canvas id="canvasApanEn" width="1280" height="800"\n\t\tstyle="position: absolute; display: none;"></canvas>\n\t<div id="dom_overlay_containerApanEn"\n\t\tstyle="pointer-events:none; overflow:hidden; width:1280px; height:800px; position: absolute; left: 0px; top: 0px; display: none;">\n\t</div>\n</div>\n<div id=\'_preload_div_ApanEn\'\n\tstyle=\'position:absolute; top:0; left:0; display: inline-block; height:800px; width: 1280px; text-align: center;\'>\n\t<span\n\t\tstyle=\'display: inline-block; height: 100%; vertical-align: middle;\'></span>\n\t<img src=\'/{{directory}}/templates/storyboards/en/apan/images/_preloader.gif?1640173326933\'\n\t\tstyle=\'vertical-align: middle; max-height: 100%\' />\n</div>' +
      '</div>' +
      '<div id="storyboard-calera-en" style="display:none;">' +
'<div id="animation_containerCaleraEn">\n\t<canvas id="canvasCaleraEn" width="1280" height="800"\n\t\tstyle="position: absolute; display: none;"></canvas>\n\t<div id="dom_overlay_containerCaleraEn"\n\t\tstyle="pointer-events:none; overflow:hidden; width:1280px; height:800px; position: absolute; left: 0px; top: 0px; display: none;">\n\t</div>\n</div>\n<div id=\'_preload_div_CaleraEn\'\n\tstyle=\'position:absolute; top:0; left:0; display: inline-block; height:800px; width: 1280px; text-align: center;\'>\n\t<span\n\t\tstyle=\'display: inline-block; height: 100%; vertical-align: middle;\'></span>\n\t<img src=\'/{{directory}}/templates/storyboards/en/calera/images/_preloader.gif?1640169541462\'\n\t\tstyle=\'vertical-align: middle; max-height: 100%\' />\n</div>' +
      '</div>';

    while (wrapper.firstChild) { document.body.appendChild(wrapper.firstChild); }

    var refLightBox = document.getElementById('lightbox');
    var refLightBoxClose = refLightBox.querySelector('[data-modal-close]');
    refLightBoxClose.addEventListener('click', function () {
      refLightBox.classList.add('hide');
      window.stopAllCanvases();
    });
  }

  /* ================= INYECCION AUTO-REPARABLE DEL MAPA ================= */
  function iniciarMapa(host) {
    if (host.dataset.mapaInit) return;
    host.dataset.mapaInit = '1';

    function asegurarContenido() {
      if (!host.isConnected) return;
      if (!host.querySelector('#animation_container')) {
        construirMapa(host);
        init();
      }
    }
    asegurarContenido();

    var watcher = new MutationObserver(asegurarContenido);
    watcher.observe(host, { childList: true });
  }

  construirLightbox();

  var observadorGlobal = new MutationObserver(function () {
    document.querySelectorAll('.mapa-host').forEach(iniciarMapa);
  });
  observadorGlobal.observe(document.documentElement, { childList: true, subtree: true });

  document.querySelectorAll('.mapa-host').forEach(iniciarMapa);

});
