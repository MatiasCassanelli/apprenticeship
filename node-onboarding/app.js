import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ silent: true });
const app = express();
const port = 3000;

const BASE_URL = 'https://api.github.com';

const fetchData = async (url) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.TOKEN}`,
    },
  });
  if (response?.ok) {
    return response.json();
  }
  throw response;
};

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

app.get('/projects/:userName/:repository', async (req, res) => {
  const { repository, userName } = req.params;
  const { regex } = req.query;
  const url = `${BASE_URL}/repos/${userName}/${repository}/projects`;
  try {
    // fetch repo to get project data.
    const projects = await fetchData(url);
    const cardsByProject = {};

    for (const { name: projectName, columns_url } of projects) {
      if (projectName.match(regex) || !regex) {
        const projectCards = [];

        // fetch columns to get card_url
        const columns = await fetchData(columns_url);
        for (const { cards_url } of columns) {
          const cards = await fetchData(cards_url);
          for (const { note, url } of cards) {
            projectCards.push(note || url);
          }
        }
        if (projectCards.length) {
          cardsByProject[projectName] = [...projectCards];
        } else {
          cardsByProject[projectName] = 'No cards found';
        }
      }
    }
    res.send(cardsByProject);
  } catch (error) {
    res.send(`${error.status} - ${error.statusText}`);
  }
});

export default app;
