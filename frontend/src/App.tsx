import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import SyncingEditor from "./components/SyncingEditor";
import "./App.css";
import { DocHeader } from "./components/DocHeader";
import { DocList } from "./components/DocList";

function App() {
  return (
    <>
      <BrowserRouter>
        <DocHeader />
        <Route exact path="/" render={() => <Redirect to="/groups/public" />} />
        <Route exact path="/groups/" component={DocList} />
        <Route path="/groups/:id">
          <SyncingEditor />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
