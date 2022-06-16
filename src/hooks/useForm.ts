import { useState } from "react";

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [data, setData] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  function handleChange(name: keyof T) {
    return (eventOrValue: string | number | React.ChangeEvent<HTMLInputElement>) => {
      const value =
        typeof eventOrValue !== "string" && typeof eventOrValue !== "number"
          ? eventOrValue.target.type === "checkbox"
            ? eventOrValue.target.checked
            : eventOrValue.target.value
          : eventOrValue;

      setData((data) => ({ ...data, [name]: value }));
    };
  }

  function setError(name: keyof T, error: string) {
    setErrors((errors) => ({ ...errors, [name]: error }));
  }

  function setValue(name: keyof T, value: any) {
    setData((data) => ({ ...data, [name]: value }));
  }

  function clearError() {
    setErrors(initialValues);
  }

  return { data, handleChange, setError, setValue, errors, clearError };
}
