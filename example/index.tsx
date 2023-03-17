import * as React from 'react';
import { MathQuiz } from './src/MathQuiz/MathQuiz';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <MathQuiz />
  </React.StrictMode>
);
