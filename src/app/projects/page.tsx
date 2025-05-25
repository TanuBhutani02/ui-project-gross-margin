"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import useProject from "./useProject";
import { PageHeader } from "@/components/PageHeader";
import DataGridComponent from "@/components/DataGridComponent";
import Button from "@/components/Button";
import ProjectModal from "./ProjectModal";


const EditableContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
`;

const EditableInput = styled.input`
  border: 1px solid #ccc;
  padding: 6px 8px;
  width: 80px;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  transition: color 0.2s;
  &:hover {
    color: #0056b3;
  }
`;

export default function Project() {
  const { projects, loading, error, createProject, columns, orgConversionRate, setOrgConversionRate } = useProject();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempRate, setTempRate] = useState(orgConversionRate);

  function handleProjectModal() {
    setIsProjectModalOpen(true);
  }

  function handleClose() {
    setIsProjectModalOpen(false);
  }

  async function handleProject(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const project = Object.fromEntries(formData.entries());

    try {
      await createProject({
        name: project.name as string,
        buHead: project.buHead as string,
        delieveryManager: project.delieveryManager as string,
        billingType: project.billingType as string,
      });
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  function handleRateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTempRate(+e.target.value);
  }

  function saveRate() {
    setOrgConversionRate(tempRate);
    setIsEditing(false);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      saveRate();
    }
  }

  return (
    <>
      <PageHeader title="Project Details" />

      {/* Inline Editable Field with Emoji Icons */}


      <div className="flex justify-end mb-4">
        <Button onClick={handleProjectModal}>Add New Project</Button>
      </div>

      <DataGridComponent columns={columns} rows={projects} />

      {isProjectModalOpen && (
        <ProjectModal
          onSubmit={handleProject}
          onClose={handleClose}
          loading={loading}
          error={error}
        />
      )}
    </>
  );
}
