abstract class Shape {
  public readonly name: string;
  public readonly color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }

  abstract calculateArea(): number;
}

class Circle extends Shape {
  constructor(
    color: string,
    public readonly radius: number
  ) {
    super('Circle', color);
  }

  public override calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Triangle extends Shape {
  constructor(
    color: string,
    public readonly base: number,
    public readonly height: number
  ) {
    super('Triangle', color);
  }

  public override calculateArea(): number {
    return (this.base * this.height) / 2;
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    public readonly width: number,
    public readonly height: number
  ) {
    super('Rectangle', color);
  }

  public override calculateArea(): number {
    return this.width * this.height;
  }

  public print(): void {
    console.log(`Area = width * height = ${this.width} * ${this.height}`);
  }
}

class Square extends Shape {
  constructor(
    color: string,
    public readonly side: number
  ) {
    super('Square', color);
  }

  public override calculateArea(): number {
    return this.side ** 2;
  }

  public print(): void {
    const squared = '\u00B2';
    console.log(`Area = side${squared} = ${this.side}${squared}`);
  }
}