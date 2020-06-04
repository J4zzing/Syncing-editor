import React, { useRef, useState, useEffect } from "react";
import { Editor, OnChangeParam } from "slate-react";
import { Operation, Value } from "slate";
import io from "socket.io-client";
import { RouteComponentProps } from "react-router-dom";

const socket = io("http://localhost:4000");

const SyncingEditor: React.FC<RouteComponentProps<{ id: string }>> = ({
  match: {
    params: { id: groupId },
  },
}) => {
  const editor = useRef<Editor | null>(null);
  const remote = useRef(false);
  const editorId = useRef(`${Date.now()}`);
  // const { id: groupId } = props.match.params;
  const [value, setValue] = useState<Value | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/groups/${groupId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setValue(Value.fromJSON(data));
      });

    socket.on(
      `remote-operations-to-${groupId}`,
      ({ from: remoteEditorId, ops }: { from: string; ops: Operation[] }) => {
        if (editorId.current !== remoteEditorId) {
          console.log("remote operations coming.");
          remote.current = true;
          ops.forEach((o: Operation) => editor.current!.applyOperation(o));
          remote.current = false;
        }
      }
    );
  }, []);

  return !value ? (
    <h1>Loading...</h1>
  ) : (
    <Editor
      style={{
        backgroundColor: "#f1f1f1",
        minHeight: "50vh",
      }}
      ref={editor}
      value={value}
      onChange={(opts: OnChangeParam) => {
        setValue(opts.value);
        if (remote.current) return;

        const ops = opts.operations
          .filter((o: Operation | undefined) => {
            if (o)
              return (
                o.type !== "set_selection" &&
                o.type !== "set_value" &&
                (!o.data || !o.data.has("source"))
              );

            return false;
          })
          .toJS()
          .map((o: Operation) => ({
            ...o,
            data: { source: "one" },
          }));

        if (ops.length)
          socket.emit("new-operations", {
            from: editorId.current,
            to: groupId,
            ops,
            value: opts.value.toJSON(),
          });
      }}
    ></Editor>
  );
};

export default SyncingEditor;
