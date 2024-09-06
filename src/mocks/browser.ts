import { setupWorker } from 'msw/browser'; // Use setupServer instead if applicable
import { handlers } from './handlers';

// Set up the Service Worker
export const worker = setupWorker(...handlers); // Adjusted to use setupServer