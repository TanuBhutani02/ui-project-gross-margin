

  enum Role  {
    SUPER_ADMIN =1 ,
    USER 
  };
  
  export const RoleLabels : {[key in Role] : string} = {
    [Role.SUPER_ADMIN] :'Super Admin',
    [Role.USER] : 'User'
  }

  export const months = [...Array(12)].map((_, i) => ({
    value: (i + 1).toString(), // No padStart, so values will be "1" to "12"
    label: new Date(2000, i).toLocaleString("en-US", { month: "long" })
  }));
  
  
  
  export const years = Array.from(new Array(20), (val, index) => {
    const year = new Date().getFullYear() - index;
    return { value: year.toString(), label: year.toString() };
  });
  