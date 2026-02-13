//1. Interface with index signature and union type
interface Dictionary {
  [key: string]: number | string;
}

const data: Dictionary = {
  age: 25,
  name: "Iryna",
  city: "Kyiv",
  year: 2024
};

//2. Index signature with functions
interface FunctionStorage {
  [key: string]: Function;
}

const actions: FunctionStorage = {
  greet: (name: string) => `Hello, ${name}`,
  sum: (a: number, b: number) => a + b,
  log: (...args: unknown[]) => console.log(args)
};

//3. Array-like object
interface StringArrayLike {
  [index: number]: string;
}

const fruits: StringArrayLike = {
  0: "apple",
  1: "banana",
  2: "orange"
};

//4. Interface with concrete properties + index signature
interface UserProfile {
  name: string;
  age: number;
  [key: string]: string | number;
}

const user: UserProfile = {
  name: "Iryna",
  age: 25,
  city: "Lviv",
  experience: 2
};

//5. One interface extends another
interface BaseDictionary {
  [key: string]: string | number;
}

interface ExtendedDictionary extends BaseDictionary {
  id: number;
  description: string;
}

const item: ExtendedDictionary = {
  id: 1,
  description: "Product",
  price: 100,
  category: "Electronics"
};

//6. Value check function
interface NumberDictionary {
  [key: string]: number;
}

function checkIfAllNumbers(obj: { [key: string]: number | string }): boolean {
  for (const key in obj) {
    if (typeof obj[key] !== "number") {
      return false;
    }
  }
  return true;
}