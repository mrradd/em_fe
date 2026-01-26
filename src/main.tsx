import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  colors: {
    brand: [
      '#322B46ff',
      '#452F4Cff',
      '#7F3938ff',
      '#A5422Eff',
      '#452A35ff',
      '#7F3327ff',
      '#C8664Eff',
      '#A34F55ff',
      '#623137ff',
      '#441C1Bff',
    ],
  },
  primaryColor: 'brand',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
)
