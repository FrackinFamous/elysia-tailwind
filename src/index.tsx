import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { twind } from "./twind";

interface CounterProps {
  count: number;
}
interface CounterButtonProps {
  icon: string;
  url: string;
}
let counter: CounterProps = { count: 0 };

const CounterButtonComponent = ({ url, icon }: CounterButtonProps) => {
  return (
    <button
      class={"p-5 rounded bg-gray-300"}
      hx-post={url}
      hx-target={"#counter"}
      hx-swap={"outerHTML"}
    >
      {icon}
    </button>
  );
};
const CounterComponent = () => {
  return <span id={"counter"}>{counter.count}</span>;
};
const EmojiComponent = () => {
  return (
    <div
      class={"flex text-9xl mt-4"}
      hx-target={"#emoji"}
      hx-swap={"innerHTML"}
    >
      {counter.count > 0 ? "😊" : counter.count < 0 ? "😞" : "😐"}
    </div>
  );
};
const Counter = () => {
  return (
    <div class={"container mx-auto"}>
      <h1 class={"text-3xl font-bold underline"}>HTMX Counter</h1>
      <div
        class={"mt-10 flex gap-5 drop-shadow text-4xl font-bold items-center "}
      >
        <CounterButtonComponent url={"/dec"} icon={"-"} />
        <CounterComponent />
        <CounterButtonComponent url={"/inc"} icon={"+"} />
      </div>
      <EmojiComponent />
    </div>
  );
};

const app = new Elysia()
  .use(staticPlugin())
  .use(twind)
  .use(html())
  .get("/", () => {
    return (
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta property="og:title" content="HTMX Counter" />
          <meta
            property="og:description"
            content="A simple counter using HTMX"
          />
          <meta
            property="og:image"
            content="https://placekitten.com/1200/630"
          />
          <script src="public/htmx.min.js" />
          <link rel="stylesheet" type="text/css" href="public/main.css" />
        </head>
        <body class={"bg-slate-500"}>{Counter()}</body>
      </html>
    );
  })
  .post("/dec", () => {
    counter.count--;
    return CounterComponent();
  })
  .post("/inc", () => {
    counter.count++;
    return CounterComponent();
  })
  .get("/emoji", () => {
    return EmojiComponent();
  })
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
