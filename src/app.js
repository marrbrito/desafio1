const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid Repository ID." });
  }

  return next();
}

app.use("/repositories/:id", validateRepositoryId);

app.get("/repositories", (request, response) => {
  // TODO
  const { title } = request.query;

  const results = title
    ? repositories.filter((repository) => repository.title.includes(title))
    : repositories;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  likes = 0;

  const repository = { id: uuid(), title, url, techs, likes };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const repository = {
    id,
    title,
    url,
    techs,
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const index = repositories.findIndex((obj) => obj.id == id);

  if (index < 0) {
    return response.status(400).json({ mensage: "Repository not found" });
  }

  let repository = repositories[index];
  repository.likes++;
  repositories[index] = repository;

  return response.status(200).json(repository);
});

module.exports = app;
