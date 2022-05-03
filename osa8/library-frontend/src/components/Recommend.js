import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ME, ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const user = useQuery(ME);
  const [genre, setGenre] = useState(null);
  //   const genre = user.data.me.favoriteGenre;
  //   const books = useQuery(ALL_BOOKS, {
  //     variables: { genre: genre },
  //   });
  useEffect(() => {
    if (!user.loading) {
      setGenre(user.data.me.favoriteGenre);
      console.log(genre);
    }
  }, [user.loading]);

  const books = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
  });

  if (!props.show) {
    return null;
  }
  if (user.loading || books.loading) {
    return null;
  }

  return (
    <div>
      <div>
        <h2>recommendations</h2>
        <p>
          {/* books in your favorite genre <b>{user.data.me.favoriteGenre}</b> */}
        </p>
      </div>
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
    </div>
  );
};
export default Recommend;
