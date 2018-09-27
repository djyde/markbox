import * as marked from "marked";
import axios from "axios";
import transformers from "./transformers";

type Options = {
  embedOptions?: { [key: string]: any }
}

export async function parse(text, options: Options = {}) {
  const tokens = marked.lexer(text);

  const { embedOptions = {} } = options

  const format = tokens.map(async item => {
    if (item.type === "code") {
      const {parameters, embedOptions: customEmbedOptions = {} } = transformers[item.lang](item.text)

      const res = await axios.post(
        `https://codesandbox.io/api/v1/sandboxes/define?json=1`,
        {
          parameters
        }
      );

      const sandboxId = res.data.sandbox_id;

      const finalEmbedOptions = Object.assign({}, embedOptions, customEmbedOptions)
      const embedOptionsString = Object.keys(finalEmbedOptions).map(name => {
        return `${name}=${finalEmbedOptions[name]}`
      }).join('&')

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
