import React from "react";
import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  Code,
  FormatQuote,
} from "@material-ui/icons";
import "jquery";
import "bootstrap/dist/js/bootstrap.bundle";

const marks = {
  bold: {
    tooltip: "加粗(Ctrl+B)",
    component: <FormatBold />,
  },
  italic: {
    tooltip: "斜体(Ctrl+I)",
    component: <FormatItalic />,
  },
  underlined: {
    tooltip: "加下划线(Ctrl+U)",
    component: <FormatUnderlined />,
  },
  strikethrough: {
    tooltip: "加删除线(Ctrl+~)",
    component: <FormatStrikethrough />,
  },
  code: {
    tooltip: "代码(Ctrl+`)",
    component: <Code />,
  },
};
const blocks = {
  blockquote: {
    tooltip: "引用(Ctrl+Alt+E)",
    component: <FormatQuote />,
  },
  blockcode: {
    tooltip: "代码块(Ctrl+Alt+Z)",
    component: <Code />,
  },
};

interface Props {
  onClick: (e: React.MouseEvent) => void;
  isActive: (type: string) => boolean | undefined;
}

export const DocToolbar: React.FC<Props> = (props) => {
  const toButtons = ([key, val]: any) => (
    <Button
      key={key}
      variant="outline-info"
      active={props.isActive(key)}
      onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
      onClick={props.onClick}
      data-btn-toggle={key}
      data-toggle="tooltip"
      data-placement="bottom"
      title={val.tooltip}
    >
      {val.component}
    </Button>
  );

  const toggleMarkButtons = Object.entries(marks).map(toButtons);
  const toggleBlockButtons = Object.entries(blocks).map(toButtons);

  return (
    <ButtonToolbar>
      <ButtonGroup className="mr-2">{toggleMarkButtons}</ButtonGroup>
      <ButtonGroup className="mr-2">{toggleBlockButtons}</ButtonGroup>
    </ButtonToolbar>
  );
};
