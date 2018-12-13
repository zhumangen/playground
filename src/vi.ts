import * as cs from './config';
import * as ct from './configTool';

export const imageData = {
  'wadouri:http://47.100.43.165/v1/picl/aets/piclarc/wado?studyUID=1.2.410.200024.1.01.0.20180416.115846.01&seriesUID=1.2.410.200024.1.02.0.20180416.115846.02&objectUID=1.2.410.200024.1.03.0.20180416.115846.03&requestType=WADO&contentType=application/dicom': {
    "id": "df17b894-eaf1-11e8-8976-7cd30ad3aa0c",
    "accessionNum": "20181101171008-745301",
    "studyUid": "1.2.410.200024.1.01.0.20180416.115846.01",
    "seriesUid": "1.2.410.200024.1.02.0.20180416.115846.02",
    "objectUid": "1.2.410.200024.1.03.0.20180416.115846.03",
    "docName": "lwx",
    "isAi": 0,
    "createTime": "2018-11-18 13:21:59",
    "abnormalScore": 0.93,
    "tbScore": 0.91,
    "activeScore": 0.5,
    "adviceCode": 1,
    "normalityCode": 3,
    "tbConsistencyCode": 3,
    "activityCode": -1,
    "lesions": [
      {
        "id": "df17f326-eaf1-11e8-8976-7cd30ad3aa0c",
        "aiTbId": "df17b894-eaf1-11e8-8976-7cd30ad3aa0c",
        "type": "钙化灶",
        "prob": 0.6951630115509033,
        "xmin": 2039.9365631341934,
        "xmax": 2126.6949659585953,
        "ymin": 1332.4393030107021,
        "ymax": 1409.825814574957
      },
      {
        "id": "df182090-eaf1-11e8-8976-7cd30ad3aa0c",
        "aiTbId": "df17b894-eaf1-11e8-8976-7cd30ad3aa0c",
        "type": "钙化灶",
        "prob": 0.5878130793571472,
        "xmin": 463.8814481943846,
        "xmax": 527.2125930339098,
        "ymin": 1430.8637795448303,
        "ymax": 1491.7766593694687
      },
      {
        "id": "df1877f9-eaf1-11e8-8976-7cd30ad3aa0c",
        "aiTbId": "df17b894-eaf1-11e8-8976-7cd30ad3aa0c",
        "type": "钙化灶",
        "prob": 0.4951009452342987,
        "xmin": 820.2814965546131,
        "xmax": 1045.6142102479935,
        "ymin": 502.1914445757866,
        "ymax": 634.2756340205669
      },
      {
        "id": "df18a086-eaf1-11e8-8976-7cd30ad3aa0c",
        "aiTbId": "df17b894-eaf1-11e8-8976-7cd30ad3aa0c",
        "type": "索条状病灶",
        "prob": 0.3609699308872223,
        "xmin": 1571.5728538632393,
        "xmax": 1890.8728969097137,
        "ymin": 649.6167959421873,
        "ymax": 967.6791990995407
      }
    ]
  },
  'wadouri:http://47.100.43.165/v1/picl/aets/piclarc/wado?studyUID=1.2.840.113619.6.223.20110530112420750.985&seriesUID=1.2.840.113564.15716320087.2011053011250564022&objectUID=1.2.840.113564.15716320087.2011053011250564023.2003000225000&requestType=WADO&contentType=application/dicom': {
    "id": "70c86fa4-e3c0-11e8-8976-7cd30ad3aa0c",
    "accessionNum": "20181101170948-688951",
    "studyUid": "1.2.840.113619.6.223.20110530112420750.985",
    "seriesUid": "1.2.840.113564.15716320087.2011053011250564022",
    "objectUid": "1.2.840.113564.15716320087.2011053011250564023.2003000225000",
    "docName": "lj",
    "isAi": 0,
    "createTime": "2018-11-09 09:40:30",
    "abnormalScore": 1,
    "tbScore": 1,
    "activeScore": 0.5,
    "adviceCode": 1,
    "normalityCode": 3,
    "tbConsistencyCode": 3,
    "activityCode": -1,
    "lesions": [
      {
        "id": "70c89b81-e3c0-11e8-8976-7cd30ad3aa0c",
        "aiTbId": "70c86fa4-e3c0-11e8-8976-7cd30ad3aa0c",
        "type": "索条状病灶",
        "prob": 0.46458593010902405,
        "xmin": 722.1417303085327,
        "xmax": 1221.3529586791992,
        "ymin": 223.77653050422668,
        "ymax": 754.0780096054077
      }
    ]
  }
};

export function displayImage(element, imageId, loaded) {
  cs.cornerstone.enable(element);
  cs.cornerstone.loadAndCacheImage(imageId).then(image => {
    const defViewport = cs.cornerstone.getDefaultViewport(element, image);
    cs.cornerstone.displayImage(element, image, defViewport);
    cs.cornerstone.fitToWindow(element);

    // Activate mouse clicks, mouse wheel and touch
    cs.cornerstoneTools.mouseInput.enable(element);
    cs.cornerstoneTools.mouseWheelInput.enable(element);

    // Enable all tools we want to use with this element
    // cs.cornerstoneTools.wwwcRegion.activate(element, 1);
    // cs.cornerstoneTools.wwwc.activate(element, 1);
    cs.cornerstoneTools.wwwc.activate(element, 4); // ww/wc is the default tool for right mouse button
    cs.cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
    //cornerstoneTools.zoom.activate(element, 1); // zoom is the default tool for right mouse button
    cs.cornerstoneTools.zoomWheel.activate(element, 2);

    if (loaded) {
      loaded.call(image, element);
    }
  });
}

export function displayImageFromElement(source, dest, loaded) {
  const element = cs.cornerstone.getEnabledElement(source);
  if (element && element.image) {
    displayImage(dest, element.image.imageId, loaded);
  }
}

export function drawLesionData(element) {
  const elem = cs.cornerstone.getEnabledElement(element);
  if (elem && elem.image) {
    cs.cornerstoneTools[ct.aiRectToolName].deactivate(element, 1);
    cs.cornerstoneTools.clearToolState(element, ct.aiRectToolName);
    const data = imageData[elem.image.imageId];
    data.lesions.forEach(lesion => {
      const initData = {
        element,
        data: lesion
      };
      cs.cornerstoneTools[ct.aiRectToolName].addNewMeasurement(initData);
    });
  }
}

export function getEchartsData(element) {
  const elem = cs.cornerstone.getEnabledElement(element);
  if (elem && elem.image) {
    const data = imageData[elem.image.imageId];
    return {
      abnormalScore: data.abnormalScore,
      tbScore: data.tbScore,
    }
  }
}

export function updateImage(element) {
  cs.cornerstone.updateImage(element);
}
