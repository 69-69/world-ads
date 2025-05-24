import React, {useEffect, useState} from 'react';

export default function WidgetLoader(props: { fileName: string }) {
    const [Component, setComponent] = useState<React.ComponentType | null>(null);

    useEffect(() => {
        const loadComponent = async () => {
            try {
                const component = await import(`./${props.fileName}`);
                setComponent(() => component.default);
            } catch (error) {
                console.error(`Error loading component: ${props.fileName}:`, error);
            }
        };

        loadComponent();
    }, [props.fileName]);

    if (!Component) return <p>Loading {props.fileName}...</p>
    return (
        <Component/>
    )
}