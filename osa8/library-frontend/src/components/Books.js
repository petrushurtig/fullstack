import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  });
  const allBooks = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (!allBooks.loading) {
      const onlyGenres = allBooks.data.allBooks.map((b) => b.genres);
      const flatArray = [...new Set(onlyGenres.flat(1))];
      setGenres(flatArray);
    }
  }, [allBooks.loading]);
  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h2>books</h2>
      <div>{selectedGenre}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((item) => (
        <button
          key={item}
          value={item}
          onClick={(e) => setSelectedGenre(e.target.value)}
        >
          {item}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>all</button>
    </div>
  );
};

export default Books;
