export default function Input({ label, type = "text", value, onChange, placeholder, name }) {
  return (
    <div className="space-y-2">
      {label ? (
        <label className="block text-sm text-neutral-600">{label}</label>
      ) : null}

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-neutral-800 placeholder:text-neutral-400 outline-none border-b border-neutral-200 focus:border-neutral-400 py-3"
      />
    </div>
  );
}
