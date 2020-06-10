import React, { useRef, useState, useEffect } from "react";
import { Operation, Value } from "slate";
import {
  Editor,
  OnChangeParam,
  RenderBlockProps,
  RenderMarkProps,
} from "slate-react";
import { RouteComponentProps } from "react-router-dom";
// import _ from "lodash";
import io from "socket.io-client";

import "bootstrap/dist/css/bootstrap.css";
import { loadingValue } from "./loadingValue";
import {
  CodeBlock,
  BoldMark,
  ItalicMark,
  UnderscoreMark,
  CodeMark,
  StrikethroughMark,
  QuoteBlock,
} from "./Nodes";
import { EditorToolbar } from "./EditorToolbar";

const server = "http://localhost:4000";
const socket = io(server);
const onKeyDownPlugin = ({
  key,
  type,
  isMark = true,
}: {
  key: string;
  type: string;
  isMark?: boolean;
}) => {
  return {
    onKeyDown(event: React.KeyboardEvent, editor: Editor, next: () => any) {
      if (event.key !== key) return next();

      if (isMark && event.ctrlKey) {
        editor.toggleMark(type);
      } else if (event.ctrlKey && event.altKey) {
        const isActive = editor.value.blocks.some(
          (block) => block!.type === type
        );
        editor.setBlocks(isActive ? "paragraph" : type);
      } else {
        return next();
      }

      event.preventDefault();
    },
  };
};

const plugins = [
  onKeyDownPlugin({ key: "b", type: "bold" }),
  onKeyDownPlugin({ key: "i", type: "italic" }),
  onKeyDownPlugin({ key: "u", type: "underscore" }),
  onKeyDownPlugin({ key: "`", type: "code" }),
  onKeyDownPlugin({ key: "~", type: "strikethrough" }),
  onKeyDownPlugin({ key: "z", type: "code", isMark: false }),
  onKeyDownPlugin({ key: "e", type: "blockquote", isMark: false }),
];

const SyncingEditor: React.FC<RouteComponentProps<{ id: string }>> = ({
  match: {
    params: { id: groupId },
  },
}) => {
  const editor = useRef<Editor | null>(null);
  const editorId = useRef(`${Date.now()}`);
  // const { id: groupId } = props.match.params;
  const [value, setValue] = useState<Value | null>(null);

  useEffect(() => {
    fetch(`${server}/groups/${groupId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setValue(Value.fromJSON(data.value));
        console.log(data);
      });

    const eventName = `remote-operations-to-${groupId}`;
    socket.on(
      eventName,
      ({ from: remoteEditorId, ops }: { from: string; ops: Operation[] }) => {
        if (editorId.current !== remoteEditorId) {
          // console.log("remote operations coming.", ops);
          ops.forEach((o: Operation) => editor.current!.applyOperation(o));
        }
      }
    );
    return () => {
      socket.off(eventName);
    };
  }, [groupId]);

  // TODO: 使用Lodash deboundced节省网络资源
  const handleChange = (params: OnChangeParam) => {
    console.log(value?.toJSON());
    setValue(params.value);

    const ops = params.operations
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
        data: { source: editorId.current },
      }));

    if (ops.length)
      socket.emit("new-operations", {
        from: editorId.current,
        to: groupId,
        ops,
        value: params.value.toJSON(),
      });
  };

  const handleToggleButton = (event: React.MouseEvent<Element>) => {
    event.preventDefault();
    // unhappy here, I shouldn't need to cast the event target
    const target = event.currentTarget as Element;
    const type = target.getAttribute("data-btn-toggle");

    switch (type) {
      // toggle marks
      case "bold":
      case "italic":
      case "underlined":
      case "strikethrough":
      case "code":
        editor.current?.toggleMark(type);
        // if (value?.activeMarks.some((mark) => mark?.type === markType))
        // target.classList.toggle("active");
        break;
      // toggle blocks
      case "blockcode":
      case "blockquote":
        const isActive = hasSelectBlock(type);
        if (isActive !== null)
          editor.current?.setBlocks(isActive ? "paragraph" : type);
        break;
      default:
        return;
    }
  };

  const hasSelectMark = (type: string) => {
    return value?.activeMarks.some((mark) => mark?.type === type);
  };

  const hasSelectBlock = (type: string) => {
    return value?.blocks.some((block) => block?.type === type);
  };

  const handleRenderBlock = (
    props: RenderBlockProps,
    editor: Editor,
    next: () => any
  ) => {
    switch (props.node.type) {
      case "blockcode":
        return <CodeBlock {...props} />;
      case "blockquote":
        return <QuoteBlock {...props} />;
      default:
        return next();
    }
  };

  const handleRenderMark = (
    props: RenderMarkProps,
    editor: Editor,
    next: () => any
  ) => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;
      case "italic":
        return <ItalicMark {...props} />;
      case "underlined":
        return <UnderscoreMark {...props} />;
      case "code":
        return <CodeMark {...props} />;
      case "strikethrough":
        return <StrikethroughMark {...props} />;
      default:
        return next();
    }
  };

  return (
    <div className="container">
      <EditorToolbar
        handleToggleButton={handleToggleButton}
        isActive={hasSelectMark}
      />
      <Editor
        style={{
          backgroundColor: "#f1f1f1",
          minHeight: "50vh",
        }}
        ref={editor}
        value={value || loadingValue}
        readOnly={value ? false : true}
        plugins={plugins}
        onChange={handleChange}
        renderBlock={handleRenderBlock}
        renderMark={handleRenderMark}
      />
    </div>
  );
};

export default SyncingEditor;
