import Input from "@/components/Input";
import Modal from "@/components/Modal";


interface ProjectModalProps {
  onSubmit: (e: any) => void;
  loading: boolean;
  error: string | null;
  onClose: () => void;
}

export default function ProjectModal({onSubmit, loading, error, onClose}: ProjectModalProps) {
    return(
        <>
            <Modal 
             onSubmit={onSubmit} 
             loading={loading}
              title="Add New Project"
              onClose={onClose}
              formElement={<div className="grid grid-cols-2 gap-4">
                <Input label="Project Name" name="name" placeholder={"Enter Project Name"}/>
                <Input label="BU Head" name="buHead" placeholder = "Enter Bu Head" />
                <Input label="DM" name="delieveryManager" placeholder ="Enter Delivery Manager"/>
                <Input label="Billing Type" name="billingType" type="select"
                value="" 
            
                options={[
        
                  {value: "fixed", label: "Fixed"},
                  {value: "time_and_material", label: "Time and Material"},
                ]}/>
              </div>}
              />
            
          </>
          )}
    