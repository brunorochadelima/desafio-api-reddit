import React from "react";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";
import "moment/locale/pt";

export default function Home() {
  const [post, setPost] = React.useState([]);
  const [page, setPage] = React.useState("");
  const [loadPosts, setloadPosts] = React.useState(5);

  function carregarPosts() {
    setloadPosts(loadPosts + 5);
  }

  const searchApi = React.useCallback(async () => {
    const url = `https://www.reddit.com/r/reactjs/${page}.json?limit=${loadPosts}`;
    axios
      .get(url)
      .then((response) => {
        const data = response.data.data.children;

        const posts = [];

        // eslint-disable-next-line array-callback-return
        data.map((autor) => {
          posts.push(autor.data);
        });

        setPost(posts);
      })

      .catch((error) => console.log(error));

    console.log(post);
  }, [page, loadPosts]);

  React.useEffect(() => {
    searchApi();
  }, [searchApi]);

  function converterData(unixDate) {
    moment.locale("pt");
    const unixTime = unixDate * 1000;
    const tempo = moment(unixTime).startOf("hour").fromNow();
    return tempo;
  }

  return (
    <div>
      <Header />
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center my-4 gap-5">
          <button
            onClick={() => setPage("hot")}
            className={`w-full  py-3 px-20 rounded-lg text-white hover:bg-primary md:w-fit ${page === "hot" ? "bg-primary" : "bg-slate-400"}`}
          >
            Hot
          </button>
          <button
            onClick={() => setPage("new")}
            className={`w-full  py-3 px-20 rounded-lg text-white hover:bg-primary md:w-fit ${page === "new" ? "bg-primary" : "bg-slate-400"}`}
          >
            New
          </button>
          <button
            onClick={() => setPage("rising")}
            className={`w-full  py-3 px-20 rounded-lg text-white hover:bg-primary md:w-fit ${page === "rising" ? "bg-primary" : "bg-slate-400"}`}
          >
            Rising
          </button>
        </div>

        <div>
          {post.map((post) => (
            <div key={post.id} className="flex flex-wrap gap-4 py-3 border-t-2">
              <div>
                <img
                  src="http://placeimg.com/77/77/tech"
                  className="rounded-lg"
                  alt={post.title}
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold">{post.title}</h4>
                <p className="text-slate-500">
                  enviado {converterData(post.created)} por{" "}
                  <span className="text-primary"> {post.author}</span>
                </p>
                <a
                  className="font-semibold"
                  href={`https://www.reddit.com${post.permalink}`}
                >
                  Link do post
                </a>
              </div>
            </div>
          ))}
        </div>
        {post.length > 0 && (
          <button
            onClick={carregarPosts}
            className="bg-primary text-white w-full rounded-md py-2 mb-5"
          >
            ✛ Ver mais
          </button>
        )}
      </section>
    </div>
  );
}
