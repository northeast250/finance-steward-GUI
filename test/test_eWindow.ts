class Animal {
  public name: string;
  public gender: string;

  public bark: any;

  constructor(name: string, gender: string) {
    this.name = name;
    this.gender = gender;
  }
}

const animal = new Animal("xx", "xxxx");

// @ts-ignore
animal.play = () => {
  console.log("hello");
};

// @ts-ignore
animal.play();
