import type { TargetClass, TrainingRecord } from '../models/tree.js';

/**
 * Computes Shannon entropy (base 2) for a set of training records.
 *
 * Entropy measures the impurity or uncertainty in the target labels:
 *   H(S) = -Σ p(c) · log₂(p(c))
 *
 * A value of 0 means every record belongs to the same class.
 * Higher values mean the classes are more evenly mixed.
 */
export function calculateEntropy(records: TrainingRecord[]): number {
  // Step 1: Handle the empty set — no labels means no uncertainty.
  if (records.length === 0) {
    return 0;
  }

  // Step 2: Count how many records belong to each target class.
  const classCounts = new Map<TargetClass, number>();

  for (const record of records) {
    const currentCount = classCounts.get(record.target) ?? 0;
    classCounts.set(record.target, currentCount + 1);
  }

  const totalRecords = records.length;

  // Step 3: Convert counts into probabilities and sum the entropy terms.
  // Formula: H = -Σ(p · log₂(p)), skipping any class with p = 0.
  let entropy = 0;

  for (const count of classCounts.values()) {
    const probability = count / totalRecords;

    // Ignore zero probabilities — log₂(0) is undefined.
    if (probability > 0) {
      entropy -= probability * Math.log2(probability);
    }
  }

  // Step 4: Return the total entropy as a single number.
  return entropy;
}
