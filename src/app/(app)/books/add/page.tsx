import { createBook } from "./_actions";

export default async function AddBookPage() {
  return (
    <form action={createBook}>
      <label htmlFor="title">Titre du livre</label>
      <input id="title" name="title" type="text" placeholder="titre" />

      <input type="submit" value="Creer" />
    </form>
  );
}
