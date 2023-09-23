import { validateSync } from 'class-validator';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export class ConfigValidator {
  constructor(public readonly objs: ClassConstructor<object>[]) {}

  public validate(config: Record<string, unknown>) {
    for (const obj of this.objs) {
      const validatedObj = plainToInstance(obj, config, {
        enableImplicitConversion: true,
      });

      const errors = validateSync(validatedObj, {
        skipMissingProperties: false,
      });

      if (errors.length > 0) {
        throw new Error(errors.toString());
      }
    }

    return config;
  }
}
