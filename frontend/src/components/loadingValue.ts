import { Value } from "slate";

export const loadingValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            text: "加载中...",
          },
        ],
      },
    ],
  },
});
