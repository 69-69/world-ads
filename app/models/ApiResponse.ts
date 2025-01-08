// models/ApiResponse.ts

export class ApiResponse<T = unknown> {
    data?: T | null;
    status?: number;
    message?: string;
    meta?: Record<string, unknown>;

    constructor(data?: T, status?: number, message?: string, meta?: Record<string, unknown>) {
        this.data = data;
        this.status = status;
        this.message = message;
        this.meta = meta;
    }
}
