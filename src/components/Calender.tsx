import moment from "moment";

interface CalendarProps {
  selected?: Date;
  onChange: (date: Date | undefined) => void;
  name?: string;
}

export function Calendar({ selected, onChange, name = "" }: CalendarProps) {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value ? new Date(event.target.value) : undefined;
    onChange(newDate);
  };

  const formatDateForInput = (date: Date | undefined) => {
    return date ? moment(date).format('YYYY-MM-DD') : ''; // Format using moment.js
  };

  return (
    <input
      name={name}
      type="date"
      value={selected ? formatDateForInput(selected) : ""}
      onChange={handleDateChange}
      className="border p-2 rounded w-full"
    />
  );
}
