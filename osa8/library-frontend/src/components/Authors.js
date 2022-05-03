import { throwServerError, useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useEffect, useState } from "react";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [error, setError] = useState("");

  const [addAge, result] = useMutation(EDIT_AUTHOR);

  const authors = useQuery(ALL_AUTHORS);
  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError("author not found");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }
  if (authors.loading) {
    return <div>loading...</div>;
  }
  const submit = async (event) => {
    event.preventDefault();
    if (name === "" || born === "") {
      setError("both fields are required");
      setTimeout(() => {
        setError("");
      }, 5000);
      return null;
    }

    addAge({ variables: { name, born: parseInt(born) } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Set birthyear
        <form onSubmit={submit}>
          <div>
            <label>name</label>
            {/* <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            /> */}
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              <option disabled defaultValue={true} value="">
                Select an author
              </option>
              {authors.data.allAuthors.map((a) => (
                <option value={a.name} key={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>born</label>
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
        <div>{error}</div>
      </div>
    </div>
  );
};

export default Authors;
