import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Employee,
  Attendance,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeAttendanceController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/attendances', {
    responses: {
      '200': {
        description: 'Array of Employee has many Attendance',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Attendance)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Attendance>,
  ): Promise<Attendance[]> {
    return this.employeeRepository.attendances(id).find(filter);
  }

  @post('/employees/{id}/attendances', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Attendance)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {
            title: 'NewAttendanceInEmployee',
            exclude: ['id'],
            optional: ['employeeId']
          }),
        },
      },
    }) attendance: Omit<Attendance, 'id'>,
  ): Promise<Attendance> {
    return this.employeeRepository.attendances(id).create(attendance);
  }

  @patch('/employees/{id}/attendances', {
    responses: {
      '200': {
        description: 'Employee.Attendance PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {partial: true}),
        },
      },
    })
    attendance: Partial<Attendance>,
    @param.query.object('where', getWhereSchemaFor(Attendance)) where?: Where<Attendance>,
  ): Promise<Count> {
    return this.employeeRepository.attendances(id).patch(attendance, where);
  }

  @del('/employees/{id}/attendances', {
    responses: {
      '200': {
        description: 'Employee.Attendance DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Attendance)) where?: Where<Attendance>,
  ): Promise<Count> {
    return this.employeeRepository.attendances(id).delete(where);
  }
}
