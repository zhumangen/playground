import * as cornerstone from 'cornerstone-core';
import * as cornerstoneTools from 'cornerstone-tools';
import * as cornerstoneMath from 'cornerstone-math';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import * as dicomParser from 'dicom-parser';
import Hammer from 'hammerjs';

cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

const maxWebWorkers = Math.max(navigator.hardwareConcurrency - 1, 1);
const config = {
  maxWebWorkers: maxWebWorkers,
	startWebWorkersOnDemand: true,
    webWorkerPath : './cornerstoneWADOImageLoaderWebWorker.js',
    taskConfiguration: {
        'decodeTask' : {
        loadCodecsOnStartup : true,
        initializeCodecsOnStartup: false,
            codecsPath: './cornerstoneWADOImageLoaderCodecs.js',
            usePDFJS: false
        }
    }
};

cornerstoneWADOImageLoader.webWorkerManager.initialize(config);

// Export scripts that will populate the Cornerstone namespace as a side effect only import.
// This is effectively the public API...
export {
    cornerstone,
    cornerstoneTools,
    cornerstoneMath,
    cornerstoneWADOImageLoader,
    dicomParser
};
