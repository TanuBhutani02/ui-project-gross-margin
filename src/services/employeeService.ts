import { ENDPOINTS } from "@/constant/apiConstant";
import { BaseService } from "./BaseServiceImpl";

export class Employee  extends BaseService<any> {
    constructor(){
        super(ENDPOINTS.EMPLOYEE);
    }

}

export const EmployeeService = new Employee();