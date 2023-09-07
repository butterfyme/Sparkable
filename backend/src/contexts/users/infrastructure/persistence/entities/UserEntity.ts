import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"
import { UserDto } from "../../../domain/models/UserDto";
import { UserRole } from "../../../domain/models/UserRole";

@Entity('users')
export class UserEntity implements UserDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({nullable: true})
  uuid: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  registrationDate: Date;

  @Column({ nullable: true })
  stage: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole
}