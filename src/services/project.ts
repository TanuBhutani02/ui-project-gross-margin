import { ENDPOINTS } from "@/constant/apiConstant";
import { BaseService } from "./BaseServiceImpl";

 class Project extends BaseService<any>{
    constructor(){
     super (ENDPOINTS.PROJECT)
    }
 }

 export const ProjectService = new Project();