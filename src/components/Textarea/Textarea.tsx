import React from 'react';

type ITextarea = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextarea>(
    ({ className, ...props }, ref) => (
        <textarea
            {...props}
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            className={`rounded-lg bg-gray-100 outline-none border-none p-4 w-full ${className}`}
        />
    ),
);
export default Textarea;
