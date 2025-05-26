import Axios from "axios";

export const axiosInstance = Axios.create({
    baseURL: 'https://services-project-finance-production.up.railway.app/api/v1',
    headers: {
        "Content-Type": "application/json",
    },
});

export const handleErrorResponse = (err: unknown) => {
    if (err instanceof Error) {
        if (
            err.message ===
            "Unauthenticated access is not supported for this identity pool."
            // || (err?.response && err?.response.status === 401)
        ) {
            // Sign out and redirect to login page
            // signOut();
            window.location.href = "/";
        }
    } else {
        return { success: false, error: "unknown error occured" };
    }
};
