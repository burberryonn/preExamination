const { getNumeric, getSum, getCitiesAndPackages } = require('../objects');

describe('Тесты part-3', () => {
  describe('getNumeric', () => {
    it('Возвращает массив с ключами, значения которых являются числами', () => {
      const object = {
        name: 'John',
        age: 30,
        year: 1990,
        city: 'New York',
      };

      const object2 = {
        size: 10,
        color: 'red',
        weight: 100,
      };

      const object3 = {};

      expect(getNumeric(object)).toEqual(['age', 'year']);
      expect(getNumeric(object2)).toEqual(['size', 'weight']);
      expect(getNumeric(object3)).toEqual([]);
    });
  });

  describe('Тесты getSum', () => {
    it('Возвращает undefined, если в объекте нет значений типа number ', () => {
      const object = {
        name: 'John',
        city: 'New York',
      };
      const object2 = {};
      expect(getSum(object)).toBe(undefined);
      expect(getSum(object2)).toBe(undefined);
    });

    it('Возвращает сумму всех значений типа number', () => {
      const object = {
        name: 'John',
        age: 30,
        year: 1990,
        city: 'New York',
      };

      const object2 = {
        size: 10,
        color: 'red',
        weight: 100,
      };
      expect(getSum(object)).toBe(2020);
      expect(getSum(object2)).toBe(110);
    });
  });

  describe('Тесты getCitiesAndPackages', () => {
    it('Принимает двумерный массив, возвращает объект, где ключи - названия городов, а значения - массивы с названиями пакетов', () => {
      const packages = [
        ['Moscow', 'package-1'],
        ['Kaliningrad', 'package-2'],
        ['Tula', 'package-3'],
        ['Moscow', 'package-4'],
        ['Tula', 'package-5'],
        ['Tula', 'package-6'],
      ];

      expect(getCitiesAndPackages(packages)).toEqual({
        Moscow: ['package-1', 'package-4'],
        Kaliningrad: ['package-2'],
        Tula: ['package-3', 'package-5', 'package-6'],
      });
    });

    it('Метод игнорирует посылку, если в ней отсутствует город или содержимое (длина не равна 2)', () => {
      const packages = [
        ['Moscow', 'package-1'],
        ['Kaliningrad', 'package-2'],
        ['Tula', 'package-3'],
        ['Kazan'], // метод должен не учитывать эту посылку
        ['Omsk'], // метод должен не учитывать эту посылку
        ['Kaliningrad', 'package-4'],
        ['Tula', 'package-5'],
      ];

      expect(getCitiesAndPackages(packages)).toEqual({
        Moscow: ['package-1'],
        Kaliningrad: ['package-2', 'package-4'],
        Tula: ['package-3', 'package-5'],
      });
    });
  });
});
