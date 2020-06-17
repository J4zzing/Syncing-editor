import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import DocHeader from "./components/DocHeader";
import DocList from "./components/DocList";
import SyncingEditor from "./components/SyncingEditor";
import io from "socket.io-client";
import { server } from "./components/CONSTANTS";
import ChatBoard from "./components/ChatBoard";

const socket = io(server);

function App() {
  return (
    <BrowserRouter>
      <DocHeader />
      <Route exact path="/" render={() => <Redirect to="/docs/" />} />
      <Route exact path="/docs/" component={DocList} />
      <Route path="/docs/:id">
        <div className="container-fluid d-flex flex-wrap">
          <SyncingEditor socket={socket} />
          <ChatBoard socket={socket} />
        </div>
      </Route>
    </BrowserRouter>
  );
}

export default App;
