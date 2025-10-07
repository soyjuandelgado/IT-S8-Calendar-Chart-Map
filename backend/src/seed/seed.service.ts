import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from 'src/meetings/meeting.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(@InjectRepository(Meeting) private repo: Repository<Meeting>) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      // Leer archivo SQL
      const sql = fs.readFileSync('./bd.sql', 'utf8');

      // Ejecutar SQL en la base de datos
      await this.repo.query(sql);

      console.log('Datos iniciales cargados desde bd.sql');
    }
  }
}
