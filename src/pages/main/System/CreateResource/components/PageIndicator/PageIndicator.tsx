interface IPageIndicator {
    page: number;
    total?: number;
}
const PageIndicator = ({ page, total = 3 }: IPageIndicator) => {
    const indicators = [];

    for (let i = 0; i < total; i += 1) {
        indicators.push(
            <span
                key={i}
                className={`w-3 h-3 rounded-full border border-gray-900 ${
                    i === page && 'bg-gray-900'
                } ${i !== total - 1 && 'mr-3'}`}
            />,
        );
    }

    return (
        <div className="flex items-center justify-center">
            {indicators.map((indicator) => indicator)}
        </div>
    );
};

export default PageIndicator;
