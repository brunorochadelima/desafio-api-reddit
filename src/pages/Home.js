import React from "react";
import axios from "axios";
import Header from "../components/Header";
import moment from "moment";

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

  function converterData() {
    const unixTime = 1654050387 * 1000;

    // const dateVal = new Date(unixTime).toLocaleDateString("pt-BR");
    // console.log(dateVal);

    const tempo = moment(unixTime).startOf("hour").fromNow();

    console.log(tempo);
  }

  converterData();

  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <div className="flex justify-center my-4 gap-5">
          <button
            onClick={handlePesquisa}
            className="bg-slate-400 py-3 px-20 rounded-lg text-white"
          >
            Hot
          </button>
          <button
            onClick={handlePesquisa}
            className="bg-slate-400 py-3 px-20 rounded-lg text-white"
          >
            New
          </button>
          <button
            onClick={handlePesquisa}
            className="bg-slate-400 py-3 px-20 rounded-lg text-white"
          >
            Rising
          </button>
        </div>
      </div>

      {post.map((post) => (
        <div key={post.id}>
          <h4>{post.title}</h4>
          <p>
            Enviado há {post.created} por {post.author}
          </p>
          <p>{post.permalink}</p>
        </div>
      ))}
    </div>
  );
}
