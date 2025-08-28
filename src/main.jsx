import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./core/store/store.js";
import App from './App.jsx'
import { HeroUIProvider } from "@heroui/react";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <HeroUIProvider>
          <Provider store={store}>
              <App />
          </Provider>
      </HeroUIProvider>
  </StrictMode>,
)
