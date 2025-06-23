const Loader = ({ size = "medium", text = "Loading..." }) => {
    const sizes = {
        small: "h-4 w-4",
        medium: "h-8 w-8",
        large: "h-12 w-12",
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${sizes[size]}`}></div>
            {text && <p className="mt-4 text-gray-600">{text}</p>}
        </div>
    )
}

export default Loader  