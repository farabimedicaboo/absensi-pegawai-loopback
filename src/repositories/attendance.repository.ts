import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Attendance, AttendanceRelations, Employee} from '../models';
import {EmployeeRepository} from './employee.repository';

export class AttendanceRepository extends DefaultCrudRepository<
  Attendance,
  typeof Attendance.prototype.id,
  AttendanceRelations
> {

  public readonly employee: BelongsToAccessor<Employee, typeof Attendance.prototype.id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Attendance, dataSource);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }
}
