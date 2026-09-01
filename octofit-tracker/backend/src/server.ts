import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    database: 'mongodb://localhost:27017/octofit_db',
  });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on http://localhost:${port}`);
});
