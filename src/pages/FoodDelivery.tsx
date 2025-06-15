
import Header from "@/components/Header";
import CustomerFoodDisplay from "@/components/CustomerFoodDisplay";

const FoodDelivery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Food Delivery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Order delicious food from our verified vendors and get it delivered fresh to your loved ones.
          </p>
        </div>

        <CustomerFoodDisplay />
      </div>
    </div>
  );
};

export default FoodDelivery;
