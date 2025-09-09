export default function Button({ text, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        bg-gradient-to-br from-gray-500 via-blue-200 to-blue-400
        text-black font-semibold text-base uppercase tracking-wide
        rounded-xl px-6 py-3
        shadow-md transition-transform transition-shadow duration-300
        hover:-translate-y-1 hover:scale-105 hover:shadow-xl
        active:translate-y-0 active:scale-95 active:shadow-md
        disabled:bg-gray-300 disabled:text-gray-600 disabled:shadow-none
        mt-2
        cursor-pointer disabled:cursor-not-allowed
      `}
    >
      {text}
    </button>
  );
}
