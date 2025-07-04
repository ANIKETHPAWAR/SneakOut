function Button({ label, children, onClick, type = "button", ...props }) {
  return (
    <button
      onClick={onClick}
      type={type}
      {...props}
      className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {children || label}
    </button>
  );
}
export default Button;