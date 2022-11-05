import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiKey } from './ApiKey.entitiy';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  path: string;

  @Column()
  key: string;
}
