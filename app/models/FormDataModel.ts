interface FormDataModel {
    [key: string]: string | number | File | File[];
}

const to_FormData = (data: FormDataModel): FormData => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        const value = data[key];
        // console.log('key:', key, 'value:', value);  // Log to see the key and value

        if (value instanceof File) {
            // If it's a file (like the logo), append it as a file
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            // If it's an array of files, append them as multiple files
            value.forEach((file) => formData.append(key, file));
        } else {
            // For other types (string, number, etc.), append normally
            formData.append(key, String(value));
        }
    });

    return formData;
};

export {type FormDataModel, to_FormData};
