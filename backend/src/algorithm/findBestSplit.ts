import type { TrainingRecord } from '../models/tree.js';
import { calculateEntropy } from './entropy.js';

type NumericFeature = 'sleep' | 'meetings' | 'stress';
type CategoricalFeature = 'weekends';
type Feature = NumericFeature | CategoricalFeature;

export type SplitType = 'numeric' | 'categorical';

export interface BestSplit {
  feature: Feature;
  type: SplitType;
  threshold?: number;
  categoryValue?: string;
  gain: number;
  leftRecords: TrainingRecord[];
  rightRecords: TrainingRecord[];
}

const NUMERIC_FEATURES: NumericFeature[] = ['sleep', 'meetings', 'stress'];
const CATEGORICAL_FEATURES: CategoricalFeature[] = ['weekends'];

function generateNumericThresholds(records: TrainingRecord[], feature: NumericFeature): number[] {
  const values = Array.from(new Set(records.map((record) => record[feature]))).sort((a, b) => a - b);

  const thresholds: number[] = [];

  for (let i = 0; i < values.length - 1; i++) {
    const currentValue = values[i];
    const nextValue = values[i + 1];
    thresholds.push((currentValue + nextValue) / 2);
  }

  return thresholds;
}

function splitNumericDataset(
  records: TrainingRecord[],
  feature: NumericFeature,
  threshold: number
): { leftRecords: TrainingRecord[]; rightRecords: TrainingRecord[] } {
  const leftRecords = records.filter((record) => record[feature] < threshold);
  const rightRecords = records.filter((record) => record[feature] >= threshold);

  return { leftRecords, rightRecords };
}

function splitCategoricalDataset(
  records: TrainingRecord[],
  feature: CategoricalFeature,
  categoryValue: string
): { leftRecords: TrainingRecord[]; rightRecords: TrainingRecord[] } {
  const leftRecords = records.filter((record) => record[feature] === categoryValue);
  const rightRecords = records.filter((record) => record[feature] !== categoryValue);

  return { leftRecords, rightRecords };
}

function calculateInformationGain(
  parentEntropy: number,
  leftRecords: TrainingRecord[],
  rightRecords: TrainingRecord[],
  totalRecords: number
): number {
  const leftWeight = leftRecords.length / totalRecords;
  const rightWeight = rightRecords.length / totalRecords;

  const weightedChildrenEntropy =
    leftWeight * calculateEntropy(leftRecords) +
    rightWeight * calculateEntropy(rightRecords);

  return parentEntropy - weightedChildrenEntropy;
}

function isValidSplit(leftRecords: TrainingRecord[], rightRecords: TrainingRecord[]): boolean {
  return leftRecords.length > 0 && rightRecords.length > 0;
}

export function findBestSplit(records: TrainingRecord[]): BestSplit | null {
  if (records.length <= 1) {
    return null;
  }

  const parentEntropy = calculateEntropy(records);
  let bestSplit: BestSplit | null = null;

  for (const feature of NUMERIC_FEATURES) {
    const thresholds = generateNumericThresholds(records, feature);

    for (const threshold of thresholds) {
      const { leftRecords, rightRecords } = splitNumericDataset(records, feature, threshold);

      if (!isValidSplit(leftRecords, rightRecords)) {
        continue;
      }

      const gain = calculateInformationGain(
        parentEntropy,
        leftRecords,
        rightRecords,
        records.length
      );

      if (bestSplit === null || gain > bestSplit.gain) {
        bestSplit = {
          feature,
          type: 'numeric',
          threshold,
          gain,
          leftRecords,
          rightRecords,
        };
      }
    }
  }

  for (const feature of CATEGORICAL_FEATURES) {
    const categoryValues = Array.from(new Set(records.map((record) => record[feature])));

    for (const categoryValue of categoryValues) {
      const { leftRecords, rightRecords } = splitCategoricalDataset(
        records,
        feature,
        categoryValue
      );

      if (!isValidSplit(leftRecords, rightRecords)) {
        continue;
      }

      const gain = calculateInformationGain(
        parentEntropy,
        leftRecords,
        rightRecords,
        records.length
      );

      if (bestSplit === null || gain > bestSplit.gain) {
        bestSplit = {
          feature,
          type: 'categorical',
          categoryValue,
          gain,
          leftRecords,
          rightRecords,
        };
      }
    }
  }

  if (bestSplit === null || bestSplit.gain <= 0) {
    return null;
  }

  return bestSplit;
}