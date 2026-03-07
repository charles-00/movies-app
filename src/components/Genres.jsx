import React from "react";

const Genres = ({ genres, setSelectedGenre }) => {
  return (
    <div className="search w-[100%] m-0 mb-5">
      <div>
        <select name="genre" onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Select Your Favorite Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Genres;
