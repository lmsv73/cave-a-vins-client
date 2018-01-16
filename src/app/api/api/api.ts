export * from './bottle.service';
import { BottleService } from './bottle.service';
export * from './bottleType.service';
import { BottleTypeService } from './bottleType.service';
export * from './compartment.service';
import { CompartmentService } from './compartment.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [BottleService, BottleTypeService, CompartmentService, UserService];
