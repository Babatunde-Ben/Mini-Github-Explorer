import React from "react";
import SearchCrossIcon from "@/app/_assets/svg/search-cross.svg";

type EmptySearchResultProps = {
  errorMessage: string;
};
const EmptySearchResultCard = ({ errorMessage }: EmptySearchResultProps) => {
  return (
    <div className="text-center py-12">
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-8 max-w-md mx-auto">
        <div className="text-gray-400 mb-4">
          <SearchCrossIcon className="w-16 h-16 mx-auto mb-4" />
        </div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">
          User Not Found
        </h3>
        <p className="text-gray-400 text-sm mb-4">{errorMessage}</p>
      </div>
    </div>
  );
};

export default EmptySearchResultCard;
