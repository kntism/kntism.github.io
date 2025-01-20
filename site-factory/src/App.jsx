import "./App.css";
import { tools } from "./lib/tools";

export default function App() {
  return (
    <>
      <main className="container">
        <section className="welcome">
          See All of My Favorite{" { "}
          <b>
            <a href="https://site.luling.xyz">Tools</a>
          </b>
          {" } "}
        </section>
        <section className="tools">
          {tools.map((tool) => (
            <div className="tool" key={tool.toolName}>
              <a href={tool.toolUrl} target="_blank" title={tool.description}>
                {tool.toolName}
              </a>
              <span className="updated-date">
                {" (Updated: " + tool.updatedDate + ")"}
              </span>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
