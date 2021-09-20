import {
  injectable,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Employee} from '../models';
import {EmployeeRepository} from '../repositories';


/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@injectable({tags: {key: ValidateUsernameInterceptor.BINDING_KEY}})
export class ValidateUsernameInterceptor implements Provider<Interceptor> {
  static readonly BINDING_KEY = `interceptors.${ValidateUsernameInterceptor.name}`;

  /*
  constructor() {}
  */

  constructor(
    @repository(EmployeeRepository)
    public employeeRepository : EmployeeRepository,
  ) {}

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
      // Add pre-invocation logic here
      let employee: Employee | undefined;

      if (invocationCtx.methodName === 'create')
        employee = invocationCtx.args[0];
      else if (invocationCtx.methodName === 'updateById')
        employee = invocationCtx.args[1];

        if (employee && !this.isUsernameNoSpace(employee.username)) {
          const err: ValidationError = new ValidationError(
            'Username Cannot Contains Space',
          );
          err.statusCode = 400;
          throw err;
        }

        if (employee && await this.isUsernameExist(employee.username)) {
            const err: ValidationError = new ValidationError(
              'Username Already Exist',
            );
            err.statusCode = 400;
            throw err;
        }

      const result = await next();
      // Add post-invocation logic here
      return result;
  }

  async isUsernameExist(username: string) {
    const employeeCollection = (this.employeeRepository.dataSource.connector as any).collection("Employee");
    const user = await employeeCollection.aggregate([
      {
        $match: {
          username: username
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
        },
      },
    ]).get();

    if (user.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  isUsernameNoSpace(username: string) {
    const regex = /[^\S]/g;
    const found = username.match(regex);

    if (found && found.length > 0) {
      return false;
    }
    return true;
  }
}

class ValidationError extends Error {
  code?: string;
  statusCode?: number;
}
