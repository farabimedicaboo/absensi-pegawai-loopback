import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Attendance} from '../models';
import {AttendanceRepository} from '../repositories';

export class AttendanceController {
  constructor(
    @repository(AttendanceRepository)
    public attendanceRepository : AttendanceRepository,
  ) {}

  @post('/attendances')
  @response(200, {
    description: 'Attendance model instance',
    content: {'application/json': {schema: getModelSchemaRef(Attendance)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {
            title: 'NewAttendance',

          }),
        },
      },
    })
    attendance: Attendance,
  ): Promise<Attendance> {
    return this.attendanceRepository.create(attendance);
  }

  @get('/attendances/count')
  @response(200, {
    description: 'Attendance model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Attendance) where?: Where<Attendance>,
  ): Promise<Count> {
    return this.attendanceRepository.count(where);
  }

  @get('/attendances')
  @response(200, {
    description: 'Array of Attendance model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Attendance, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Attendance) filter?: Filter<Attendance>,
  ): Promise<Attendance[]> {
    return this.attendanceRepository.find(filter);
  }

  @patch('/attendances')
  @response(200, {
    description: 'Attendance PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {partial: true}),
        },
      },
    })
    attendance: Attendance,
    @param.where(Attendance) where?: Where<Attendance>,
  ): Promise<Count> {
    return this.attendanceRepository.updateAll(attendance, where);
  }

  @get('/attendances/{id}')
  @response(200, {
    description: 'Attendance model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Attendance, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Attendance, {exclude: 'where'}) filter?: FilterExcludingWhere<Attendance>
  ): Promise<Attendance> {
    return this.attendanceRepository.findById(id, filter);
  }

  @patch('/attendances/{id}')
  @response(204, {
    description: 'Attendance PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Attendance, {partial: true}),
        },
      },
    })
    attendance: Attendance,
  ): Promise<void> {
    await this.attendanceRepository.updateById(id, attendance);
  }

  @put('/attendances/{id}')
  @response(204, {
    description: 'Attendance PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() attendance: Attendance,
  ): Promise<void> {
    await this.attendanceRepository.replaceById(id, attendance);
  }

  @del('/attendances/{id}')
  @response(204, {
    description: 'Attendance DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.attendanceRepository.deleteById(id);
  }


  @get('/attendances/tes')
  @response(200, {
    description: 'Attendance tes',
    content: {
      'application/json': {
        schema: {type: 'array', items: {'x-ts-type': Attendance}},
      },
    },
  })
  async getTes(
    @param.path.string('id') id: string,
  ): Promise<Attendance> {
    const attendanceCollection = (this.attendanceRepository.dataSource.connector as any).collection("Attendance");
    return this.attendanceRepository.findById(id);
  }
}
