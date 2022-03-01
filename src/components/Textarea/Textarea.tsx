import React from 'react';

interface ITextarea extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, ITextarea>(
	({ className, children, ...props }, ref) => (
		<textarea
			{...props}
			ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
			className="rounded-lg bg-gray-100 outline-none border-none p-4 w-full"
		></textarea>
	),
);
export default Textarea;
