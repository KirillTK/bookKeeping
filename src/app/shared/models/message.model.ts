export class Message {

  public type: string;
  public text: string;

  constructor(text: string , type: string) {
    this.text = text;
    this.type = type;
  }
}
