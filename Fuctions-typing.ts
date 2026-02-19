// 1. Створіть тип FilterCallback. Функція, яка приймає value (строку або число) і повертає boolean.
// Використовуйте цей тип для параметра predicate у функції filterItems.

type FilterCallback = (value: string | number) => boolean;

function filterItems(items: (string | number)[], predicate: FilterCallback): (string | number)[] {
  const result: (string | number)[] = [];

  for (const item of items) {
    if (!predicate(item)) continue;
    result.push(item);
  }

  return result;
}

const numbers = [1, 2, 3, 4, 5];
const evenNumbers = filterItems(numbers, (x) => typeof x === 'number' && x % 2 === 0);

// 2. Типізуйте функцію sendEvent. Вона приймає:
//  a. eventType: суворий літерал Attack | Move | Interact
//  b. ...payload:
//    - Attack => (targetId: number, weapon: string)
//    - Move => (x: number, y: number)
//    - Interact => (targetId: number)

function sendEvent(
  eventType: 'Attack',
  targetId: number,
  weapon: string
): void;

function sendEvent(
  eventType: 'Move',
  x: number,
  y: number
): void;

function sendEvent(
  eventType: 'Interact',
  targetId: number
): void;

function sendEvent(eventType: string, ...payload: (number | string)[]) {
  console.info(`Event: ${eventType}, Data: ${payload.join(', ')}`);
}

// 3. Функція runCommand поводиться по-різному залежно від команди.
//  - get-health, targetId: number -> повертає health.
//  - get-status, targetId: number -> повертає status.
//  - search-area, x: number, y: number, radius?: number -> повертає список знайденого.
//  - spawn-creep, type: goblin | orc -> повертає об'єкт { id: number, type: string }.

function runCommand(command: 'get-health', targetId: number): number;
function runCommand(command: 'get-status', targetId: number): string;
function runCommand(
  command: 'search-area',
  x: number,
  y: number,
  radius?: number
): string[];
function runCommand(
  command: 'spawn-creep',
  type: 'goblin' | 'orc'
): { id: number; type: string };

function runCommand(
  command: string,
  arg1?: number | string,
  arg2?: number,
  arg3?: number
): number | string | string[] | { id: number; type: string } {
  if (command === 'get-health') {
    return 100;
  }
  if (command === 'get-status') {
    return 'Stunned';
  }
  if (command === 'search-area') {
    return ['Rock', 'Tree', 'Chest'];
  }
  if (command === 'spawn-creep') {
    return { id: Math.random(), type: arg1 as string};
  }
  throw new Error('Unknown command');
}

// 4. Функція calculateDamage рахує урон, але вона також має властивість history, яка є масивом чисел.
// Також вона має метод showHistory(), який нічого не повертає.
// Опишіть цей тип DamageCalculator і типізуйте константу.

type DamageCalculator = {
  (min: number, max: number): number;
  history: number[];
  showHistory(): void;
};

const calculateDamage: DamageCalculator = function (min, max) {
  const dmg = Math.floor(Math.random() * (max - min) + min);
  calculateDamage.history.push(dmg);
  return dmg;
};

calculateDamage.history = [];
calculateDamage.showHistory = function () {
  console.info('History:', this.history);
};

// 5. У нас є тип GameState. Напишіть функцію processState, яка повертає повідомлення.
// У default зробіть перевірку, щоб переконатися, що всі стани оброблені.
// Якщо додати новий стан у GameState, TS повинен підсвітити помилку в switch.

type GameState = 'Loading' | 'Playing' | 'Paused'; // 'GameOver'

function processState(state: GameState): string {
  switch (state) {
    case 'Loading':
      return 'Please wait...';
    case 'Playing':
      return 'Game is on!';
    case 'Paused':
      return 'Press Start to continue';
    default:
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
}
