export function Button({ label, onClick, className = '' }) {
    return (
        <button
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 ${className}`}
        >
            {label}
        </button>
    );
}