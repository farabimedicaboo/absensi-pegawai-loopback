import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Employee, EmployeeWithRelations} from './employee.model';

@model({settings: {
  strictObjectIDCoercion: true
}})
export class Attendance extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'date',
    default: new Date(),
  })
  start?: string;

  @property({
    type: 'date',
  })
  end?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  isApproved: boolean;

  @property({
    type: 'date',
    default: new Date(),
  })
  createdAt?: string;

  @property({
    type: 'date',
  })
  updatedAt?: string;

  @belongsTo(() => Employee)
  employeeId: string;

  constructor(data?: Partial<Attendance>) {
    super(data);
  }
}

export interface AttendanceRelations {
  // describe navigational properties here
  employee?: EmployeeWithRelations
}

export type AttendanceWithRelations = Attendance & AttendanceRelations;
