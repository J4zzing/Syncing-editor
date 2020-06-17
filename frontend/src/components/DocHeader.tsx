import React, { useRef } from "react";
import { Description, NoteAdd, Share } from "@material-ui/icons";
import { Button } from "react-bootstrap";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { NormalModal } from "./NormalModal";
import { server } from "./CONSTANTS";

interface Props {
  // onNewDoc: () => void;
}
const DocHeader: React.FC<Props> = () => {
  const match = useRouteMatch<{ id: string }>("/docs/:id");
  const history = useHistory();
  let docId = useRef<string | null>(null);
  const newDocModal = useRef<NormalModal>(null);

  if (match) {
    docId.current = match.params.id;
  }
  let navLink;
  if (docId.current) {
    if (match) {
      navLink = <Link to="/docs">查看其他群组</Link>;
    } else {
      navLink = <Link to={`/docs/${docId.current}`}>返回</Link>;
    }
  }

  const onNewDoc = async () => {
    const url = `${server}/docs/`;
    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    console.log(data);

    history.push("/docs/" + data._id);
  };

  return (
    <>
      <header className="d-flex flex-row flex-wrap bg-light ">
        <div className="doc-brand">
          <Description style={{ fontSize: 64, color: "#17a2b8" }} />
        </div>
        <div className="d-flex flex-column flex-grow-1 align-self-center">
          <h1>当前群组：{docId.current}</h1>
        </div>
        <div className="d-flex flex-column flex-grow-1 align-self-center">
          <h3>{navLink}</h3>
        </div>
        <div className="doc-header-buttons d-flex align-items-center">
          {/* <Button className="mr-3" variant="info">
            <Share />
            分享
          </Button> */}
          <Button className="mr-3" variant="info" onClick={onNewDoc}>
            <NoteAdd
              style={{ fontSize: "1.2rem", verticalAlign: "text-bottom" }}
            />
            新建文档
          </Button>
        </div>
      </header>
      <NormalModal ref={newDocModal} />
    </>
  );
};

export default DocHeader;
