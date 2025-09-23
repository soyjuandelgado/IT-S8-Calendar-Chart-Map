import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value as string;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',

      host: this.getValue('MEETINGS_HOST'),
      port: parseInt(this.getValue('MEETINGS_PORT')),
      username: this.getValue('MEETINGS_USER'),
      password: this.getValue('MEETINGS_PASSWORD'),
      database: this.getValue('MEETINGS_DATABASE'),

      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'MEETINGS_HOST',
  'MEETINGS_PORT',
  'MEETINGS_USER',
  'MEETINGS_PASSWORD',
  'MEETINGS_DATABASE',
]);

export { configService };
