"use client";
import Button from "./Button";

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  formElement?: any;
  onClose: () => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  loading?: boolean;
}

export default function Modal({
  title,
  onSubmit,
  onClose,
  children,
  loading= false,
  formElement,
}: ModalProps) {
  return (
    <div>
      <dialog
        onClose={onClose}
        className=" inset-0 flex items-center justify-center p-4 bg-white w-full h-full bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-2xl relative">
          <h2 className="text-xl font-semibold mb-8 pb-6 pt-4 absolute top-0 left-4">
            {title}
          </h2>
          {children}

          <form method="dialog" className="space-y-4 mt-6 mb-6"    
          onSubmit={(event) => onSubmit && onSubmit(event)}
           
          >
            {formElement}
            <Button onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" disabled={loading}>Submit</Button>
          </form>
        </div>
      </dialog>
    </div>
  );
}
