import { ENDPOINTS } from '@/constant/apiConstant';
import { BaseService } from './BaseServiceImpl';

class OrgBilling extends BaseService<any> {
    constructor() {
        super(ENDPOINTS.OrgBilling);
    }
}
export const OrgBillingService = new OrgBilling();
