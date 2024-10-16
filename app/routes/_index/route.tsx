import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import * as style from "./style.css";
import blogConfig from "@/blog.config.json";

export const loader = () => {
  return json(blogConfig);
};

function Home() {
  const { home, author } = useLoaderData<typeof loader>();

  return (
    <div className="root-section">
      <img
        className={style.profile}
        src={home.profile}
        alt={author}
        draggable={false}
      />
      <p className={style.description}>
        {home.description.map((v) => (
          <span key={v}>{v}</span>
        ))}
      </p>
    </div>
  );
}

export default Home;
