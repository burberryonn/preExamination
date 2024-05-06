const path = require('path');
const { getFilesFromFolder, readOneFile, getUsersArray } = require('../users');

describe('Part 2 tests', () => {
  let pathToFolder;

  beforeEach(() => {
    pathToFolder = path.join(__dirname, '..', 'data');
  });

  describe('getFilesFromFolder', () => {
    it('Функция getFilesFromFolder возвращает Promise', () => {
      expect(getFilesFromFolder(pathToFolder).toString()).toBe('[object Promise]');
    });

    it('Функция getFilesFromFolder возвращает массив файлов', async () => {
      const result = await getFilesFromFolder(pathToFolder);
      expect(result).toEqual(['ids.txt', 'ids2.txt']);
    });
  });

  describe('Функция readOneFile', () => {
    it('Функция readOneFile возвращает Promise', () => {
      expect(readOneFile(path.join(pathToFolder, 'ids.txt')).toString()).toBe('[object Promise]');
    });

    it('Функция readOneFile возвращает содержимое файла в виде массива цифр', async () => {
      const firsFile = await readOneFile(path.join(pathToFolder, 'ids.txt'));
      const secondFile = await readOneFile(path.join(pathToFolder, 'ids2.txt'));
      expect(firsFile).toEqual([1, 4, 6]);
      expect(secondFile).toEqual([2, 7, 5]);
    });
  });

  describe('Функция getUsersArray', () => {
    it('Функция getUsersArray возвращает Promise', () => {
      expect(getUsersArray(path.join(pathToFolder, 'ids.txt')).toString()).toBe('[object Promise]');
    });

    it('Функция getUsersArray использует внутри себя функцию readOneFile', async () => {
      expect(getUsersArray.toString()).toContain('readOneFile');
    });

    it('Функция getUsersArray использует внутри себя Promise.all', async () => {
      expect(getUsersArray.toString()).toContain('Promise.all');
    });

    it('Функция getUsersArray возвращает массив имен пользователей', async () => {
      const result = await getUsersArray(path.join(pathToFolder, 'ids.txt'));
      expect(result).toEqual(['Leanne Graham', 'Patricia Lebsack', 'Mrs. Dennis Schulist']);
    });

    it('Функция getUsersArray корректно работает для второго файла', async () => {
      const result = await getUsersArray(path.join(pathToFolder, 'ids2.txt'));
      expect(result).toEqual(['Ervin Howell', 'Kurtis Weissnat', 'Chelsey Dietrich']);
    });
  });
});
