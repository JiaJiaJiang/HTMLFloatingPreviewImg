(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.FloatingPreviewImg = factory());
})(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  window.addEventListener('mousemove', e => {
    for (let c of FloatingPreviewImg.activePreviews) {
      try {
        let el;
        if (el = c.shouldShow(e.target)) {
          c.show(el);
        } else {
          if (c._showingSource) c.hide();
        }
      } catch (err) {
        console.error(err);
      }
    }
  });
  class FloatingPreviewImg {
    get id() {
      return this._previewImg.id;
    }
    /**
     *The default function for resolving a image for showing preview, if returns falsy, nothing will happen.
     *This function is called when mousemove event emits, and the event target element will be passed in.
     *The default behaviour is to check if the element is an image and has attribute "showPreview".
     * 
     * @param {HTMLElement} el the event target element from mousemove event
     * @returns {HTMLElement|undefined} return the image element for showing preview
     */
    shouldShow(el) {
      let target = e.target;
      if (target.localName === 'img' && target.hasAttribute('showPreview')) {
        return el;
      }
      return;
    }
    /**
     * Creates an instance of FloatingPreviewImg.
     * @param {object} [opts={}]
     * @param {string} [opts.id] id of the preview image
     * @param {number} [opts.targetSize=500] a size for preview to fit in
     * @param {number} [opts.maxSize=500] images larger than this size will be ignored
     * @param {number} [opts.minScale=1] when targetSize divides source image's size is lower than this value, will use this scale
     * @param {number} [opts.marign=20] margin of the floating image to the screen
     * @param {function(HTMLImageElement):{width,height,src}} [opts.sourceInfoFunc]
     * @param {function(HTMLElement):HTMLElement|undefined} [opts.shouldShow]
     */
    constructor() {
      let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _defineProperty(this, "_showingSource", null);
      _defineProperty(this, "_cachedInfo", void 0);
      _defineProperty(this, "_previewImg", document.createElement('img'));
      _defineProperty(this, "_highResImg", document.createElement('img'));
      _defineProperty(this, "targetSize", 500);
      _defineProperty(this, "maxSize", 500);
      _defineProperty(this, "minScale", 1);
      _defineProperty(this, "marign", 20);
      _defineProperty(this, "sourceInfoFunc", void 0);
      opts = Object.assign({
        id: `el_floatingPreviewImg_${Math.random() * 0xffffffff | 0}`
      }, opts);
      this._previewImg.id = opts.id;
      delete opts.id;
      this._previewImg.style.cssText = `display:block;
		z-index: 99999999999;
		transform:translate3d(0, 0, 0);
		position:fixed;
		top:0;
		left:0;
		pointer-events:none;
		opacity:0;
		box-shadow:0 0 1em #000;
		height:0;
		width:0;
		transition:width .1s,height .1s,transform .1s,opacity .05s;`;
      for (let o in opts) {
        if (o.startsWith('_') || o in this === false) continue;
        this[o] = opts[o];
      }
      FloatingPreviewImg.activePreviews.add(this);
    }
    /**
     *show preview for the image
     *
     * @param {Image} sourceImg
     * @param {string} highResSrc high resolution version image src
     */
    async show(sourceImg, highResSrc) {
      if (this._previewImg.isConnected === false) {
        document.body.appendChild(this._previewImg);
      }
      if (sourceImg.complete === false) return; //ignore not loaded images
      const sourceInfo = this._showingSource === sourceImg ? this._cachedInfo : {
        width: sourceImg.width,
        height: sourceImg.height,
        src: sourceImg.src,
        highResSrc: highResSrc,
        ...(typeof this.sourceInfoFunc === 'function' ? await this.sourceInfoFunc(sourceImg) : {})
      };
      if (!sourceInfo) return;
      this._showingSource = sourceImg;
      this._cachedInfo = sourceInfo;
      const rawWidth = sourceInfo.width,
        rawHeight = sourceInfo.height,
        src = sourceInfo.src;
      if (rawWidth > this.maxSize || rawHeight > this.maxSize) return; //ignore big enough images
      const marign = this.marign,
        wWidth = window.innerWidth,
        wHeight = window.innerHeight,
        scale = Math.max(Math.min(this.targetSize / rawWidth, this.targetSize / rawHeight), this.minScale),
        preWidth = rawWidth * scale,
        preHeight = rawHeight * scale;
      this._previewImg.style.opacity = '1';
      if (this._previewImg.src !== src && sourceInfo.highResSrc ? this._previewImg.src !== sourceInfo.highResSrc : true) {
        this._previewImg.src = src;
        this._previewImg.style.width = preWidth + 'px';
        this._previewImg.style.height = preHeight + 'px';
        if (sourceInfo.highResSrc) {
          this._highResImg.onload = () => {
            if (this._previewImg.src === src) {
              this._previewImg.src = sourceInfo.highResSrc;
            }
          };
          this._highResImg.src = sourceInfo.highResSrc;
        }
      }
      const pos = sourceImg.getBoundingClientRect();
      let {
        top,
        left,
        bottom,
        right
      } = pos;
      bottom = wHeight - bottom;
      right = wWidth - right;
      const targetCenter = [left + rawWidth / 2, top + rawHeight / 2];
      //find out the largest free space
      const areas = [['top', top], ['bottom', bottom], ['left', left], ['right', right]].sort((a, b) => b[1] - a[1]);
      let x, y;
      switch (areas[0][0]) {
        case 'top':
          x = targetCenter[0] - preWidth / 2;
          y = top - marign - preHeight;
          break;
        case 'bottom':
          x = targetCenter[0] - preWidth / 2;
          y = top + rawHeight + marign;
          break;
        case 'left':
          x = left - marign - preWidth;
          y = targetCenter[1] - preHeight / 2;
          break;
        case 'right':
          x = left + rawWidth + marign;
          y = targetCenter[1] - preHeight / 2;
          break;
      }
      //adjust overflow
      let offset = 0;
      if ((offset = x + preWidth - wWidth) > 0) {
        x -= offset + marign;
      }
      if ((offset = y + preHeight - wHeight) > 0) {
        y -= offset + marign;
      }
      if (x < 0) x = marign;
      if (y < 0) y = marign;
      this._previewImg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    /**
     *hide preview image
     */
    hide() {
      this._showingSource = null;
      this._previewImg.style.opacity = '0';
    }
    close() {
      if (this._previewImg.isConnected) {
        this._previewImg.parentNode.removeChild(this._previewImg);
      }
      this._showingSource = null;
      this._previewImg = null;
      FloatingPreviewImg.activePreviews.delete(this);
    }
  }
  _defineProperty(FloatingPreviewImg, "activePreviews", new Set());

  return FloatingPreviewImg;

}));
