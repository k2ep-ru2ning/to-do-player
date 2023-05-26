import {
  createContext,
  type Dispatch,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

export type ToDo = {
  id: string;
  name: string;
  scheduledTimeInSecond: number;
  remainingTimeInSecond: number;
};

export type SelectedToDo = ToDo & {
  status: "ready" | "running" | "finished";
};

type ToDos = {
  items: ToDo[];
  selectedItem: Pick<SelectedToDo, "id" | "status"> | null;
};

type ToDosAction =
  | {
      type: "toDoAdded";
      payload: {
        toDo: ToDo;
      };
    }
  | {
      type: "toDoUpdated";
      payload: {
        toDo: ToDo;
      };
    }
  | {
      type: "toDoRemoved";
      payload: {
        toDoId: ToDo["id"];
      };
    }
  | {
      type: "toDoSelected";
      payload: {
        toDo: ToDo;
      };
    }
  | {
      type: "selectedToDoCleared";
    }
  | {
      type: "selectedToDoStarted";
    }
  | {
      type: "selectedToDoStopped";
    }
  | {
      type: "selectedToDoRan";
      payload: {
        newRemainingTimeInSecond: ToDo["remainingTimeInSecond"];
      };
    }
  | {
      type: "selectedToDoFinished";
    }
  | {
      type: "selectedToDoReset";
    };

type ToDosProviderProps = {
  children?: ReactNode;
};

const ToDosContext = createContext<ToDos | null>(null);
const ToDosDispatchContext = createContext<Dispatch<ToDosAction> | null>(null);

const initialToDos: ToDos = {
  items: [],
  selectedItem: null,
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
  selectedItem,
}: ToDos): SelectedToDo | null {
  if (!selectedItem) return null;

  const toDo = items.find((item) => item.id === selectedItem.id);
  if (!toDo) return null;

  return {
    ...toDo,
    status: selectedItem.status,
  };
}

function toDosReducer(state: ToDos, action: ToDosAction): ToDos {
  switch (action.type) {
    case "toDoAdded": {
      const { toDo } = action.payload;
      const { items } = state;

      return {
        ...state,
        items: [...items, { ...toDo }],
      };
    }
    case "toDoUpdated": {
      const { toDo } = action.payload;
      const { items } = state;

      return {
        ...state,
        items: items.map((item) => (item.id === toDo.id ? { ...toDo } : item)),
      };
    }
    case "toDoRemoved": {
      const { toDoId } = action.payload;
      const { items } = state;

      return {
        ...state,
        items: items.filter((item) => item.id !== toDoId),
      };
    }
    case "toDoSelected": {
      const { toDo } = action.payload;

      if (toDo.id === state.selectedItem?.id) {
        return state;
      }

      return {
        ...state,
        selectedItem: {
          id: toDo.id,
          status: toDo.remainingTimeInSecond > 0 ? "ready" : "finished",
        },
      };
    }
    case "selectedToDoCleared": {
      return {
        ...state,
        selectedItem: null,
      };
    }
    case "selectedToDoStarted": {
      const { selectedItem } = state;

      if (!selectedItem) {
        return state;
      }

      return {
        ...state,
        selectedItem: {
          ...selectedItem,
          status: "running",
        },
      };
    }
    case "selectedToDoStopped": {
      const { selectedItem } = state;

      if (!selectedItem) {
        return state;
      }

      return {
        ...state,
        selectedItem: {
          ...selectedItem,
          status: "ready",
        },
      };
    }
    case "selectedToDoRan": {
      const { selectedItem, items } = state;

      if (!selectedItem) {
        return state;
      }

      const { newRemainingTimeInSecond } = action.payload;

      return {
        ...state,
        items: items.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                remainingTimeInSecond: newRemainingTimeInSecond,
              }
            : item
        ),
      };
    }
    case "selectedToDoFinished": {
      const { selectedItem } = state;

      if (!selectedItem) {
        return state;
      }

      return {
        ...state,
        selectedItem: {
          ...selectedItem,
          status: "finished",
        },
      };
    }
    case "selectedToDoReset": {
      const { selectedItem, items } = state;

      if (!selectedItem) {
        return state;
      }

      return {
        ...state,
        items: items.map((item) =>
          item.id === selectedItem.id
            ? { ...item, remainingTimeInSecond: item.scheduledTimeInSecond }
            : item
        ),
      };
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}
