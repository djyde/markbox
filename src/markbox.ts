import * as marked from "marked";
import axios from "axios";
import transformers from "./transformers";

type Options = {
  embedOptions?: { [key: string]: any },
  fallback?: boolean,
  useCache?: boolean
}

// A in memory cache
class MarkboxCache {

  boxes = [] as { id: string, parameters: string }[]

  get(parameters) {
    return this.boxes.find(item => item.parameters === parameters)
  }

  set (parameters, id) {
    const index = this.boxes.findIndex(item => item.parameters === parameters)
    if (index !== -1) {
      this.boxes[index] = { id, parameters }
    } else {
      this.boxes.push({ id, parameters })
    }
  }
}

const cache = new MarkboxCache()

export async function parse(text, options: Options = {}) {
  const tokens = marked.lexer(text);

  const { embedOptions = {}, useCache = true, fallback = false } = options

  const format = tokens.map(async (item, index) => {
    if (item.type === "code") {
      const transformer = transformers[item.lang]

      if (!transformer) {
        return item
      }

      const prevToken = tokens[index - 1]

      if (prevToken && prevToken.type === 'html' && prevToken.text.match('<!-- ignore -->')) {
        return item
      }

      const {parameters, embedOptions: customEmbedOptions = {} } = transformer(item.text)

      let sandboxId;

      if (useCache && cache.get(parameters)) {
        sandboxId = cache.get(parameters).id
      } else {
        try {
          const res = await axios.post(
            `https://codesandbox.io/api/v1/sandboxes/define?json=1`,
            {
              parameters
            }
          );
  
          sandboxId = res.data.sandbox_id;

          cache.set(parameters, sandboxId)
  
        } catch (e) {
          if (!fallback) {
            throw e
          }
        }
      }

      const finalEmbedOptions = Object.assign({}, embedOptions, customEmbedOptions)
      const embedOptionsString = Object.keys(finalEmbedOptions).map(name => {
        return `${name}=${finalEmbedOptions[name]}`
      }).join('&');

      if (!sandboxId && !fallback) {
        throw new Error('Network Error')
      }

      if (!sandboxId && fallback) {
        return item
      }

      return {
        type: "html",
        pre: false,
        text: `<iframe class="codesandbox" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" src="https://codesandbox.io/embed/${sandboxId}?${embedOptionsString}"></iframe>`
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
