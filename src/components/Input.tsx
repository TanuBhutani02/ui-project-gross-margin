import React from "react";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  options?: { value: string; label: string }[]; // For select input type
  error?: string;
  className?: string;
  [key: string]: any;
}

export default function Input({
  label,
  name,
  type = "text",
  options = [],
  error="",
  className = "",
  value,
  ...props
}: InputProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
        value={value}
          id={name}
          name={name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...props}
        />
      ) : type === "select" ? (
        <div className="relative">
          <select
            // value={value}
            defaultValue="Select"
            id={name}
            name={name}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...props}
          >
           {value==="" && <option  value="" hidden>Select {label}</option>}
            {options.map((option) => {
              return <option key={option.value}
                
            
              disabled={option.value === ""}>
                {option.label}
              </option>
            }
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      ) : (
        <input
          value={value}
          type={type}
          id={name}
          name={name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...props}
        />
      )}
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
}