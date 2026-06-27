import type { TargetClass, TrainingRecord, TreeNode } from '../models/tree.js';

export type PredictionInput = Omit<TrainingRecord, 'target'>;

export interface PredictionResult {
  prediction: TargetClass;
  path: string[];
}

function formatDecision(node: Extract<TreeNode, { type: 'decision' }>): string {
  const featureName = node.feature.charAt(0).toUpperCase() + node.feature.slice(1);

  if ('threshold' in node) {
    return `${featureName} ${node.operator} ${node.threshold}`;
  }

  return `${featureName} ${node.operator} ${node.categoryValue}`;
}

export function predict(node: TreeNode, input: PredictionInput, path: string[] = []): PredictionResult {
  if (node.type === 'leaf') {
    return {
      prediction: node.prediction,
      path,
    };
  }

  const decisionLabel = formatDecision(node);

  if ('threshold' in node) {
    const inputValue = input[node.feature];
    const nextPath = [...path, `${decisionLabel} → ${inputValue <= node.threshold ? 'Yes' : 'No'}`];

    return inputValue <= node.threshold
      ? predict(node.left, input, nextPath)
      : predict(node.right, input, nextPath);
  }

  const inputValue = input[node.feature];
  const nextPath = [...path, `${decisionLabel} → ${inputValue === node.categoryValue ? 'Yes' : 'No'}`];

  return inputValue === node.categoryValue
    ? predict(node.left, input, nextPath)
    : predict(node.right, input, nextPath);
}