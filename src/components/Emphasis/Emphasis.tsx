interface IEmphasis {
    children: string
}

const Emphasis = ({ children }: IEmphasis) => (
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        {children}
    </span>
)
export default Emphasis
