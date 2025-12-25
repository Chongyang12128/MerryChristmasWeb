import { useState, useRef } from 'react';
import { Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function UploadSection({ onImageUpload, isProcessing }) {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0]);
        }
    };

    const handleFiles = (file) => {
        onImageUpload(file);
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-6">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`glass-panel p-8 text-center border-dashed border-2 transition-colors ${dragActive ? "border-primary bg-primary/10" : "border-white/10"
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />

                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-white/5 rounded-full ring-1 ring-white/10">
                        {isProcessing ? (
                            <Sparkles className="animate-spin text-accent" size={32} />
                        ) : (
                            <Upload className="text-white/80" size={32} />
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Upload your Photo</h3>
                        <p className="text-muted text-sm max-w-[250px] mx-auto">
                            Drag and drop your festive photo here, or click to browse.
                        </p>
                    </div>
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="primary-button px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
                        disabled={isProcessing}
                    >
                        <ImageIcon size={18} />
                        Select Photo
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
