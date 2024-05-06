const Gift = require('../Gift');
const SecretSanta = require('../SecretSanta');
const Participant = require('../Participant');

describe('тесты Part-1', () => {
  let book;
  let powerbank;
  let antiStressToy;
  let secretSanta;
  let Petya;
  let Olya;
  let Nastya;

  beforeEach(() => {
    book = new Gift({ to: 'Петя', item: 'книга' });
    powerbank = new Gift({ to: 'Оля', item: 'повербанк' });
    antiStressToy = new Gift({ to: 'Вася', item: 'игрушка антистресс' });

    Petya = new Participant({ name: 'Петя' });
    Olya = new Participant({ name: 'Оля' });
    Nastya = new Participant({ name: 'Настя' });

    secretSanta = new SecretSanta({
      participants: ['Петя', 'Оля', 'Вася'],
      gifts: [book, powerbank, antiStressToy],
    });
  });

  describe('constructor', () => {
    it('проверка коструктора Gift', () => {
      const gift = new Gift({ to: 'Вася', item: 'книга' });
      expect(gift.to).toBe('Вася');
      expect(gift.item).toBe('книга');
    });
    it('проверка конструктора Participant', () => {
      const participant = new Participant({ name: 'Вася' });
      expect(participant.name).toBe('Вася');
      expect(participant.giftGiven).toBe(false);
    });

    it('проверка конструктора SecretSanta', () => {
      const santa = new SecretSanta({
        participants: ['Вася', 'Петя', 'Оля'],
        gifts: [book, powerbank, antiStressToy],
      });
      expect(santa.participants).toEqual(['Вася', 'Петя', 'Оля']);
      expect(santa.gifts).toEqual([book, powerbank, antiStressToy]);
    });
  });

  describe('тесты SecretSanta', () => {
    describe('Метод addGift', () => {
      it('Метод addGift не добавляет подарок, если участник не в списке participants', () => {
        const gift = new Gift({ to: 'Катя', item: 'свитер' });
        expect(secretSanta.addGift(gift)).toBe(false);
        expect(secretSanta.gifts).toEqual([book, powerbank, antiStressToy]);
      });

      it('Метод addGift добавляет подарок, если участник в списке participants', () => {
        const gift = new Gift({ to: 'Оля', item: 'свитер' });
        expect(secretSanta.addGift(gift)).toBe(true);
        expect(secretSanta.gifts).toEqual([book, powerbank, antiStressToy, gift]);
      });
    });

    describe('Метод takeGift', () => {
      it('Метод takeGift возвращает null, если участника нет в списке', () => {
        expect(secretSanta.takeGift(Nastya)).toBeNull();
        expect(secretSanta.gifts).toEqual([book, powerbank, antiStressToy]);
      });

      it('Метод takeGift возвращает подарок, если участник есть в списке', () => {
        expect(secretSanta.takeGift(Petya)).toEqual(book);
        expect(secretSanta.takeGift(Olya)).toEqual(powerbank);
        expect(secretSanta.gifts).toEqual([antiStressToy]);
      });
      it('Метод takeGift устанавливает флаг giftGiven у участника, которому был взят подарок', () => {
        secretSanta.takeGift(Petya);
        expect(Petya.giftGiven).toBe(true);
      });
    });
  });
});
