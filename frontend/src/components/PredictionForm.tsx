import { useState } from 'react';
import type { PredictionInput } from '../types/prediction';

interface PredictionFormProps {
  onPredict: (input: PredictionInput) => void;
}

function validateForm(formData: PredictionInput): string | null {
  if (formData.sleep < 0 || formData.sleep > 24) {
    return 'Sleep must be between 0 and 24 hours.';
  }

  if (formData.meetings < 0 || formData.meetings > 20) {
    return 'Meetings must be between 0 and 20 per day.';
  }

  if (formData.stress < 1 || formData.stress > 10) {
    return 'Stress level must be between 1 and 10.';
  }

  return null;
}

export default function PredictionForm({ onPredict }: PredictionFormProps) {
  const [formData, setFormData] = useState<PredictionInput>({
    sleep: 7,
    meetings: 5,
    stress: 5,
    weekends: 'Yes',
  });

  const [error, setError] = useState<string | null>(null);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setError(null);

    setFormData((previous) => ({
      ...previous,
      [name]: name === 'weekends' ? value : Number(value),
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validationError = validateForm(formData);

    if (validationError) {
      setError(validationError);
      return;
    }

    onPredict(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Burnout Prediction</h2>

      {error && <p className="error-message">{error}</p>}

      <label>
        Sleep
        <input
          type="number"
          name="sleep"
          min={0}
          max={24}
          required
          value={formData.sleep}
          onChange={handleChange}
        />
      </label>

      <label>
        Meetings
        <input
          type="number"
          name="meetings"
          min={0}
          max={20}
          required
          value={formData.meetings}
          onChange={handleChange}
        />
      </label>

      <label>
        Stress
        <input
          type="number"
          name="stress"
          min={1}
          max={10}
          required
          value={formData.stress}
          onChange={handleChange}
        />
      </label>

      <label>
        Weekends
        <select
          name="weekends"
          required
          value={formData.weekends}
          onChange={handleChange}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </label>

      <button type="submit">Predict Burnout</button>
    </form>
  );
}