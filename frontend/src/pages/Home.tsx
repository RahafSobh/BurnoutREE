import { useEffect, useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import PredictionResult from '../components/PredictionResult';
import TreeVisualizer from '../components/TreeVisualizer';
import { getTree, predict, trainModel } from '../services/api';
import type { SerializedTreeNode } from '../utils/treeToFlow';
import type {
  PredictionInput,
  PredictionResult as PredictionResultType,
} from '../types/prediction';

const SAMPLE_DATASET = [
  { sleep: 8, meetings: 2, weekends: 'No', stress: 2, target: 'Healthy' },
  { sleep: 7, meetings: 3, weekends: 'No', stress: 3, target: 'Healthy' },
  { sleep: 5, meetings: 7, weekends: 'Yes', stress: 8, target: 'Risk of burnout' },
  { sleep: 4, meetings: 9, weekends: 'Yes', stress: 10, target: 'Critical condition' },
  { sleep: 6, meetings: 6, weekends: 'Yes', stress: 7, target: 'Vacation required' },
] as const;

export default function Home() {
  const [result, setResult] = useState<PredictionResultType | null>(null);
  const [tree, setTree] = useState<SerializedTreeNode | null>(null);
  const [status, setStatus] = useState('Training sample model...');

  useEffect(() => {
    async function initializeModel() {
      try {
        const trainingResponse = await trainModel([...SAMPLE_DATASET]);
        setTree(trainingResponse.tree);
        setStatus('Model trained successfully.');
      } catch {
        setStatus('Failed to train model.');
      }
    }

    initializeModel();
  }, []);

  async function handlePredict(input: PredictionInput) {
    try {
      setStatus('Predicting...');

      const predictionResult = await predict(input);
      setResult(predictionResult);

      const latestTree = await getTree();
      setTree(latestTree);

      setStatus('Prediction completed.');
    } catch {
      setStatus('Prediction failed.');
    }
  }

  return (
    <main>
      <h1>BurnoutREE 🌳</h1>
      <p>Explainable developer burnout prediction using a custom Decision Tree.</p>

      <p>Status: {status}</p>

      <section className="top-section">
    <PredictionForm onPredict={handlePredict} />

    <PredictionResult result={result} />
</section>

<TreeVisualizer
 tree={tree}
 result={result}
 />
    </main>
  );
} 