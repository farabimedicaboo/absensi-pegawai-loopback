import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDsDataSource} from '../datasources';
import {Employee, EmployeeRelations, Attendance} from '../models';
import {AttendanceRepository} from './attendance.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly attendances: HasManyRepositoryFactory<Attendance, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.mongoDs') dataSource: MongoDsDataSource, @repository.getter('AttendanceRepository') protected attendanceRepositoryGetter: Getter<AttendanceRepository>,
  ) {
    super(Employee, dataSource);
    this.attendances = this.createHasManyRepositoryFactoryFor('attendances', attendanceRepositoryGetter,);
    this.registerInclusionResolver('attendances', this.attendances.inclusionResolver);
  }
}
