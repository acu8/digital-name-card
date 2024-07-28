export class User {
    constructor(
      public user_id: string,
      public name: string,
      public description: string,
      public Skill: Skill | null,
      public github_id?: string,
      public qiita_id?: string,
      public x_id?: string
    ) {}
  }

  export class Skill {
    constructor(public id: number, public name: string) {}
  }

