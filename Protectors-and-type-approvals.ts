// 1. У вас є типи Car, Truck та об'єднання Vehicle. Напишіть функцію getVehicleCapacity(vehicle: Vehicle): string,
// яка робить звуження типу за дискримінантом kind та повертає спецефічне повідомлення про навантаження.
// Реалізуйте вичерпну перевірку за допомогою функції. Додайте до об'єднання новий тип Motorcycle, щоб переконатися,
// що ваша функція "впаде" з помилкою на етапі компіляції.

interface Car {
  kind: 'car';
  passengers: number;
}

interface Truck {
  kind: 'truck';
  cargoWeight: number;
}

// interface Motorcycle {
//   kind: 'motorcycle';
//   hasSidecar: boolean;
// }

type Vehicle = Car | Truck; // | Motorcycle;

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

function getVehicleCapacity(vehicle: Vehicle): string {
  switch (vehicle.kind) {
    case 'car':
      return `This car can carry ${vehicle.passengers} passengers`;

    case 'truck':
      return `This truck can carry ${vehicle.cargoWeight} kg of cargo`;

    default:
      return assertNever(vehicle);
  }
}

// 2. Ви отримуєте повідомлення через WebSocket, яке має тип unknown. Реалізуйте функцію-захисник типу isChatMessage,
// яка перевіряє, чи відповідає отриманий об'єкт інтерфейсу ChatMessage. Використовуйте різні оператори
// для безпечної перевірки.

interface ChatMessage {
  text: string;
  authorId: number;
}

function isChatMessage(data: unknown): data is ChatMessage {
  if (
    typeof data === 'object' &&
    data !== null &&
    'text' in data &&
    'authorId' in data
  ) {
    const msg = data as ChatMessage;

    return (
      typeof msg.text === 'string' &&
      typeof msg.authorId === 'number'
    );
  }

  return false;
}

function processMessage(data: unknown): void {
  if (isChatMessage(data)) {
    console.info(`User ${data.authorId} says: "${data.text.toUpperCase()}"`);
  } else {
    console.error('Invalid format');
  }
}

// 3. Тип RouteHandlers вимагає, щоб значенням маршруту була строка (назва компонента) або об'єкт із функцією action.
// Створіть об'єкт appRoutes із маршрутами home (string) та login (об'єкт із методом action).
// Оголосіть його так, щоб компілятор перевірив відповідність типу RouteHandlers, але водночас зберіг точну структуру об'єкта.
// Переконайтеся, що виклик appRoutes.login.action() не викликає помилки.

type RouteHandlers = {
  [routePath: string]: string | { action: () => void };
};
const appRoutes = {
  home: 'HomeComponent',

  login: {
    action: () => {
      console.log('Login action');
    }
  }
} satisfies RouteHandlers;

appRoutes.login.action();