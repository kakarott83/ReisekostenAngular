import {Cost} from './Cost';
import {Customer} from './Customer';
import {Reason} from './Reason';

export class Travel {
    id?: number;
    start?: Date;
    end?: Date;
    customer?: Customer;
    reason?: Reason;
    costs?: Cost[];

}
