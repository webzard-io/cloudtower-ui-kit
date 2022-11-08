import {
  UploadResourceType,
  UploadTaskStatus,
} from "@cloudtower/eagle/generated/react-hooks";

type UploadTask = {
  id: string;
  type: UploadResourceType;
  clusterIds: string[];
  file: File;
  name: string;
  chunk_size: number;
  current_chunk: number;
  status: UploadTaskStatus;
  started_at: Date;
  image_ids: string[];
  finished_at: Date | null;
  meta_file?: File;
};

export type UploadState = {
  uploadTasks: UploadTask[];
};

export const enum UploadActions {
  START_TASK = "START_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  REMOVE_TASK = "REMOVE_TASK",
}

type UPLOAD_START_TASK =
  | {
      type: UploadActions.START_TASK;
      payload: UploadTask;
    }
  | {
      type: UploadActions.UPDATE_TASK;
      payload: Partial<UploadTask> & { id: UploadTask["id"] };
    }
  | {
      type: UploadActions.REMOVE_TASK;
      payload: { id: string };
    };

export type Actions = UPLOAD_START_TASK;

export const initialState: UploadState = {
  uploadTasks: [],
};

export const uploadReducer = (
  state: UploadState = initialState,
  action: Actions
) => {
  switch (action.type) {
    case UploadActions.START_TASK: {
      return {
        ...state,
        uploadTasks: state.uploadTasks.concat(action.payload),
      };
    }
    case UploadActions.REMOVE_TASK: {
      return {
        ...state,
        uploadTasks: state.uploadTasks.filter(
          (task) => task.id !== action.payload.id
        ),
      };
    }
    case UploadActions.UPDATE_TASK: {
      return {
        ...state,
        uploadTasks: state.uploadTasks.map((task) => {
          if (task.id !== action.payload.id) {
            return task;
          }
          return {
            ...task,
            ...action.payload,
          };
        }),
      };
    }
    default:
      return state;
  }
};
