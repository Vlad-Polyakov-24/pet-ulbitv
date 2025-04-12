import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ErrorBoundary } from '@app/providers/ErrorBoundary';
import { StoreProvider } from '@app/providers/StoreProvider';
import { ThemeProvider } from '@app/providers/ThemeProvider';
import App from '@app/App';
import '@shared/config/i18n/i18n';
import '@app/styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>,
);
