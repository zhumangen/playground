import * as cs from './config';
import * as ct from './configTool';

export const imageData = {
  'wadouri:http://47.100.43.165/v1/picl/aets/piclarc/wado?studyUID=1.2.168.8200.441.1107101101.11071011012&seriesUID=1.2.168.8200.441.1107101101.11071011011&objectUID=1.2.168.8200.441.1107101101.20180421150906&requestType=WADO&contentType=application/dicom': {
    "id": "b27b6596-e729-11e8-8976-7cd30ad3aa0c",
    "accessionNum": "20181105153910-054712",
    "studyUid": "1.2.168.8200.441.1107101101.11071011012",
    "seriesUid": "1.2.168.8200.441.1107101101.11071011011",
    "objectUid": "1.2.168.8200.441.1107101101.20180421150906",
    "docName": "lj",
    "isAi": 0,
    "createTime": "2018-11-13 17:51:31",
    "abnormalScore": 1.0,
    "tbScore": 1.0,
    "activeScore": 0.5,
    "adviceCode": 1,
    "normalityCode": 3,
    "tbConsistencyCode": 3,
    "activityCode": -1,
    "lesions": [
      {
        "id": "b27baaa0-e729-11e8-8976-7cd30ad3aa0c",
        "aiTbId": "b27b6596-e729-11e8-8976-7cd30ad3aa0c",
        "type": "钙化灶",
        "prob": 0.9125757217407227,
        "xmin": 971.359512090683,
        "xmax": 1655.7673966884613,
        "ymin": 465.7627083957195,
        "ymax": 1683.8173087835312
      },
      {
        "id": "b27bd899-e729-11e8-8976-7cd30ad3aa0c",
        "aiTbId": "b27b6596-e729-11e8-8976-7cd30ad3aa0c",
        "type": "钙化灶",
        "prob": 0.866115391254425,
        "xmin": 2476.5739138126373,
        "xmax": 3189.54625582695,
        "ymin": 490.16069608926773,
        "ymax": 1509.699081659317
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
    // cs.cornerstoneTools.wwwc.activate(element, 1);
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

export function updateImage(element) {
  cs.cornerstone.updateImage(element);
}
