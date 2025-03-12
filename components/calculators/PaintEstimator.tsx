"use client";
import { useState } from "react";
import axios from "axios";

interface PaintEstimatorData {
  wall_height: number;
  wall_width: number;
  unpainted_area_height: number;
  unpainted_area_width: number;
  number_of_coats: number;
  wall_type: string;
  surface_type: string;
}

interface EstimationResult {
  paint_needed: number; 
  total_wall_area: number;
  unpainted_area: number;
}

// API function
const estimatePaint = async (
  data: PaintEstimatorData
): Promise<EstimationResult> => {
  try {
    const response = await axios.post<EstimationResult>(
      "https://pawanperera5-buildmartapi.hf.space/estimate_paint", // Your backend URL should match here
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.detail || "Failed to estimate paint"
      );
    }
    throw error;
  }
};

const PaintEstimator = () => {

  const [formData, setFormData] = useState<PaintEstimatorData>({
    wall_height: 0,
    wall_width: 0,
    unpainted_area_height: 0,
    unpainted_area_width: 0,
    number_of_coats: 1,
    wall_type: "Exterior", 
    surface_type: "Standard", 
  });

  const [result, setResult] = useState<EstimationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    
    const numericValue = value === "" ? "" : Math.max(0, Number(value));

    setFormData({ ...formData, [name]: numericValue });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      
      const sanitizedData = {
        ...formData,
        unpainted_area_height: formData.unpainted_area_height || 0,
        unpainted_area_width: formData.unpainted_area_width || 0,
      };

      if (
        sanitizedData.wall_height <= 0 ||
        sanitizedData.wall_width <= 0
      ) {
        throw new Error("Wall dimensions must be greater than 0");
      }
      if (sanitizedData.number_of_coats <= 0) {
        throw new Error("Number of coats must be at least 1");
      }

      const response = await estimatePaint(sanitizedData);
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
            Paint Estimator
          </h1>

          <button
            onClick={() => setShowInstructions(true)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold hover:bg-blue-600"
            aria-label="View Instructions"
          >
            ?
          </button>

          {showInstructions && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  How to Use the Paint Estimator
                </h2>
                <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
                  <li>
                    Enter the height and width of the wall to be painted
                  </li>
                  <li>
                    Enter the dimensions of the unpainted area (if any)
                  </li>
                  <li>Select the number of coats of paint</li>
                  <li>
                    Choose the wall and surface types (affects paint
                    consumption)
                  </li>
                  <li>
                    Click "Estimate Paint" to calculate the paint required
                  </li>
                  <li>
                    The result will show the total paint required and area
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

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-gray-600 text-sm">
                Wall Height (ft):
              </label>
              <input
                type="number"
                name="wall_height"
                value={formData.wall_height}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-600 text-sm">
                Wall Width (ft):
              </label>
              <input
                type="number"
                name="wall_width"
                value={formData.wall_width}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-600 text-sm">
                Unpainted Area Height (ft):
              </label>
              <input
                type="number"
                name="unpainted_area_height"
                value={formData.unpainted_area_height}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-600 text-sm">
                Unpainted Area Width (ft):
              </label>
              <input
                type="number"
                name="unpainted_area_width"
                value={formData.unpainted_area_width}
                onChange={handleChange}
                min="0"
                step="0.1"
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-600 text-sm">
                Number of Coats:
              </label>
              <input
                type="number"
                name="number_of_coats"
                value={formData.number_of_coats}
                onChange={handleChange}
                min="1"
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-gray-600 text-sm">Wall Type:</label>
              <select
                name="wall_type"
                value={formData.wall_type}
                onChange={handleSelectChange}
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
              >
                <option value="Exterior">Exterior</option>
                <option value="Interior">Interior</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-gray-600 text-sm">
                Surface Type:
              </label>
              <select
                name="surface_type"
                value={formData.surface_type}
                onChange={handleSelectChange}
                className="w-full p-2 border rounded-md border-gray-300 text-sm"
              >
                <option value="Standard">Standard</option>
                <option value="Rough">Rough</option>
                <option value="Smooth">Smooth</option>
              </select>
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
                  Estimating...
                </span>
              ) : (
                "Estimate Paint"
              )}
            </button>

            {error && (
              <p className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                {error}
              </p>
            )}

            {result && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  Paint Estimation Result:
                </h3>
                <div className="space-y-2 text-sm text-green-600">
                  <p>
                    Total Wall Area:{" "}
                    <span className="font-bold">
                      {result.total_wall_area}
                    </span>{" "}
                    sq ft
                  </p>
                  <p>
                    Unpainted Area:{" "}
                    <span className="font-bold">
                      {result.unpainted_area}
                    </span>{" "}
                    sq ft
                  </p>
                  <p>
                    Paint Needed:{" "}
                    <span className="font-bold">
                      {result.paint_needed.toFixed(2)}
                    </span>{" "}
                    liters
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaintEstimator;
