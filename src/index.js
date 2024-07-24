import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import StateContext from "./Context/StatesContext";
import store from "./Store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <StateContext>
        <App />
      </StateContext>
    </Provider>
  </StrictMode>
);
