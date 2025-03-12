import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PaintEstimator from "@/components/calculators/PaintEstimator";
import TileEstimator from "@/components/calculators/TileEstimator";
import { IconType } from "react-icons";
import { Paintbrush2, Grid2X2 } from "lucide-react";

interface CalculatorCardProps {
  children: ReactNode;
  icon: IconType;
  title: string;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  children,
  icon: Icon,
  title,
}) => (
  <Card className="transition-all duration-200 hover:shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </CardContent>
  </Card>
);

const CalculatorsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Material Calculators
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estimate the materials needed for your construction project
              with our easy-to-use calculators. Simply enter your
              measurements to get started.
            </p>
          </div>

          {/* Calculators Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            <CalculatorCard icon={Paintbrush2} title="Paint Calculator">
              <PaintEstimator />
            </CalculatorCard>

            <CalculatorCard icon={Grid2X2} title="Tile Calculator">
              <TileEstimator />
            </CalculatorCard>
          </div>

          {/* Footer Section */}
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              Need help with calculations? Contact our support team for
              assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;
