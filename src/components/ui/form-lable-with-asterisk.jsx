// components/ui/form-label-with-asterisk.jsx
import { FormLabel } from "@/components/ui/form";

export const FormLabelWithAsterisk = ({ children, required, ...props }) => {
  return (
    <FormLabel {...props}>
      {children}
      {required && <span className="text-red-500">*</span>}
    </FormLabel>
  );
};