export class ResponseApi {
  code: number;
  message: string;
  data: object;

  constructor(code: number, message: string, data: object) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
