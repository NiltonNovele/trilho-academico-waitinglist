import { Cog } from "lucide-react";
import CardFooter from "./Footer";

const CardHeader = ({
  title,
  features,
  price,
  discount,
}: {
  title: string;
  features: string;
  price: string;
  discount: string;
}) => {
  return (
    <div className="p-5 divide-y divide-[#F0E4D2]">
      <div className="space-y-6 pb-5">
        <div className="space-y-2">
          {price && discount && (
            <div className="text-orange-500 font-medium">
              Oferta limitada
            </div>
          )}
          <h2 className="md:text-2xl text-xl font-semibold">{title}</h2>
        </div>

        {price && discount && (
          <div className="inline-block bg-gray-200 rounded-lg px-3 py-1">
            <span className="text-green-500 text-xl font-semibold">MZN {discount}</span>{" "}
            <span className="text-red-500">antes MZN {price}</span>
          </div>
        )}
        <div className="border-t border-[#F0E4D2]"></div>
        <div className="space-y-3">
          {features.split(",").map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <Cog className="w-5 h-5 text-orange-500" />
              <span>{feature.trim()}</span>
            </div>
          ))}
        </div>
      </div>
      <CardFooter />
    </div>
  );
};

export default CardHeader;
