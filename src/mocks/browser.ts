import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Service Worker config
export const worker = setupWorker(...handlers);
