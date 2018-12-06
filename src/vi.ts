import * as cs from './config';

export const imageIds = [
  'wadouri:http://47.100.41.69/v1/picl/aets/piclarc/wado?studyUID=1.2.156.147522.44.410947.6917.20181117090211&seriesUID=1.2.156.147522.44.410947.6917.1.20181117090305&objectUID=1.2.156.147522.44.410947.6917.1.1.20181117090305&requestType=WADO&contentType=application/dicom',
  'wadouri:http://47.100.41.69/v1/picl/aets/piclarc/wado?studyUID=1.2.276.0.7230010.3.0.3.5.1.10369816.3248354426&seriesUID=1.2.276.0.7230010.3.0.3.5.1.10369818.2175671291&objectUID=1.2.276.0.7230010.3.0.3.5.1.10369818.3695409847&requestType=WADO&contentType=application/dicom'
];

export function displayImage(element, imageId, loaded) {
  cs.cornerstone.enable(element);
  cs.cornerstone.loadAndCacheImage(imageId).then(image => {
    if (loaded) {
      loaded.call(image, element);
    }

    const defViewport = cs.cornerstone.getDefaultViewport(element, image);
    cs.cornerstone.displayImage(element, image, defViewport);
    cs.cornerstone.fitToWindow(element);

    // Activate mouse clicks, mouse wheel and touch
    cs.cornerstoneTools.mouseInput.enable(element);
    cs.cornerstoneTools.mouseWheelInput.enable(element);

    // Enable all tools we want to use with this element
    // cs.cornerstoneTools.wwwcRegion.activate(element, 1);
    cs.cornerstoneTools.wwwc.activate(element, 1);
    cs.cornerstoneTools.wwwc.activate(element, 4); // ww/wc is the default tool for right mouse button
    cs.cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
    //cornerstoneTools.zoom.activate(element, 1); // zoom is the default tool for right mouse button
    cs.cornerstoneTools.zoomWheel.activate(element, 2);
  });
}

export function displayImageFromElement(source, dest, loaded) {
  const element = cs.cornerstone.getEnabledElement(source);
  if (element && element.image) {
    displayImage(dest, element.image.imageId, loaded);
  }
}
