import React, { Children } from "react";
import axios from "axios";

export default function Header() {
  // function handlePesquisaHot(){
  //   axios.get("https://www.reddit.com/r/reactjs.json")
  //   .then((response) => {
  //     const posts = response.data;
  //     const postsAutor = []

  //     posts.map((post) => {
  //        postsAutor.push(post.dist)
  //     })

  //     console.log(postsAutor)
  //   })
  // }

  const [hot, setHot] = React.useState([]);

  function handlePesquisa(event) {
    const url = `https://www.reddit.com/r/reactjs/${event.target.innerText.toLowerCase()}.json`;
    //const posts = [];
    axios
      .get(url)
      .then((response) => {
        const data = response.data.data.children;

        const posts = [];
        setHot(posts)

        data.map((autor) => {
          posts.push(autor.data);
        });

        setHot(posts);

        console.log(hot);
      })

      .catch((error) => console.log(error));
  }

  return (
    <header>
      <div className="bg-primary py-4">
        <div className="container mx-auto">
          <h2 className="text-white text-4xl font-bold text-center">
            REACT<span className="text-yellow-500">JS</span>
          </h2>
        </div>
      </div>
      <nav className="container mx-auto">
        <div className="flex justify-center my-4 gap-5">
          <button
            onClick={handlePesquisa}
            className="bg-slate-400 py-3 px-20 rounded-lg text-white"
          >
            Hot
          </button>
          <button onClick={handlePesquisa} className="bg-slate-400 py-3 px-20 rounded-lg text-white">
            New
          </button>
          <button onClick={handlePesquisa} className="bg-slate-400 py-3 px-20 rounded-lg text-white">
            Rising
          </button>
        </div>
      </nav>
      {hot.map((post) => (
        <p key={post.id}>{post.author}</p>
      ))}
    </header>
  );
}
// .then(response => console.log(response.data))
