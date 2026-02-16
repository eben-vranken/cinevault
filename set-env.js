const fs = require('fs');
const dir = './src/environments';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const content = `
export const environment = {
  tmdbToken: '${process.env.TMDB_TOKEN}'
};
`;

fs.writeFileSync(`${dir}/environment.ts`, content);
fs.writeFileSync(`${dir}/environment.development.ts`, content);