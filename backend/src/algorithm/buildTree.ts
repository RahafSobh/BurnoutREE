import type {
    DecisionNode,
    LeafNode,
    TargetClass,
    TrainingRecord,
    TreeNode,
  } from '../models/tree.js';
  import { calculateEntropy } from './entropy.js';
  import { findBestSplit } from './findBestSplit.js';
  
  interface BuildTreeOptions {
    maxDepth?: number;
    minSamplesSplit?: number;
  }
  
  function countClasses(records: TrainingRecord[]): Record<TargetClass, number> {
    const counts: Record<TargetClass, number> = {
      Healthy: 0,
      'Risk of burnout': 0,
      'Vacation required': 0,
      'Critical condition': 0,
    };
  
    for (const record of records) {
      counts[record.target]++;
    }
  
    return counts;
  }
  
  function getMajorityClass(records: TrainingRecord[]): TargetClass {
    const counts = countClasses(records);
  
    return Object.entries(counts).reduce((bestClass, currentClass) => {
      const [currentLabel, currentCount] = currentClass as [TargetClass, number];
      return currentCount > counts[bestClass] ? currentLabel : bestClass;
    }, 'Healthy' as TargetClass);
  }
  
  function allSameTarget(records: TrainingRecord[]): boolean {
    if (records.length === 0) {
      return true;
    }
  
    const firstTarget = records[0].target;
    return records.every((record) => record.target === firstTarget);
  }
  
  function createLeaf(records: TrainingRecord[]): LeafNode {
    return {
      type: 'leaf',
      prediction: getMajorityClass(records),
      samples: records.length,
      classCounts: countClasses(records),
      entropy: calculateEntropy(records),
    };
  }
  
  export function buildTree(
    records: TrainingRecord[],
    depth = 0,
    options: BuildTreeOptions = {}
  ): TreeNode {
    const maxDepth = options.maxDepth ?? 5;
    const minSamplesSplit = options.minSamplesSplit ?? 2;
  
    if (
      records.length === 0 ||
      records.length < minSamplesSplit ||
      depth >= maxDepth ||
      allSameTarget(records)
    ) {
      return createLeaf(records);
    }
  
    const bestSplit = findBestSplit(records);
  
    if (bestSplit === null) {
      return createLeaf(records);
    }
  
    const leftChild = buildTree(bestSplit.leftRecords, depth + 1, options);
    const rightChild = buildTree(bestSplit.rightRecords, depth + 1, options);
  
    if (bestSplit.type === 'numeric') {
      const node: DecisionNode = {
        type: 'decision',
        feature: bestSplit.feature as 'sleep' | 'meetings' | 'stress',
        operator: '<=',
        threshold: bestSplit.threshold!,
        left: leftChild,
        right: rightChild,
        samples: records.length,
        entropy: calculateEntropy(records),
        informationGain: bestSplit.gain,
      };
  
      return node;
    }
  
    const node: DecisionNode = {
      type: 'decision',
      feature: 'weekends',
      operator: '=',
      categoryValue: bestSplit.categoryValue as 'Yes' | 'No',
      left: leftChild,
      right: rightChild,
      samples: records.length,
      entropy: calculateEntropy(records),
      informationGain: bestSplit.gain,
    };
  
    return node;
  }