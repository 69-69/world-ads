// Types for the form data and error state
export interface Field {
    name: string;
    label?: string;
    suffix?: string;
    type?: string;
    value?: string | number;
    isTextArea?: boolean;
    fullWidth?: boolean;
}
