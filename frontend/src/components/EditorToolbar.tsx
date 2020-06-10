import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ButtonToolbar, ButtonGroup, Button } from "react-bootstrap";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  Code,
  FormatQuote,
} from "@material-ui/icons";

interface Props {
  handleToggleButton: (e: React.MouseEvent) => void;
  isActive: (type: string) => boolean | undefined;
}

const markIcons = {
  bold: <FormatBold />,
  italic: <FormatItalic />,
  underlined: <FormatUnderlined />,
  strikethrough: <FormatStrikethrough />,
  code: <Code />,
};
const blockIcons = {
  blockcode: <Code />,
  blockquote: <FormatQuote />,
};
export const EditorToolbar: React.FC<Props> = (props) => {
  const toButtons = ([type, Icon]: [string, JSX.Element]) => (
    <Button
      key={type}
      variant="primary"
      active={props.isActive(type)}
      onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
      onClick={props.handleToggleButton}
      data-btn-toggle={type}
    >
      {Icon}
    </Button>
  );

  const toggleMarkButtons = Object.entries(markIcons).map(toButtons);
  const toggleBlockButtons = Object.entries(blockIcons).map(toButtons);

  return (
    <ButtonToolbar>
      <ButtonGroup className="mr-2">{toggleMarkButtons}</ButtonGroup>
      <ButtonGroup className="mr-2">{toggleBlockButtons}</ButtonGroup>
    </ButtonToolbar>
  );
};
