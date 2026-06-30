import dotenv from 'dotenv';

dotenv.config();

function cleanEnv(value: string | undefined, fallback: string) {
  return (value ?? fallback).trim().replace(/^"|"$/g, '');
}

export const config = {
  port: Number(process.env.PORT) || 3000,
  corsOrigin: cleanEnv(
    process.env.CORS_ORIGIN,
    'http://localhost:5173'
  ),
};