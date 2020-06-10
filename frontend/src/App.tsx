import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import SyncingEditor from "./components/SyncingEditor";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <Redirect to="/groups/public" />} />
      <Route path="/groups/:id" component={SyncingEditor} />
    </BrowserRouter>
  );
}

export default App;
