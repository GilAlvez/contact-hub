import { useState } from "react";

type ErrorRecord<T> = Partial<Record<keyof T, string[]>>;

type ValidationFn<T> = (value: T) => string | undefined;

type Validations<T> = {
  [K in keyof T]?: ValidationFn<T[K]>[];
};

/**
 * useFormValidation hook to manage form validation and errors.
 *
 * @typeparam `T` Type of the object representing form fields. It should be an object
 * with keys corresponding to the form fields. The values for these keys will be
 * arrays of validation functions, each returning a string error message or undefined.
 *
 * @example
 * const { errors, validate, resetErrors } = useFormValidation<{ name: string; email: string; }>();
 *
 * // Use `validate` function to validate form data
 * const hasErrors = validate(formData, {
 *   name: [(value) => (!value ? "Name is required" : undefined)],
 *   email: [(value) => (value && !isEmailValid(value) ? "Email is invalid" : undefined)],
 * });
 *
 * console.log(errors); // { name: ["Name is required"], email: ["Email is invalid"] }
 *
 * // Use `resetErrors` to clear all errors
 * resetErrors();
 *
 * @returns An object with three fields:
 * - errors: an object containing the current errors of the form.
 * - validate: a function to validate the form data based on provided validations.
 *   Returns `true` if there are any errors.
 * - resetErrors: a function to reset all errors in the form.
 */
export default function useFormValidation<T>() {
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  // // Old solution
  // function addError(field: keyof T, message: string) {
  //   setErrors((prevState) => ({
  //     ...prevState,
  //     [field]: [...(prevState[field] ?? []), message],
  //   }));
  // }

  const validate = (data: T, validations: Validations<T>) => {
    const newErrors: ErrorRecord<T> = {};
    let hasError = false;

    (Object.keys(validations) as (keyof T)[]).forEach((field) => {
      const validationFunction = validations[field] || [];
      const fieldErrors = validationFunction
        // Get each validation message by field
        .map((fn) => fn(data[field]))
        // Remove undefined values from messages list
        .filter((message): message is string => message !== undefined);

      if (fieldErrors.length > 0) {
        newErrors[field] = fieldErrors;
        hasError = true;
      }
    });

    setErrors(newErrors);
    return hasError;
  };

  function resetErrors() {
    setErrors({});
  }

  return { errors, validate, resetErrors };
}
