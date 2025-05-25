import { Calendar } from "@/components/Calender";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Switch, FormControlLabel } from "@mui/material";
import moment from "moment";
import { useState } from "react";

interface SalaryDialogProps {
  openDialog: boolean;
  handleDialogClose: () => void;
  handleSave: (paylaod: any) => void;
  employee: {
    ctc: string | number;
    effective_from: string;
    isOverwrite: boolean;
    remarks: string;
  };
}

const SalaryDialog = ({ openDialog, handleDialogClose, handleSave, employee }: SalaryDialogProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(employee);
  function onSelectedEmployeeChange(e: any) {

    const { name, value } = e.target;
    setSelectedEmployee((prevState: any) => ({
      ...prevState,
      [name]: name === "isOverwrite" ? !prevState.isOverwrite : value,
    }));
    // Logic to handle changes (e.g., updating the employee data)
  }

  function onSave() {
    const fromDate = moment(selectedEmployee.effective_From, 'YYYY-MM-DD');

    // Ensure the time is set to the start of the day (00:00:00)
    fromDate.startOf('day');
    const formattedDate = fromDate.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[+00:00]');
    const salaryDetails = {
      ctc: selectedEmployee?.ctc,
      remarks: selectedEmployee?.remarks,
      effective_from: selectedEmployee?.effective_from,
      isOverwrite: selectedEmployee?.isOverwrite,
    }
    handleSave(salaryDetails);

  }

  const formattedEffectiveFrom = moment(selectedEmployee?.effective_from, "DD- MMM -YYYY").format("YYYY-MM-DD");

  return (
    <Dialog open={openDialog} onClose={handleDialogClose}>
      {/* Edit Salary Title with pencil emoji */}
      <DialogTitle>
        <span role="img" aria-label="edit" style={{ fontSize: '20px', marginRight: '10px' }}>✏️</span>
        Edit Salary
      </DialogTitle>
      <DialogContent>
        {/* Salary TextField */}
        <TextField
          label="Salary (CTC)"
          value={selectedEmployee?.ctc}
          onChange={onSelectedEmployeeChange}
          fullWidth
          margin="normal"
          name="ctc" // Added name for consistency
          style={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}
        />
        {/* Effective From Date Picker */}
        <Calendar
          name="effective_from"
          selected={selectedEmployee?.effective_from}
          onChange={(e) => onSelectedEmployeeChange({ target: { name: "effective_from", value: e } })} />
        {/* <TextField
          label="Effective From"
          type="date"
          name="effective_from"
          value={formattedEffectiveFrom}
          onChange={onSelectedEmployeeChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          style={{ backgroundColor: '#f9f9f9', borderRadius: '4px' }}
        /> */}

        {/* Remarks Textarea */}
        <textarea
          name="remarks"
          value={selectedEmployee?.remarks}
          onChange={onSelectedEmployeeChange}
          placeholder="Enter remarks"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#f9f9f9',
            fontSize: '14px',
            minHeight: '100px', // Adjust height for better visibility
            resize: 'vertical', // Allows resizing of the textarea
          }}
        />

        {/* Enable Editing Switch */}
        <FormControlLabel
          control={
            <Switch
              checked={selectedEmployee?.isOverwrite}
              name="isOverwrite"
              onChange={onSelectedEmployeeChange}

              color="primary"
            />
          }
          label="Do you want to Overwrite the existing salary?"
        />
      </DialogContent>
      <DialogActions>
        {/* Cancel Button */}
        <Button onClick={handleDialogClose} color="secondary" variant="outlined" style={{ textTransform: 'none' }}>
          Cancel
        </Button>
        {/* Save Button with save diskette emoji */}
        <Button
          onClick={onSave}
          color="primary"
          variant="contained"
          style={{ textTransform: 'none', fontWeight: 'bold' }}
        >
          <span role="img" aria-label="save" style={{ marginRight: '8px' }}>💾</span>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SalaryDialog;
