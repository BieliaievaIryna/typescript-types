class School {
  // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

  private _areas: Area[] = [];
  private _lecturers: string[] = []; // Name, surname, position, company, experience, courses, contacts

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): string[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(name: string): void {
    this._areas = this._areas.filter(a => a.name !== name);
  }

  addLecturer(name: string): void {
    this._lecturers.push(name);
  }

  removeLecture(name: string): void {
    this._lecturers = this._lecturers.filter(l => l !== name);
  }
}

class Area {
  // implement getters for fields and 'add/remove level' methods
  private _levels: Level[] = [];
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(levelName: string): void {
    this._levels = this._levels.filter(l => l.name !== levelName);
  }
}

class Level {
  // implement getters for fields and 'add/remove group' methods

  private _groups: Group[] = [];
  private _name: string;
  private _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get groups(): Group[] {
    return this._groups
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(name: string): void {
    this._groups = this._groups.filter(g => g.directionName !== name);
  }
}

enum GroupStatus {
  Planned = "planned",
  Active = "active",
  Finished = "finished"
}

class Group {
  // implement getters for fields and 'add/remove student' and 'set status' methods

  private _area: string;
  private _status: GroupStatus;
  private _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
  public directionName: string;
  public levelName: string;

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  get area(): string {
    return this._area;
  }

  get status(): string {
    return this._status;
  }

  get students(): Student[] {
    return this._students;
  }

  setStatus(status: GroupStatus): void {
    this._status = status;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(fullName: string): void {
    this._students = this._students.filter(
      s => s.fullName !== fullName
    );
  }

  showPerformance(): Student[] {
    return [...this._students].sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );
  }
}

class Student {
  // implement 'set grade' and 'set visit' methods

  private _firstName: string;
  private _lastName: string;
  private _birthYear: number;
  private _grades: number[] = []; // workName: mark
  private _visits: boolean[] = []; // lesson: present

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(mark: number): void {
    this._grades.push(mark);
  }

  setVisit(present: boolean): void {
    this._visits.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (this._visits.filter(present => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }
}