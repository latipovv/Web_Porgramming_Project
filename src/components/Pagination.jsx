import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/cryptosSlice";


export function CryptoPagination() {
  const { page } = useSelector((state) => state.cryptos);
  const dispatch = useDispatch();
  const totalPages = 10;

  const handlePageChange = (pageNum) => {
    dispatch(setPage(pageNum));
  };

  const createPaginationButtons = () => {
    let buttons = [];

  
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 mx-1 text-blue-400 ${
          page === 1 ? "opacity-50 cursor-not-allowed" : "hover:text-blue-600"
        }`}
      >
        &lt;
      </button>
    );


    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded-full transition-all duration-300 focus:outline-none
            ${
              page === i
                ? "bg-gray-700 text-blue-400 shadow-md"
                : "text-blue-400 hover:text-blue-600"
            }`}
        >
          {i}
        </button>
      );
    }


    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 mx-1 text-blue-400 ${
          page === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-blue-600"
        }`}
      >
        &gt;
      </button>
    );

    return buttons;
  };

  return (
    <div className="flex justify-center items-center pb-4 mt-4">
      {createPaginationButtons()}
    </div>
  );
}
