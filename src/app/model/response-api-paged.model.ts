export class ResponseApiPaged {
  code: number;
  message: string;
  data: object;
  page: number;
  totalPages: number;
  totalElement: number;

  constructor(code: number, message: string, data: object, page: number, totalpages: number, totalElement: number) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.page = page;
    this.totalPages = totalpages;
    this.totalElement = totalElement;
  }
}
