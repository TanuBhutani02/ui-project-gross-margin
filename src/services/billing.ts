import { ENDPOINTS } from '@/constant/apiConstant';
import { BaseService } from './BaseServiceImpl';

class BillingService extends BaseService<any> {
    constructor() {
        super(ENDPOINTS.BILLING);
    }
   
}
export const billingService = new BillingService();
