import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Upload, 
  FileText, 
  X, 
  Check, 
  ChevronRight, 
  Search,
  Database,
  ArrowRight,
  ShieldCheck,
  Loader2
} from "lucide-react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import { analyzeCSV } from "../services/analyzerService";
import { useBias } from "../contexts/BiasContext";

interface CSVRow {
  [key: string]: string;
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<CSVRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [targetColumn, setTargetColumn] = useState<string>("");
  const [sensitiveColumns, setSensitiveColumns] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const { setResults, setIsAnalyzing, isAnalyzing } = useBias();

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      handleFile(droppedFile);
    } else {
      alert("Please upload a valid CSV file.");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setFile(file);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as CSVRow[];
        setData(rows);
        if (rows.length > 0) {
          setColumns(Object.keys(rows[0]));
        }
      },
      error: (error) => {
        console.error("CSV Parse Error:", error);
        alert("Failed to parse CSV file.");
      }
    });
  };

  const toggleSensitive = (col: string) => {
    setSensitiveColumns(prev => 
      prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]
    );
  };

  const handleAnalyze = async () => {
    if (!targetColumn) {
      alert("Please select a target decision column.");
      return;
    }
    if (sensitiveColumns.length === 0) {
      alert("Please select at least one sensitive attribute.");
      return;
    }
    
    if (file) {
      setIsAnalyzing(true);
      try {
        console.log("Analyzing...", { file: file.name, targetColumn, sensitiveColumns });
        const analysis = await analyzeCSV(file);
        setResults(analysis);
        navigate("/results");
      } catch (error) {
        console.error("Analysis Error:", error);
        alert("Failed to analyze CSV file.");
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-slate-200">
      <nav className="h-20 border-b border-white/5 bg-brand-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold text-white tracking-tight">TruthLayer<span className="text-brand-blue">AI</span></span>
          </div>
          <button 
            onClick={() => navigate("/dashboard")}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Upload Dataset</h1>
          <p className="text-slate-400">Prepare your data for fairness auditing and bias detection.</p>
        </div>

        <div className="space-y-12">
          {/* File Upload Area */}
          {!file ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              className={`border-2 border-dashed rounded-[3rem] p-20 flex flex-col items-center justify-center transition-all ${isDragging ? 'border-brand-blue bg-brand-blue/5' : 'border-white/10 hover:border-white/20'}`}
            >
              <div className="w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Drag and drop your CSV here</h3>
              <p className="text-slate-500 mb-8">Maximum file size: 50MB</p>
              <label className="bg-white text-brand-dark px-10 py-4 rounded-full font-bold cursor-pointer hover:scale-105 transition-transform shadow-xl">
                Browse Files
                <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
              </label>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-12"
            >
              {/* File Info */}
              <div className="glass-card p-8 rounded-[2rem] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center text-brand-blue">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{file.name}</h4>
                    <p className="text-slate-500">{(file.size / 1024).toFixed(2)} KB • {data.length} rows</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setFile(null); setData([]); setColumns([]); }}
                  className="p-3 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Dataset Preview */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-xl font-bold text-white">Dataset Analytics & Preview</h4>
                    <p className="text-sm text-slate-500">Deep dive into your uploaded data</p>
                  </div>
                </div>
                
                <DataTable 
                  data={data} 
                  columns={columns} 
                  highlightedColumns={[targetColumn, ...sensitiveColumns]} 
                />
              </div>

              {/* Column Mapping */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Target Column Selection */}
                <div className="glass-card p-8 rounded-[2rem]">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-brand-blue" />
                    Target Decision Column
                  </h4>
                  <p className="text-sm text-slate-500 mb-6 font-medium">Which column represents the outcome we are auditing? (e.g. approved_loan, hired)</p>
                  <div className="grid gap-2">
                    {columns.map(col => (
                      <button 
                        key={col}
                        onClick={() => setTargetColumn(col)}
                        className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${targetColumn === col ? 'bg-brand-blue/10 border-brand-blue text-brand-blue' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'}`}
                      >
                        <span className="font-bold">{col}</span>
                        {targetColumn === col && <Check className="w-5 h-5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sensitive Attribute Selection */}
                <div className="glass-card p-8 rounded-[2rem]">
                  <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-brand-blue" />
                    Sensitive Attributes
                  </h4>
                  <p className="text-sm text-slate-500 mb-6 font-medium">Select attributes to check for bias (e.g. Protected classes)</p>
                  <div className="grid gap-2">
                    {columns.map(col => (
                      <button 
                        key={col}
                        onClick={() => toggleSensitive(col)}
                        className={`flex items-center justify-between px-5 py-4 rounded-xl border transition-all ${sensitiveColumns.includes(col) ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'}`}
                      >
                        <span className="font-bold">{col}</span>
                        {sensitiveColumns.includes(col) && <Check className="w-5 h-5" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-10 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="flex-1 bg-brand-blue hover:bg-brand-accent text-white py-5 rounded-3xl font-black text-xl shadow-2xl shadow-brand-blue/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <Loader2 className="w-6 h-6" />
                      </motion.div>
                      Analyzing Dataset...
                    </>
                  ) : (
                    <>
                      Analyze Bias Now
                      <ChevronRight className="w-6 h-6" />
                    </>
                  )}
                </button>
                <button 
                  onClick={() => navigate("/dashboard")}
                  disabled={isAnalyzing}
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-3xl font-bold transition-all"
                >
                  Save and Exit
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex justify-between items-center opacity-50">
        <div className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">TruthLayer Compliance Engine v1.2</div>
        <div className="flex gap-4">
          <Database className="w-4 h-4" />
          <ShieldCheck className="w-4 h-4" />
        </div>
      </footer>
    </div>
  );
}
