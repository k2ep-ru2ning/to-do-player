import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

import { type SelectedToDo, type ToDo } from "../types/toDos";
import {
  convertHourMinuteSecondIntoSecond,
  type HourMinuteSecond,
} from "../utils/time";

type ToDos = {
  items: ToDo[];
  selectedItemId: string | null;
  selectedItemDeadlineTimeStampInSecond: number | null;
};

type ToDosAction =
  | {
      type: "toDoAdded";
      payload: {
        toDo: Pick<ToDo, "id" | "name"> & HourMinuteSecond;
      };
    }
  | {
      type: "selectedToDoUpdated";
      payload: {
        toDo: Pick<ToDo, "name"> & HourMinuteSecond;
      };
    }
  | {
      type: "selectedToDoRemoved";
    }
  | {
      type: "toDoSelected";
      payload: {
        selectedItemId: string;
      };
    }
  | {
      type: "selectedToDoStarted";
      payload: {
        newDeadlineTimeStampInSecond: number;
      };
    }
  | {
      type: "selectedToDoStopped";
    }
  | {
      type: "selectedToDoRan";
      payload: {
        newRemainingTimeInSecond: number;
      };
    }
  | {
      type: "selectedToDoReset";
      payload: {
        newDeadlineTimeStampInSecond: number | null;
      };
    };

type ToDosProviderProps = {
  children?: ReactNode;
};

const ToDosContext = createContext<ToDos | null>(null);
const ToDosDispatchContext = createContext<Dispatch<ToDosAction> | null>(null);

const initialToDos: ToDos = {
  items: [],
  selectedItemId: null,
  selectedItemDeadlineTimeStampInSecond: null,
};

export function ToDosProvider({ children }: ToDosProviderProps) {
  const [toDos, dispatch] = useReducer(toDosReducer, initialToDos);

  return (
    <ToDosContext.Provider value={toDos}>
      <ToDosDispatchContext.Provider value={dispatch}>
        {children}
      </ToDosDispatchContext.Provider>
    </ToDosContext.Provider>
  );
}

export function useToDos(): ToDos {
  const toDos = useContext(ToDosContext);

  if (toDos === null) {
    throw new Error("useToDos has to be used within ToDosContext.Provider");
  }

  return toDos;
}

export function useToDosDispatch(): Dispatch<ToDosAction> {
  const dispatch = useContext(ToDosDispatchContext);

  if (dispatch === null) {
    throw new Error(
      "useToDosDispatch has to be used within ToDosDispatchContext.Provider"
    );
  }

  return dispatch;
}

export function getSelectedToDo({
  items,
  selectedItemId,
  selectedItemDeadlineTimeStampInSecond,
}: ToDos): SelectedToDo | null {
  let selectedToDo = items.find((item) => item.id === selectedItemId);

  if (!selectedToDo) {
    return null;
  }

  return {
    ...selectedToDo,
    deadlineTimeStampInSecond: selectedItemDeadlineTimeStampInSecond,
  };
}

function toDosReducer(state: ToDos, action: ToDosAction): ToDos {
  switch (action.type) {
    case "toDoAdded": {
      const { id, name, hour, minute, second } = action.payload.toDo;
      const inputTimeInSecond = convertHourMinuteSecondIntoSecond({
        hour,
        minute,
        second,
      });

      return {
        ...state,
        items: [
          ...state.items,
          {
            id,
            name,
            scheduledTimeInSecond: inputTimeInSecond,
            remainingTimeInSecond: inputTimeInSecond,
          },
        ],
      };
    }
    case "selectedToDoUpdated": {
      const { name, hour, minute, second } = action.payload.toDo;
      const inputTimeInSecond = convertHourMinuteSecondIntoSecond({
        hour,
        minute,
        second,
      });

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === state.selectedItemId
            ? {
                ...item,
                name,
                scheduledTimeInSecond: inputTimeInSecond,
                remainingTimeInSecond: inputTimeInSecond,
              }
            : item
        ),
      };
    }
    case "selectedToDoRemoved": {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== state.selectedItemId),
        selectedItemId: null,
      };
    }
    case "toDoSelected": {
      const { selectedItemId } = action.payload;

      if (selectedItemId === state.selectedItemId) {
        return state;
      }

      return {
        ...state,
        selectedItemId: selectedItemId,
        selectedItemDeadlineTimeStampInSecond: null,
      };
    }
    case "selectedToDoStarted": {
      const { newDeadlineTimeStampInSecond } = action.payload;

      return {
        ...state,
        selectedItemDeadlineTimeStampInSecond: newDeadlineTimeStampInSecond,
      };
    }
    case "selectedToDoStopped": {
      return {
        ...state,
        selectedItemDeadlineTimeStampInSecond: null,
      };
    }
    case "selectedToDoRan": {
      const { newRemainingTimeInSecond } = action.payload;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === state.selectedItemId
            ? {
                ...item,
                remainingTimeInSecond: newRemainingTimeInSecond,
              }
            : item
        ),
        selectedItemDeadlineTimeStampInSecond:
          newRemainingTimeInSecond > 0
            ? state.selectedItemDeadlineTimeStampInSecond
            : null,
      };
    }
    case "selectedToDoReset": {
      const { newDeadlineTimeStampInSecond } = action.payload;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === state.selectedItemId
            ? {
                ...item,
                remainingTimeInSecond: item.scheduledTimeInSecond,
              }
            : item
        ),
        selectedItemDeadlineTimeStampInSecond: newDeadlineTimeStampInSecond,
      };
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}
