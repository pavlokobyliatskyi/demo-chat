import { Injectable } from '@nestjs/common';
import mineTypes from 'mime-types';

@Injectable()
export class MineTypesService {
  public async extension(typeString: string) {
    return mineTypes.extension(typeString);
  }

  public async lookup(filenameOrExt: string) {
    return mineTypes.lookup(filenameOrExt);
  }
}
