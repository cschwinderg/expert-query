import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import type { DomainOptions, Option, Profile } from 'types';

type Props = {
  children: ReactNode;
};

export type Content = {
  services: {
    eqDataApi: string;
    eqApiKey: string;
    eqApiSignupKey: string;
  };
  alertsConfig: {
    [page: string]: {
      class: string;
      content: string;
    };
  };
  domainValues: DomainOptions;
  filterConfig: {
    filterFields: Array<{
      boundary?: 'low' | 'high';
      default?: Option;
      contextFields?: string[];
      direction?: 'asc' | 'desc';
      domain?: string;
      key: string;
      label: string;
      placeholder?: string;
      secondaryKey?: string;
      source?: string;
      type: 'date' | 'multiselect' | 'select' | 'year';
    }>;
    filterGroupLabels: {
      [key: string]: string;
    };
    filterGroups: {
      [P in Profile]: Array<{
        key: string;
        fields: string[];
      }>;
    };
    sourceFields: Array<{
      id: string;
      key: string;
      label: string;
      type: 'select';
    }>;
  };
  glossary: Array<{
    term: string;
    definition: string;
    definitionHtml: string;
  }>;
  listOptions: Option[];
  metadata: Partial<{
    [P in Profile]: {
      url: string;
      size: number | null;
      numRows: number;
      timestamp: string;
    };
  }>;
  parameters: {
    debounceMilliseconds: number;
    selectOptionsPageSize: number;
  };
  profileConfig: {
    [P in Profile]: {
      description: string;
      columns: Set<string>;
      label: string;
      resource: string;
    };
  };
};

export type JsonContent = Omit<Content, 'profileConfig'> & {
  profileConfig: {
    [P in Profile]: {
      description: string;
      columns: string[];
      label: string;
      resource: string;
    };
  };
};

type State = {
  content:
    | { status: 'idle'; data: Record<string, never> }
    | { status: 'pending'; data: Record<string, never> }
    | { status: 'success'; data: Content }
    | { status: 'failure'; data: Record<string, never> };
};

export type Action =
  | { type: 'FETCH_CONTENT_REQUEST' }
  | {
      type: 'FETCH_CONTENT_SUCCESS';
      payload: Content;
    }
  | { type: 'FETCH_CONTENT_FAILURE' };

const StateContext = createContext<State | undefined>(undefined);
const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_CONTENT_REQUEST': {
      return {
        ...state,
        content: {
          status: 'pending',
          data: {},
        },
      };
    }

    case 'FETCH_CONTENT_SUCCESS': {
      return {
        ...state,
        content: {
          status: 'success',
          data: action.payload,
        },
      };
    }

    case 'FETCH_CONTENT_FAILURE': {
      return {
        ...state,
        content: {
          status: 'failure',
          data: {},
        },
      };
    }

    default: {
      const message = `Unhandled action type: ${action}`;
      throw new Error(message);
    }
  }
}

export function ContentProvider({ children }: Props) {
  const initialState: State = {
    content: {
      status: 'idle',
      data: {},
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

/**
 * Returns state stored in `ContentProvider` context component.
 */
export function useContentState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    const message = 'useContentState must be called within a ContentProvider';
    throw new Error(message);
  }
  return context;
}

/**
 * Returns `dispatch` method for dispatching actions to update state stored in
 * `ContentProvider` context component.
 */
export function useContentDispatch() {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    const message = 'useContentDispatch must be used within a ContentProvider';
    throw new Error(message);
  }
  return context;
}
