import { Routes, Route } from "react-router-dom";

import { Layout } from "./components";
import { Home, Confirmed, UnConfirmed, Messages, Chats } from "./pages";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/confirmed" element={<Confirmed />} />
        <Route path="/unconfirmed" element={<UnConfirmed />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/chats/:id" element={<Chats />} />
      </Route>
    </Routes>
  );
}

export { App };
