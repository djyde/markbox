import * as marked from "marked";
import { getParameters } from "codesandbox/lib/api/define";
import axios from "axios";

type Options = {
  embedOptions?: { [key: string]: any }
}

export async function parse(text, options: Options = {}) {
  const tokens = marked.lexer(text);

  const { embedOptions = {} } = options

  const embedOptionsString = Object.keys(embedOptions).map(name => {
    return `${name}=${embedOptions[name]}`
  }).join('&')

  const format = tokens.map(async item => {
    if (item.type === "code") {
      const parameters = getParameters({
        files: {
          "index.js": {
            content: item.text,
            isBinary: false
          },
          "package.json": {
            isBinary: false,
            content: JSON.stringify({ dependencies: {} })
          }
        }
      });

      const res = await axios.post(
        `https://codesandbox.io/api/v1/sandboxes/define?json=1`,
        {
          parameters
        }
      );

      const sandboxId = res.data.sandbox_id;

      return {
        type: "html",
        pre: false,
        text: `<iframe class="codesandbox" src="https://codesandbox.io/embed/${sandboxId}?${embedOptionsString}"></iframe>`
      };
    } else {
      return item;
    }
  });

  const formatted = await Promise.all(format);

  //@ts-ignore
  formatted.links = tokens.links;

  const html = marked.parser(formatted);

  return html;
}
