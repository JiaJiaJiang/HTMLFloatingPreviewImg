# html-FloatingPreviewImg

Show a floating image for small image preview

## Preview

![](floatingpreviewimg-preview.webp)

## Get

### 1. Directly use dist/FloatingPreviewImg.js

Just load FloatingPreviewImg.js by script tag and the `FloatingPreviewImg` is the class object.

### 2. Install from npm

```shell
npm i floatingpreviewimg
```
Then in your javascript code

```javascript
import FloatingPreviewImg from 'floatingpreviewimg'
```

## Usage

```javascript
//all parameters are optional
new FloatingPreviewImg({
	id:'12345', //id of the preview image
	targetSize:500, //a size for preview to fit in
	maxSize:500, //images larger than this size will be ignored
	minScale:1, //when targetSize divides source image's size is lower than this value, will use this scale
	marign:20, //margin of the floating image to the viewport
	/**
	 *Function for providing image info,
	 *if a function set, the preview image will get image info from this function instead of the source image
	 *this function should return an object of {width,height,src,highResSrc},props that are not defined here will filled by defaults
	 * @param {HTMLImageElement} sourceImg
	 * @returns {{width,height,src,highResSrc}}
	 */
	sourceInfoFunc(ele){ 
		return {
			width:ele.width,
			height:ele.height,
			src:ele.src,
			highResSrc:highResolutionImageUSrc||undefined,
		};
	},
	/**
	 *The function for resolving an image for showing preview, if returns falsy, nothing will happen.
	 *This function is called when mousemove event emits, and the event target element will be passed in.
	 *The default behaviour is to check if the element is an image and has attribute "showPreview".
	 * 
	 * @param {HTMLElement} el the event target element from mousemove event
	 * @returns {HTMLElement|undefined} return the image element for showing preview
	 */
	shouldShow(target){ 
		let target=e.target;
		if(target.localName==='img'
			&& target.hasAttribute('showPreview')){
			return el;
		}
		return;
	},
});

```