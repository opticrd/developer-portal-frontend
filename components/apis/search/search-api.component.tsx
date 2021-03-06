import React, { useEffect, useState } from 'react';
import { SummaryAPI } from '../../../models/summary-api';
import { getApis, searchApi } from '../../../services/apis.service';
import sortBy from '../../../utils/sortby';
import SearchChangeDistribution from './search-change-distribution';
import SearchSorter from './search-sorter';
export default function SearchApiComponent({
  setApis,
  setSearching,
  distribution,
  setDistribution,
  onOptionSelected,
}: any) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const onSearch = async () => {
    if (searchTerm.length) setSearching(true);
    const data: SummaryAPI[] = searchTerm.trim()
      ? await searchApi(searchTerm)
      : await getApis();
    setApis(data);
    setSearching(false);
  };


  useEffect(() => {
    const timeout = setTimeout(() => onSearch(), 250);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="mr-4 mb-5 grid grid-cols-12 gap-3 items-center">
      <div className="bg-white col-span-12 md:col-span-8 border shadow-md w-full flex items-center m-auto px-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          className="w-full p-2 outline-none text-lg rounded-full"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value.trim())}
          value={searchTerm}
        />
      </div>
      <div className="hidden md:block h-10 col-span-2">
        <SearchSorter onOptionSelected={onOptionSelected} />
      </div>
      <div className="hidden md:block h-10 col-span-2">
        <SearchChangeDistribution
          distribution={distribution}
          setDistribution={setDistribution}
        />
      </div>
    </div>
  );
}
