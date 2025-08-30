import React from "react";
type StatisticsCardProps = {
  count: number;
  title: string;
};
const StatisticsCard = ({ count, title }: StatisticsCardProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold sm:text-2xl">{count}</h3>
      <p className="text-gray-500 font-medium text-sm md:text-base">{title}</p>
    </div>
  );
};

export default StatisticsCard;
