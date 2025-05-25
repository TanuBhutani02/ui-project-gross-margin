"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectService } from '@/services/project';
import { OrgBillingService } from '@/services/OrgBillingService';
import { billingService } from '@/services/billing';

interface Project {
    name: string;
    buHead: string;
    delieveryManager: string;
    billingType: string,
    id?: string,
    // Add other project properties here
}

const useProject = () => {
    const date = new Date();
    const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    const month = (prevMonthDate.getMonth() + 1).toString();
    const year = prevMonthDate.getFullYear();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [columns, setColumns] = useState<any>([]);
    const [orgConversionRate, setOrgConversionRate] = useState(0);
    const [billingData, setBillingData] = useState<any>([]);
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState(year);

    useEffect(() => {
        setColumns([{
            field: "name",
            headerName: "Project Name",
            width: 200
        },
        {
            field: "billingType",
            headerName: "Billing Type",
            width: 200
        },
        {
            field: "buHead",
            headerName: "Business Unit Head",
            width: 200
        },
        {
            field: "delieveryManager",
            headerName: "Delievery Manager",
            width: 200
        }
        ]);
        fetchProjects();

    }, []);
    ``
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await ProjectService.get();
            // const orgConversionRateResponse = await OrgBillingService.get();
            // setOrgConversionRate(orgConversionRateResponse);
            setProjects(response.map((el: any) => ({ ...el, id: el.Id })));
        } catch (err) {
            setError('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    const createProject = async (project: Project) => {
        setLoading(true);
        try {
            const response = await ProjectService.create(project);
            if (response) {
                fetchProjects();
            }
        } catch (err) {
            setError('Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    const updateProject = async (project: Project) => {
        setLoading(true);
        // try {
        //     const response = await axios.put(`/api/projects/${project.id}`, project);
        //     setProjects(projects.map(p => (p.id === project.id ? response.data : p)));
        // } catch (err) {
        //     setError('Failed to update project');
        // } finally {
        //     setLoading(false);
        // }
    };

    const deleteProject = async (projectId: number) => {
        setLoading(true);
        // try {
        //     await axios.delete(`/api/projects/${projectId}`);
        //     setProjects(projects.filter(p => p.id !== projectId));
        // } catch (err) {
        //     setError('Failed to delete project');
        // } finally {
        //     setLoading(false);
        // }
    };

    async function fetchBillingData() {
        try {
            if (!selectedProjects) return;
            const payload = { month: +selectedMonth, year: selectedYear, projects: selectedProjects }
            const dashboardData = await billingService.search(payload, "/filter", "POST");
            setBillingData((prevData: any) =>
                JSON.stringify(prevData) !== JSON.stringify(dashboardData) ? dashboardData : prevData
            );
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
        }
    }

    return {
        orgConversionRate,
        projects,
        columns,
        loading,
        error,
        selectedProjects,
        setSelectedProjects,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        setOrgConversionRate,
        selectedMonth,
        selectedYear,
        setSelectedMonth,
        setSelectedYear,
        fetchBillingData,
        billingData
    };
};

export default useProject;