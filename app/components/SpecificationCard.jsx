import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const DashboardInfoCard = ({ title, description, items = [] }) => {
  // Ensure that items is always an array
  if (!Array.isArray(items)) {
    console.error("Expected 'items' to be an array.");
    items = [];
  }

  return (
    <Card className="shadow-lg bg-gradient-to-tr from-gray-50 via-white to-gray-100 hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="flex items-start gap-4 p-6">
        <div>
          <CardTitle className="text-lg font-semibold text-gray-800">
            {title}
          </CardTitle>
          <CardDescription className="text-xm text-gray-600 mt-1">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 min-h-[200px]">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between bg-gray-900 p-4 rounded-xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                <div>
                  <p className="text-lg font-medium text-gray-50">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-200">{item.value}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex justify-center items-center">
              <p className="text-gray-500">No items to display</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardInfoCard;
