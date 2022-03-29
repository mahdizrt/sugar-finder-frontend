import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { App } from "./App";
import { theme } from "./theme";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
