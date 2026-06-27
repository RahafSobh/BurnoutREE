import { Request, Response } from 'express';
import {
  trainModel,
  predictWithModel,
  getSerializedTree,
} from '../services/treeService.js';
import type { TrainingRecord } from '../models/tree.js';

export function train(req: Request, res: Response) {
  try {
    const records = req.body as TrainingRecord[];

    const tree = trainModel(records);

    return res.status(200).json({
      message: 'Model trained successfully.',
      tree,
    });
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : 'Training failed.',
    });
  }
}

export function predict(req: Request, res: Response) {
  try {
    const result = predictWithModel(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : 'Prediction failed.',
    });
  }
}

export function getTree(_req: Request, res: Response)  {
  const tree = getSerializedTree();

  if (!tree) {
    return res.status(404).json({
      error: 'No trained model found.',
    });
  }

  return res.status(200).json(tree);
}