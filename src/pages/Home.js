import React from "react";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";
import "moment/locale/pt";

export default function Home() {
  const [post, setPost] = React.useState([]);

  function handlePesquisa(event) {
    const url = `https://www.reddit.com/r/reactjs/${event.target.innerText.toLowerCase()}.json`;
    axios
      .get(url)
      .then((response) => {
        const data = response.data.data.children;

        const posts = [];

        data.map((autor) => {
          posts.push(autor.data);
        });

        setPost(posts);
      })

      .catch((error) => console.log(error));

    console.log(post);
  }

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
            onClick={handlePesquisa}
            className="w-full bg-slate-400 py-3 px-20 rounded-lg text-white hover:bg-primary md:w-fit"
          >
            Hot
          </button>
          <button
            onClick={handlePesquisa}
            className="w-full bg-slate-400 py-3 px-20 rounded-lg text-white hover:bg-primary md:w-fit"
          >
            New
          </button>
          <button
            onClick={handlePesquisa}
            className="w-full bg-slate-400 py-3 px-20 rounded-lg text-white hover:bg-primary md:w-fit"
          >
            Rising
          </button>
        </div>

        <div>
          {post.map((post) => (
            <div key={post.id} className="flex gap-4 py-3 border-t-2">
              <div>
                <img
                  src="http://placeimg.com/77/77/tech"
                  className="rounded-lg"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold">{post.title}</h4>
                <p className="text-slate-500">
                  enviado {converterData(post.created)} por
                  <span className="text-primary">{post.author}</span>
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
          <button className="bg-primary text-white w-full rounded-md py-2 mb-5">
            ✛ Ver mais
          </button>
        )}
      </section>
    </div>
  );
}
