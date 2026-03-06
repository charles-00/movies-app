import { Client, Databases, ID, Query, TablesDB } from "appwrite";

const DATABASE_ID = "69a8ab34003c8b9cea73";
const PROJECT_ID = "69a8a9a300363f24ccdc";
const PROJECT_NAME = "movies_app";
const APPWRITE_ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const TABLE_ID = "69a8ab34003c8b9crf66";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await tablesDB.listRows(
      {
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
      },
      Query.equal("searchTerm", searchTerm)
    );

    const row = result.rows.find((row) => row.movie_id == movie.id);
    if (result.total > 0 && row) {
      await tablesDB.updateRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: row.$id,
        data: {
          count: row.count + 1,
        },
      });
    } else {
      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingMovies = async () => {
  const result = await tablesDB.listRows({
    databaseId: DATABASE_ID,
    tableId: TABLE_ID,
    queries: [Query.orderDesc("count"), Query.limit(5)],
  });
  return result.rows;
};
