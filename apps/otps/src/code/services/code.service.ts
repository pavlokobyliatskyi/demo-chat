import { Injectable } from '@nestjs/common';

@Injectable()
export class CodeService {
  public generate() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
