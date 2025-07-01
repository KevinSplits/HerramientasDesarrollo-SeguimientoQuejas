export function Button({ onClick, children, className, ...props }) {
  return (
    <button
      className={`px-4 py-1 rounded-md my-2 disabled:bg-indigo-300 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
