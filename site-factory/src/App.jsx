import { tools } from "./lib/tools";

export default function App() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-[2rem]">
        <section className="text-4xl font-bold">
          {" { "}
          <b>
            <a href="https://site.luling.xyz">Tools</a>
          </b>
          {" } "}
        </section>
        <section className="flex flex-col gap-[1rem]">
          {tools.map((tool) => (
            <a
              href={tool.toolUrl}
              target="_blank"
              title={tool.updatedDate}
              key={tool.toolName}
            >
              <div className="rounded-lg border text-card-foreground relative overflow-hidden transition-colors bg-zinc-50  border-zinc-200  hover:border-zinc-500">
                <div className="flex items-center p-4">
                  <div className="flex-shrink-0 mr-4">{tool.emoji}</div>
                  <div className="flex-grow min-w-[376px]">
                    <h2 className="text-lg font-medium truncate text-zinc-900 dark:text-zinc-100">
                      {tool.toolName}
                    </h2>
                    <span className="text-xs truncate text-zinc-900 dark:text-zinc-100 opacity-80">
                      {tool.description}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </section>
      </div>
    </>
  );
}
