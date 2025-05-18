import ReactDOM from 'react-dom/client';
import { App } from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('ServiceWorker registered', reg))
      .catch((err) => console.log('ServiceWorker registration failed', err));
  });
}
