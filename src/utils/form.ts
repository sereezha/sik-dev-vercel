import { EMAIL_REGEX, PHONE_REGEX } from "src/constants/regex";

export interface FormData {
  phone: string;
  email: string;
  bottles: string;
  months: string;
}

export interface ValidationResult {
  errors: Partial<Record<keyof FormData, string>>;
  validatedData: Partial<FormData>;
}

export function validateForm(formData: FormData): ValidationResult {
  const errors: Partial<Record<keyof FormData, string>> = {};
  const validatedData: Partial<FormData> = {};

  const phone = formData.phone.replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Введіть номер телефону";
  } else if (!PHONE_REGEX.test(phone)) {
    errors.phone = "Недійсний номер";
  } else {
    validatedData.phone = phone;
  }

  const email = formData.email.trim();
  if (!email) {
    errors.email = "Введіть Email";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Недійсний Email";
  } else {
    validatedData.email = email;
  }


  validatedData.bottles = formData.bottles;
  validatedData.months = formData.months;

  return { errors, validatedData };
}
