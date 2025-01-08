// models/VerifyContact.ts
type VerifyInterface = { emailCode: string | undefined, smsCode: string | undefined };

//
export class VerifyContact {
    emailCode: string | undefined;
    smsCode: string | undefined;

    constructor({emailCode = '', smsCode = ''}: VerifyInterface) {
        this.emailCode = emailCode;
        this.smsCode = smsCode;
    }
}
