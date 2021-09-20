import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Attendance,
  Employee,
} from '../models';
import {AttendanceRepository} from '../repositories';

export class AttendanceEmployeeController {
  constructor(
    @repository(AttendanceRepository)
    public attendanceRepository: AttendanceRepository,
  ) { }

  @get('/attendances/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to Attendance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.string('id') id: typeof Attendance.prototype.id,
  ): Promise<Employee> {
    return this.attendanceRepository.employee(id);
  }
}
