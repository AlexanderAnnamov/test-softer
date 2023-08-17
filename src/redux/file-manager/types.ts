export enum Status {
    LOADING = "loading",
    SUCCESS = "completed",
    ERROR = "error",
  }

export type FileItem = {
    name: string,
    downloadUrl: string,
    extentionFile: string,
    previewFile: string,
    path: string,
    idx: number
  }
  
export interface FileManagerState {
    requestFiles: FileItem[],
    isLoading: boolean,
    status: Status,
  }