import type { TrainingRecord, TreeNode } from '../models/tree.js';
import { buildTree } from '../algorithm/buildTree.js';
import { predict, type PredictionInput, type PredictionResult } from '../algorithm/predict.js';
import { serializeTree, type SerializedTreeNode } from '../algorithm/serializeTree.js';

let trainedTree: TreeNode | null = null;

export function trainModel(records: TrainingRecord[]): SerializedTreeNode {
  const tree = buildTree(records);
  trainedTree = tree;

  return serializeTree(tree);
}

export function getSerializedTree(): SerializedTreeNode | null {
  if (trainedTree === null) {
    return null;
  }

  return serializeTree(trainedTree);
}

export function predictWithModel(input: PredictionInput): PredictionResult {
  if (trainedTree === null) {
    throw new Error('Model has not been trained yet.');
  }

  return predict(trainedTree, input);
}