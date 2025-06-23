"use client"
import Button from "./Button"

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                </svg>
                <h3 className="text-lg font-medium text-red-800 mb-2">Something went wrong</h3>
                <p className="text-red-600">{message}</p>
            </div>
            {onRetry && (
                <Button onClick={onRetry} variant="primary">
                    Try Again
                </Button>
            )}
        </div>
    )
}

export default ErrorMessage