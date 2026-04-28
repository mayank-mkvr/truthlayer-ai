import React, { useState, useMemo } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  Copy,
  Info
} from "lucide-react";

interface CSVRow {
  [key: string]: string;
}

interface DataTableProps {
  data: CSVRow[];
  columns: string[];
  highlightedColumns?: string[];
}

export default function DataTable({ data, columns, highlightedColumns = [] }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter and Search logic
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(lowerSearch)
      )
    );
  }, [data, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Analysis logic
  const duplicateCount = useMemo(() => {
    const seen = new Set();
    let duplicates = 0;
    data.forEach(row => {
      const rowStr = JSON.stringify(row);
      if (seen.has(rowStr)) duplicates++;
      else seen.add(rowStr);
    });
    return duplicates;
  }, [data]);

  const missingValuesCount = useMemo(() => {
    let missing = 0;
    data.forEach(row => {
      Object.values(row).forEach(val => {
        if (val === null || val === undefined || val === "" || String(val).trim() === "") {
          missing++;
        }
      });
    });
    return missing;
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search rows..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all text-white"
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
          {duplicateCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-xs font-bold">
              <Copy className="w-3.5 h-3.5" />
              {duplicateCount} Duplicates Found
            </div>
          )}
          {missingValuesCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-bold">
              <AlertCircle className="w-3.5 h-3.5" />
              {missingValuesCount} Missing Values
            </div>
          )}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold">
            <Info className="w-3.5 h-3.5" />
            {data.length} Total Rows
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-card rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                {columns.map(col => (
                  <th 
                    key={col} 
                    className={`px-6 py-5 font-black text-slate-300 uppercase tracking-widest text-[10px] whitespace-nowrap transition-colors ${highlightedColumns.includes(col) ? 'bg-brand-blue/20 text-brand-blue border-b-2 border-brand-blue' : ''}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-white/5 group transition-colors">
                  {columns.map(col => {
                    const isMissing = row[col] === null || row[col] === undefined || row[col] === "" || String(row[col]).trim() === "";
                    const isHighlighted = highlightedColumns.includes(col);
                    
                    return (
                      <td 
                        key={col} 
                        className={`px-6 py-4 font-medium transition-colors ${isHighlighted ? 'bg-brand-blue/5 text-slate-200' : 'text-slate-400'} ${isMissing ? 'bg-red-500/5' : ''}`}
                      >
                        {isMissing ? (
                          <span className="text-red-500/50 italic text-xs">NULL</span>
                        ) : (
                          row[col]
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-20 text-center text-slate-500 font-medium italic">
                    No results found for "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
            Showing {(currentPage - 1) * rowsPerPage + 1} - {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1 font-mono text-sm px-4 text-white">
              <span className="text-brand-blue">{currentPage}</span>
              <span className="text-slate-600">/</span>
              <span>{totalPages}</span>
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
