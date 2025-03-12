"use client";
import { useState } from "react";
import axios from "axios";

// Define interfaces
interface TileEstimatorData {
  room_length: number;
  room_width: number;
  tile_length: number;
  tile_width: number;
  extra_percentage: number;
}

interface EstimationResult {
  tiles_needed: number;
  room_area: number;
  tile_area: number;
}

// API function
const estimateTiles = async (
  data: TileEstimatorData
): Promise<EstimationResult> => {
  try {
    const response = await axios.post<EstimationResult>(
      "https://pawanperera5-buildmartapi.hf.space/estimate_tiles",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.detail || "Failed to estimate tiles"
      );
    }
    throw error;
  }
};

const TileEstimator = () => {
  // State management
  const [formData, setFormData] = useState<TileEstimatorData>({
    room_length: 0,
    room_width: 0,
    tile_length: 1, // Default to 1x1 tile size
    tile_width: 1,
    extra_percentage: 10,
  });

  const [result, setResult] = useState<EstimationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  // Input handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow empty input for intermediate states
    if (value === "") {
      setFormData({ ...formData, [name]: "" });
      return;
    }

    // Ensure numeric values are positive
    const numericValue = Math.max(0, Number(value));
    setFormData({ ...formData, [name]: numericValue });
  };

  const handleTileSizeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const [length, width] = e.target.value.split("x").map(Number);
    setFormData({ ...formData, tile_length: length, tile_width: width });
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Validate inputs
      if (formData.room_length <= 0 || formData.room_width <= 0) {
        throw new Error("Room dimensions must be greater than 0");
      }
      if (formData.tile_length <= 0 || formData.tile_width <= 0) {
        throw new Error("Tile dimensions must be greater than 0");
      }

      const response = await estimateTiles(formData);
      setResult(response);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-5">
      <div className="container mx-auto px-5">
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md relative">
          <h1 className="text-xl font-semibold text-center text-gray-700 mb-6">
            Floor Tile Estimator
          </h1>

          {/* Information Button */}
          <button
            onClick={() => setShowInstructions(true)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold hover:bg-blue-600"
            aria-label="View Instructions"
          >
            ?
          </button>

          {/* Instructions Modal */}
          {showInstructions && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  How to Use the Floor Tile Estimator
                </h2>
                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                  <li>Enter the length and width of your room in feet</li>
                  <li>
                    Select a standard tile size from the dropdown menu
                  </li>
                  <li>
                    Adjust the extra percentage for wastage if needed
                    (default is 10%)
                  </li>
                  <li>
                    Click "Estimate Tiles" to calculate the number of tiles
                    needed
                  </li>
                  <li>
                    The result will show total tiles needed and area
                    calculations
                  </li>
                </ul>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="mt-6 w-full p-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Main Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-gray-600 text-sm">
                Room Length (ft):
              </label>
              <input
                type="number"
                name="room_length"
                value={formData.room_length}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-600 text-sm">
                Room Width (ft):
              </label>
              <input
                type="number"
                name="room_width"
                value={formData.room_width}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-600 text-sm">Tile Size:</label>
              <select
                onChange={handleTileSizeChange}
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
              >
                <option value="1x1">1' x 1' </option>
                <option value="1x2">1' x 2' </option>
                <option value="2x2">2' x 2' </option>
                <option value="2x4">2' x 4' </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-600 text-sm">
                Extra Percentage for Wastage (%):
              </label>
              <input
                type="number"
                name="extra_percentage"
                value={formData.extra_percentage}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-blue-600 text-white rounded-md disabled:bg-gray-400 text-sm hover:bg-blue-700 transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Calculating...
                </span>
              ) : (
                "Estimate Tiles"
              )}
            </button>
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          {/* Results Display */}
          {result && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                Tile Estimation Results:
              </h3>
              <div className="space-y-2 text-sm text-green-600">
                <p>
                  Total Tiles Needed:{" "}
                  <span className="font-bold">{result.tiles_needed}</span>
                </p>
                <p>
                  Room Area:{" "}
                  <span className="font-bold">{result.room_area}</span> sq
                  ft
                </p>
                <p>
                  Tile Area:{" "}
                  <span className="font-bold">{result.tile_area}</span> sq
                  ft
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TileEstimator;
