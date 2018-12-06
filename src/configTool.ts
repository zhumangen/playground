import * as cs from './config';
import * as art from './aiRectTool';

const rectangleAi = cs.cornerstoneTools.mouseButtonTool({
  createNewMeasurement: art.createNewMeasurement,
  onImageRendered: art.onImageRendered,
  pointNearTool: art.pointNearTool,
  toolType: art.toolType
});

rectangleAi.addNewMeasurement = art.addNewMeasurement;
rectangleAi.toolType = art.toolType;
rectangleAi.setConfiguration({ drawHandlesOnHover: true });

cs.cornerstoneTools[art.toolType] = rectangleAi;

export const aiRectToolName = art.toolType;
