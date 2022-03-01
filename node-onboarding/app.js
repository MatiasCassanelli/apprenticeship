import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

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

const getProjectCards = async (columns_url) => {
  const projectCards = [];

  // fetch columns to get card_url
  const columns = await fetchData(columns_url);
  for (const { cards_url } of columns) {
    const cards = await fetchData(cards_url);
    for (const { note, url } of cards) {
      projectCards.push(note || url);
    }
  }

  return projectCards;
};

const getCardsByProject = async (repository, userName, regex) => {
  const url = `${BASE_URL}/repos/${userName}/${repository}/projects`;
  try {
    // fetch repo to get project data.
    const projects = await fetchData(url);
    const cardsByProject = {};

    for (const { name: projectName, columns_url } of projects) {
      if (projectName.match(regex) || !regex) {
        const projectCards = await getProjectCards(columns_url);
        cardsByProject[projectName] = [...projectCards];
      }
    }
    return cardsByProject;
  } catch (error) {
    throw `${error.status} - ${error.statusText}`;
  }
};

const [, , repo, userName, regex] = process.argv;
console.log('Using the following parameters to make the request');
console.table([{ repo, userName, regex }]);

if (repo && userName) {
  getCardsByProject(repo, userName, regex)
    .then((res) => {
      Object.keys(res).forEach((key) => {
        console.log(`Tickets for ${key} project\n`);
        const cards = res[key];
        if (cards?.length) {
          cards.forEach((value, index) => {
            console.log(`${index + 1} - ${value}`);
          });
        } else {
          console.log('Any card was found');
        }
        console.log('-------------------\n');
      });
    })
    .catch((err) => console.error(err));
} else {
  console.log('Repository and user names are mandatory');
}
