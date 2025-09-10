export default function Pagination({ page, totalPages, onPageChange }) {
  const visiblePages = 3; // number of page circles visible

  let start = Math.floor((page - 1) / visiblePages) * visiblePages + 1;
  let end = Math.min(start + visiblePages - 1, totalPages);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-3 mt-8 mb-12 flex-wrap">
      <button
        className={`px-3 py-1 rounded-full font-semibold transition-colors duration-200 ${
          page === 1
            ? "bg-gray-200 text-white cursor-not-allowed"
            : "bg-[#004f7a] text-white hover:bg-[#004f7a] opacity-95"
        }`}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      {start > 1 && (
        <button
          className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium"
          onClick={() => onPageChange(start - 1)}
        >
          …
        </button>
      )}

      {pages.map((p) => (
        <button
          key={p}
          className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition-all duration-200 ${
            p === page
              ? "bg-[#004f7a] text-white scale-110 shadow-lg opacity-80"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 opacity-90"
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <button
          className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium"
          onClick={() => onPageChange(end + 1)}
        >
          …
        </button>
      )}

      <button
        className={`px-3 py-1 rounded-full font-semibold transition-colors duration-200 ${
          page === totalPages
            ? "bg-gray-200 text-white cursor-not-allowed"
            : "bg-[#004f7a] text-white hover:bg-[#004f7a] opacity-95"
        }`}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
