import React from "react"

interface IButton {
    children: string
}

const Button = ({ children }: IButton) => (
    <button
        type="button"
        className="py-3 px-6 rounded-lg bg-gradient-to-bl from-cyan-500 to-blue-500 text-white font-black"
    >
        {children}
    </button>
)
export default Button
