import * as React from "react";

type ToastActionElement = React.ReactElement;

type ToastProps = {
    title?: string;
    description?: string;
    action?: ToastActionElement;
    variant?: "default" | "destructive";
};

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

type Toast = ToastProps & {
    id: string;
};

type ToasterToast = Toast;

type ToastAction =
    | { type: "ADD_TOAST"; toast: Toast }
    | { type: "UPDATE_TOAST"; toast: Partial<Toast> & { id: string } }
    | { type: "DISMISS_TOAST"; toastId?: string }
    | { type: "REMOVE_TOAST"; toastId?: string };

const listeners: Array<(toast: Toast) => void> = [];

let memoryState: Toast[] = [];

function genId() {
    return Math.random().toString(36).substring(2, 9);
}

function addToRemoveQueue(toastId: string) {
    if (toastTimeouts.has(toastId)) {
        return;
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        dispatch({
            type: "REMOVE_TOAST",
            toastId: toastId,
        });
    }, 3000);

    toastTimeouts.set(toastId, timeout);
}

export const reducer = (state: Toast[], action: ToastAction): Toast[] => {
    switch (action.type) {
        case "ADD_TOAST":
            return [action.toast, ...state].slice(0, 1);

        case "UPDATE_TOAST":
            return state.map((t) =>
                t.id === action.toast.id ? { ...t, ...action.toast } : t
            );

        case "DISMISS_TOAST": {
            const { toastId } = action;

            if (toastId) {
                addToRemoveQueue(toastId);
            } else {
                state.forEach((toast) => {
                    addToRemoveQueue(toast.id);
                });
            }

            return state.map((t) =>
                t.id === toastId || toastId === undefined
                    ? {
                        ...t,
                        open: false,
                    }
                    : t
            );
        }
        case "REMOVE_TOAST":
            if (action.toastId === undefined) {
                return [];
            }
            return state.filter((t) => t.id !== action.toastId);
    }

    return state;
};

function dispatch(action: ToastAction) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener) => {
        listener(memoryState[0]!);
    });
}

function toast(props: ToastProps) {
    const id = genId();

    const update = (props: ToastProps) =>
        dispatch({
            type: "UPDATE_TOAST",
            toast: { ...props, id },
        });
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

    dispatch({
        type: "ADD_TOAST",
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open: boolean) => {
                if (!open) dismiss();
            },
        },
    });

    return {
        id: id,
        dismiss,
        update,
    };
}

function useToast() {
    const [state, setState] = React.useState<Toast | null>(null);

    React.useEffect(() => {
        listeners.push(setState);
        return () => {
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [state]);

    return {
        toast,
        dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
        toasts: state ? [state] : [],
    };
}

export { useToast, toast };
export type { ToasterToast };
