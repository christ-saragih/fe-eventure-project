import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IFileUrl } from "@/types/File";

const formdataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const uploadService = {
  uploadFile: (payload: FormData) =>
    instance.post(`${endpoint.MEDIA}/upload-single`, payload, formdataHeader),
  deleteFile: (payload: IFileUrl) =>
    instance.delete(`${endpoint.MEDIA}/remove`, { data: payload }),
};

export default uploadService;
