import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "./CONSTANTS";

const DocList = () => {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => {
    fetch(`${server}/docs/`)
      .then((res) => {
        return res.json();
      })
      .then((docList) => {
        setList(
          docList.map((doc: any) => {
            return doc["_id"];
          })
        );
      });
    return () => {
      //
    };
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>所有公开文档</h1>
      {list
        ? list.map((id) => (
            <p key={id}>
              <Link to={`/docs/${id}`}>{`文档：${id}`}</Link>
            </p>
          ))
        : "..."}
    </div>
  );
};

export default DocList;
