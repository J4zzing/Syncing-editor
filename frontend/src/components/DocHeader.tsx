import React, { useRef } from "react";
import { Description, Lock, NoteAdd } from "@material-ui/icons";
import { Button } from "react-bootstrap";
import { Link, useRouteMatch } from "react-router-dom";
import { NormalModal } from "./NormalModal";

interface Props {
  // group?: string;
}
export const DocHeader: React.FC<Props> = () => {
  const match = useRouteMatch<{ id: string }>("/groups/:id");
  let groupId = useRef<string | null>(null);
  const newDocModal = useRef<NormalModal>(null);
  if (match) {
    groupId.current = match.params.id;
  }
  let navLink;
  if (groupId.current) {
    if (match) {
      navLink = <Link to="/groups/">查看其他群组</Link>;
    } else {
      navLink = <Link to={`/groups/${groupId.current}`}>返回</Link>;
    }
  }

  return (
    <>
      <header className="d-flex flex-row bg-light ">
        <div className="doc-brand">
          <Description style={{ fontSize: 64, color: "#17a2b8" }} />
        </div>
        <div className="d-flex flex-column flex-grow-1 align-self-center">
          <h1>当前群组：{groupId.current}</h1>
        </div>
        <div className="d-flex flex-column flex-grow-1 align-self-center">
          <h3>{navLink}</h3>
        </div>
        <div className="doc-header-buttons d-flex align-items-center">
          {/* <Button className="mr-3" variant="info">
          <Lock />
          共享
        </Button> */}
          <Button
            className="mr-3"
            variant="info"
            onClick={newDocModal.current?.handleShow}
          >
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
