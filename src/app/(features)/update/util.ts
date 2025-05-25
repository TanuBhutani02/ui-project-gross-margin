interface ProjectDetails {
  project: string;
  month: string;
  year: string;
}

export function preparePaylaod(details: any[], { project, month, year }: ProjectDetails){
  const updatedDetails = transformBillingDetails(details, year, month);

    return {
    project,
    month : + month,
    year : +year,
    details :updatedDetails
    }
}

const cleanNumber = (value: string) => {
  return Number(value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')).toFixed(2);
};
export function prepareEmployeePaylaod(employeeList: any, selectedDate: any){
  return employeeList.map((el: any)=>{
    return {empid: el.empid, name: el.name,salaryDetails: {ctc: cleanNumber(el.ctc.toString()), effective_from: selectedDate, remarks:"Salary added using Excel upload"}}
  }
)
}

const transformBillingDetails = (data: any[], year: any, month: any) => {
  const daysInMonth = new Date(year, month, 0).getDate();
    const result =  data.map((item) => {
      let total = 0;
      let offDays = 0;
      for (let i = 1; i <= daysInMonth; i++) {
        const value = item[i.toString()];
        if(isNaN(parseInt(value,10)) && value?.toLowerCase() == "off"){
          offDays += 1
        }
        if (!isNaN(value)) {
          total += Number(value);
        }
      }
      // Remove keys 1 to 31
      for (let i = 1; i <= daysInMonth; i++) {
        delete item[i.toString()];
      }
      console.log(total,"check total");
      // Add actualBillingHours key

      return { ...item, actualhoursbillable: total, maxHoursShadow: total+ offDays, actualHoursShadow:total  };
    });
    console.log("test result, ", result);
    return result;
   
  };

  export const cleanAndFormatCTC = (value: string = "0"): string => {
    const cleanedValue = value.toString()?.replace(/[^0-9]/g, '');
    const numberValue = Number(cleanedValue);
    return numberValue.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  export function key(header: string){
    return header.replace(/[^a-zA-Z0-9]/g,'').toLowerCase()
  }

  export function getHours(item: any,month: any, year: any){
    const daysInMonth = new Date(year, month, 0).getDate();
    let total = 0;
    let offDays = 0;
    for (let i = 1; i <= daysInMonth; i++) {
      const value = item[i.toString()];
      if (!isNaN(value)) {
        total += Number(value);
      }
      if(value?.toLowerCase()=="off"){
        offDays += 1;
      }
    }
    return {actualBillingHours: total,maxHoursShadow: total+ offDays}
  }