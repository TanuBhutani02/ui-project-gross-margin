interface ProjectTableDataProps {
  name: string;
  totalCost: number;
  totalRevenue: number;
  margin: number;
  grossMarginPercentage: number;
}

export function ProjectTableData({name, totalCost, totalRevenue, margin, grossMarginPercentage}: ProjectTableDataProps){
    return(
        <div className="w-full lg:w-1/2">
        <h2 className="text-xl font-bold text-gray-900 font-gabarito mb-4 text-center lg:text-left">
          {name} - Financial Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-3 text-gray-700 font-gabarito font-semibold">Cost to Company</td>
                <td className="px-6 py-3 text-gray-900">₹{totalCost?.toLocaleString("en-IN")}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-3 text-gray-700 font-gabarito font-semibold">Actual Billing Cost</td>
                <td className="px-6 py-3 text-gray-900">₹{totalRevenue?.toLocaleString("en-IN")}</td>
              </tr>
              <tr className="border-b">
                <td className="px-6 py-3 text-gray-700 font-gabarito font-semibold">Gross Margin</td>
                <td className={`px-6 py-3 font-semibold ${margin >= 0 ? "text-green-700" : "text-red-700"}`}>
                  ₹{margin.toLocaleString("en-IN")}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 text-gray-700 font-gabarito font-semibold">Gross Margin %</td>
                <td className={`px-6 py-3 font-semibold ${grossMarginPercentage >= 0.00 ? "text-green-700" : "text-red-700"}`}>
                  {grossMarginPercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
}