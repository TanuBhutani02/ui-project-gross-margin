import {
    axiosInstance,
    handleErrorResponse
} from "@/app/_utils/ApiUtils";

export const uploadFile = async (data: Record<string, unknown>) => {
    try {
        const response = await axiosInstance.post('/upload/data', data);
        console.log("RNKJLFLKLKSJFLKJSLKDLK " , response)
        return response;
    } catch (error) {
        handleErrorResponse(error);
    }
};

export const getAllUploadData = async () => {
    try {
        const response = await axiosInstance.get('/upload/data');
        return response.data;
    } catch (error) {
        handleErrorResponse(error);
    }
};

