import type { TreeNode } from '../models/tree.js';

export interface SerializedTreeNode {
  id: string;
  label: string;
  type: 'decision' | 'leaf';
  samples: number;
  entropy: number;
  informationGain?: number;
  prediction?: string;
  children: SerializedTreeNode[];
}

function formatFeatureName(feature: string): string {
  return feature.charAt(0).toUpperCase() + feature.slice(1);
}

function buildDecisionLabel(node: Extract<TreeNode, { type: 'decision' }>): string {
  const featureName = formatFeatureName(node.feature);

  if ('threshold' in node) {
    return `${featureName} ${node.operator} ${node.threshold}`;
  }

  return `${featureName} ${node.operator} ${node.categoryValue}`;
}

export function serializeTree(node: TreeNode, id = 'node-0'): SerializedTreeNode {
  if (node.type === 'leaf') {
    return {
      id,
      label: `Prediction: ${node.prediction}`,
      type: 'leaf',
      samples: node.samples,
      entropy: node.entropy,
      prediction: node.prediction,
      children: [],
    };
  }

  return {
    id,
    label: buildDecisionLabel(node),
    type: 'decision',
    samples: node.samples,
    entropy: node.entropy,
    informationGain: node.informationGain,
    children: [
      serializeTree(node.left, `${id}-left`),
      serializeTree(node.right, `${id}-right`),
    ],
  };
}