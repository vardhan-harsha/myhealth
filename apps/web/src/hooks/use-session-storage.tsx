import * as React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

// ============================================================================

declare global {
  interface WindowEventMap {
    "session-storage": CustomEvent;
  }
}

type UseSessionStorageOptions<T> = {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  initializeWithValue?: boolean;
};

const IS_SERVER = typeof window === "undefined";

export function useSessionStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseSessionStorageOptions<T> = {}
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] {
  const { initializeWithValue = true } = options;

  const serializer = React.useCallback(
    (value: T): string => {
      if (options.serializer) {
        return options.serializer(value);
      }
      return JSON.stringify(value);
    },
    [options]
  );

  const deserializer = React.useCallback(
    (value: string): T => {
      if (options.deserializer) {
        return options.deserializer(value);
      }
      if (value === "undefined") {
        return undefined as unknown as T;
      }

      const defaultValue =
        initialValue instanceof Function ? initialValue() : initialValue;

      let parsed: unknown;
      try {
        parsed = JSON.parse(value);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return defaultValue;
      }

      return parsed as T;
    },
    [options, initialValue]
  );

  const readValue = React.useCallback((): T => {
    const initialValueToUse =
      initialValue instanceof Function ? initialValue() : initialValue;

    if (IS_SERVER) {
      return initialValueToUse;
    }

    try {
      const raw = window.sessionStorage.getItem(key);
      return raw ? deserializer(raw) : initialValueToUse;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValueToUse;
    }
  }, [initialValue, key, deserializer]);

  const [storedValue, setStoredValue] = React.useState(() => {
    if (initializeWithValue) {
      return readValue();
    }
    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  const setValue: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    (value) => {
      if (IS_SERVER) {
        console.warn(
          `Tried setting sessionStorage key "${key}" even though environment is not a client`
        );
        return;
      }

      try {
        const newValue =
          value instanceof Function ? value(readValue()) : value;

        window.sessionStorage.setItem(key, serializer(newValue));
        setStoredValue(newValue);
        window.dispatchEvent(new StorageEvent("session-storage", { key }));
      } catch (error) {
        console.warn(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, serializer, readValue]
  );

  const removeValue = React.useCallback(() => {
    if (IS_SERVER) {
      console.warn(
        `Tried removing sessionStorage key "${key}" even though environment is not a client`
      );
      return;
    }

    const defaultValue =
      initialValue instanceof Function ? initialValue() : initialValue;

    window.sessionStorage.removeItem(key);
    setStoredValue(defaultValue);
    window.dispatchEvent(new StorageEvent("session-storage", { key }));
  }, [key, initialValue]);

  React.useEffect(() => {
    setStoredValue(readValue());
  }, [key, readValue]);

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent | Event) => {
      if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
        return;
      }
      setStoredValue(readValue());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("session-storage", handleStorageChange as EventListener);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("session-storage", handleStorageChange as EventListener);
    };
  }, [key, readValue]);

  return [storedValue, setValue, removeValue];
}

export type { UseSessionStorageOptions };

// ============================================================================