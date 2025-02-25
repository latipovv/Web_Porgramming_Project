import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/cryptosSlice";

export function CryptoPagination() {
  const { page } = useSelector((state) => state.cryptos);
  const dispatch = useDispatch();
  const totalPages = 10;

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      dispatch(setPage(pageNum));
    }
  };

  const createPaginationButtons = () => {
    let buttons = [];

    // Previous Button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-2 mx-1 rounded-md transition-all duration-300 ${
          page === 1 ? "opacity-50 cursor-not-allowed text-gray-500" : "hover:bg-blue-600 hover:text-white text-blue-400"
        }`}
      >
        &lt;
      </button>
    );

    // First Page Button
    if (page > 2) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-2 mx-1 rounded-md transition-all duration-300 ${
            page === 1 ? "bg-blue-600 text-white shadow-md" : "text-blue-400 hover:bg-blue-600 hover:text-white"
          }`}
        >
          1
        </button>
      );

      if (page > 3) {
        buttons.push(<span key="dots1" className="px-2 text-gray-500">...</span>);
      }
    }

    // Page Numbers Around Current Page
    for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 mx-1 rounded-md transition-all duration-300 ${
            page === i ? "bg-blue-600 text-white shadow-md" : "text-blue-400 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    // Last Page Button
    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        buttons.push(<span key="dots2" className="px-2 text-gray-500">...</span>);
      }

      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-2 mx-1 rounded-md transition-all duration-300 ${
            page === totalPages ? "bg-blue-600 text-white shadow-md" : "text-blue-400 hover:bg-blue-600 hover:text-white"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    // Next Button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-2 mx-1 rounded-md transition-all duration-300 ${
          page === totalPages ? "opacity-50 cursor-not-allowed text-gray-500" : "hover:bg-blue-600 hover:text-white text-blue-400"
        }`}
      >
        &gt;
      </button>
    );

    return buttons;
  };

  return (
    <div className="flex justify-center items-center pb-4 mt-4 space-x-2">
      {createPaginationButtons()}
    </div>
  );
}
