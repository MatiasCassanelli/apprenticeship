import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = 3000;

const BASE_URL = 'https://api.github.com';

const fetchData = async (url) => {
  const response = await fetch(url);
  if (response?.ok) {
    return response.json();
  }
  throw response;
}

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

app.get('/projects/:userName/:repository', async (req, res) => {
  const { repository, userName } = req.params;
  const url = `${BASE_URL}/repos/${userName}/${repository}/projects`;
  try {
    // fetch repo to get project data.
    const projects = await fetchData(url);
    const cardsByProject = {};

    projects?.forEach(async ({ name: projectName, columns_url }) => {
      cardsByProject[projectName] = [];

      // fetch columns to get card_url
      const columns = await fetchData(columns_url);
      columns?.forEach(async ({ cards_url }) => {
        // fetch card data using card_url returned by each column
        const cards = await fetchData(cards_url);
        cards?.forEach(({ note }) => cardsByProject[projectName].push(note));
      });
    });
    res.send(cardsByProject);
  } catch (error) {
    res.send(`${error.status} - ${error.statusText}`)
  }
});

export default app;
