export default function Button({ children, type = "button", onClick, disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full h-12 rounded-md bg-neutral-700 text-white font-semibold hover:bg-neutral-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
