'use client';

interface ExplanationModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const ExplanationModal = ({ isVisible, onClose }: ExplanationModalProps) => {
  // Don't render anything if it's not visible
  if (!isVisible) {
    return null;
  }

  // Prevents closing the modal when clicking inside the content area
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // Backdrop: Covers the whole screen and closes the modal on click
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-lg rounded-lg bg-white p-6 text-black shadow-2xl"
        onClick={handleModalContentClick}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl font-bold text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          What is Conway's Game of Life?
        </h2>
        <p className="mb-4 text-gray-700">
          The Game of Life is a "zero-player game," meaning its evolution is
          determined by its initial state, requiring no further input. You create an
          initial pattern of live cells and then watch how it evolves based on a
          few simple rules.
        </p>

        <h3 className="mb-2 text-lg font-semibold text-gray-800">The Rules</h3>
        <ul className="list-inside list-disc space-y-2 text-gray-700">
          <li>
            <strong>Underpopulation:</strong> Any live cell with fewer than two live
            neighbours dies.
          </li>
          <li>
            <strong>Survival:</strong> Any live cell with two or three live neighbours
            lives on to the next generation.
          </li>
          <li>
            <strong>Overpopulation:</strong> Any live cell with more than three live
            neighbours dies.
          </li>
          <li>
            <strong>Reproduction:</strong> Any dead cell with exactly three live
            neighbours becomes a live cell.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExplanationModal;