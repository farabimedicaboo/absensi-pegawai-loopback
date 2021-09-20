import {Entity, hasMany, model, property} from '@loopback/repository';
import {Attendance, AttendanceWithRelations} from './attendance.model';

@model({settings: {
  strictObjectIDCoercion: true
}})
export class Employee extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    // Add jsonSchema
    jsonSchema: {
      maxLength: 30,
      minLength: 8,
      errorMessage: 'Username cannot contains space',
    },
  })
  username: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @hasMany(() => Attendance)
  attendances: Attendance[];

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
  attendances?: AttendanceWithRelations[]
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
