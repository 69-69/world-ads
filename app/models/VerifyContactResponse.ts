// models/VerifyContactResponse.ts
type _VerifyInterface = { fieldName: string, role: string };

//
export class VerifyContactResponse {
    fieldName: string;
    role: string | undefined;

    constructor({fieldName = '', role = ''}: _VerifyInterface) {
        this.fieldName = fieldName;
        this.role = role;
    }
}