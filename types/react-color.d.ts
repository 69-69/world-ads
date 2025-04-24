declare module '@/types/react-color' {
    import * as React from 'react';

    export interface ChromePickerProps {
        color: string;
        onChange: (color: { hex: string }) => void;
    }

    export class ChromePicker extends React.Component<ChromePickerProps> {}
}

