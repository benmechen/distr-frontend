import React from "react"

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string
}

const Button = ({ children, className, ...props }: IButton) => (
    <button
        {...props}
        className={`py-3 px-6 rounded-lg bg-gradient-to-bl from-cyan-500 to-blue-500 text-white font-black ${className}`}
    >
        {children}
    </button>
)
export default Button
