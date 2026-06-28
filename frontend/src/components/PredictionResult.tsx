import type { PredictionResult as PredictionResultType } from '../types/prediction';

interface PredictionResultProps {
  result: PredictionResultType | null;
}

export default function PredictionResult({ result }: PredictionResultProps) {
  if (!result) {
    return null;
  }

  return (
    <section>
      <h2>Prediction Result</h2>

      <h3>{result.prediction}</h3>

      <h4>Decision Path</h4>

      <ol>
        {result.path.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}