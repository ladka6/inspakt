import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column({ default: true })
  active: boolean;
}
