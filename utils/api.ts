import axios from "axios";

const API_BASE_URL = "https://pawanperera5-buildmartapi.hf.space";

// Tile Estimator Data Interface
export interface TileEstimatorData {
  room_length: number; // in feet
  room_width: number; // in feet
  tile_length: number; // in feet (converted from cm)
  tile_width: number; // in feet (converted from cm)
  extra_percentage: number;
}

// Tile Estimator Response Interface
interface TileEstimatorResponse {
  total_tiles_needed: number; // number of tiles
  floor_area: number; // in square feet
  tile_area: number; // in square feet
}

// Paint Estimator Data Interface
export interface PaintEstimatorData {
  wall_height: number; // in feet
  wall_width: number; // in feet
  unpainted_area_height: number; // in feet
  unpainted_area_width: number; // in feet
  number_of_coats: number; // number of paint coats
  wall_type: "Interior" | "Exterior"; // Type of wall
  surface_type: "Smooth" | "Rough" | "Standard"; // Type of surface
}

// Paint Estimator Response Interface
interface PaintEstimatorResponse {
  paint_needed: number; // in liters
  total_wall_area: number; // in square feet
  unpainted_area: number; // in square feet
}

// Utility function to convert centimeters to feet (if needed)
const cmToFeet = (cm: number): number => cm / 30.48;

// Estimate Tiles function
export const estimateTiles = async (
  data: TileEstimatorData
): Promise<TileEstimatorResponse> => {
  try {
    const dataToSend = {
      ...data,
      tile_length: cmToFeet(data.tile_length),
      tile_width: cmToFeet(data.tile_width),
    };

    const response = await axios.post<TileEstimatorResponse>(
      `${API_BASE_URL}/estimate_tiles`,
      dataToSend
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to estimate tiles";
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Estimate Paint function
export const estimatePaint = async (
  data: PaintEstimatorData
): Promise<PaintEstimatorResponse> => {
  try {
    const dataToSend = {
      ...data,
    };

    const response = await axios.post<PaintEstimatorResponse>(
      `${API_BASE_URL}/estimate_paint`,
      dataToSend
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.detail || "Failed to estimate paint";
      throw new Error(errorMessage);
    }
    throw error;
  }
};
