interface RadioButtonProps {
    value: string;
    label: string;
    name: string;
    onChange?:(e: React.ChangeEvent<HTMLInputElement>)=>void;
    checked?: boolean;
}

export function RadioButton({ value, label, name, checked,...props }: RadioButtonProps) {
    return(
    <div style={{margin: "10px"}}>
     <input type= "radio" id={name} value={value} name={name} 
     checked={checked}
     style={{marginRight: "10px"}} {...props}/>
     <label htmlFor={value} >{label}</label>
     </div>
    )
}