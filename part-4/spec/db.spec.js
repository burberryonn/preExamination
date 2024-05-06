/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable global-require */
const fs = require('fs');

describe('Part 4 tests', () => {
  it('Присутствует файл .sequelizerc в корне проекта', () => {
    expect(fs.existsSync('./.sequelizerc')).toBe(true);
  });

  it('В папке с моделями присутствуют нужные файлы', async () => {
    const paths = require('../../.sequelizerc');
    const filenames = fs.readdirSync(paths['models-path']);
    expect(filenames.length).toBe(3);
    expect(filenames).toContain('index.js');
  });

  it('В папке с миграциями присутствуют нужные файлы', async () => {
    const paths = require('../../.sequelizerc');
    const filenames = fs.readdirSync(paths['migrations-path']);
    expect(filenames.length).toBe(2);
  });
});
