import { motion } from 'framer-motion';
import { Send, RefreshCw, Edit2, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export function CardPreview({ image, message, onRegenerate, onSend, isSending }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(message);

    useEffect(() => {
        setEditedMessage(message);
    }, [message]);

    const handleSaveEdit = () => {
        setIsEditing(false);
        // Ideally update parent state, but for now we use local or assume message prop updates
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-start"
        >
            {/* Visual Card Display */}
            <div className="glass-panel p-2 overflow-hidden relative group card-preview-container">
                <div className="card-aspect-ratio">
                    {image && (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded"
                        />
                    )}
                    {/* Overlay Text Effect */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-20">
                        <p className="text-white font-serif text-lg leading-relaxed drop-shadow-md italic">
                            "{isEditing ? editedMessage : message}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Editor / Actions */}
            <div className="space-y-6">
                <div className="glass-panel p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Sparkles size={18} className="text-accent" />
                            Generated Message
                        </h3>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="text-xs flex items-center gap-1 text-muted hover:text-white transition-colors"
                        >
                            <Edit2 size={12} /> {isEditing ? 'Done' : 'Edit'}
                        </button>
                    </div>

                    {isEditing ? (
                        <textarea
                            value={editedMessage}
                            onChange={(e) => setEditedMessage(e.target.value)}
                            className="min-h-[150px] text-lg font-serif italic"
                        />
                    ) : (
                        <p className="text-lg text-white/90 font-serif italic leading-relaxed border-l-2 border-accent pl-4">
                            {editedMessage || message}
                        </p>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={onRegenerate}
                            className="glass-button flex-1 flex items-center justify-center gap-2 text-sm"
                        >
                            <RefreshCw size={16} /> Regenerate
                        </button>
                    </div>
                </div>

                <div className="glass-panel p-6">
                    <h3 className="font-semibold mb-4">Ready to Send?</h3>
                    <p className="text-sm text-muted mb-6">
                        Send this digital card directly to your loved ones via email.
                    </p>
                    <button
                        onClick={() => onSend(editedMessage || message)}
                        disabled={isSending}
                        className="primary-button w-full py-4 text-lg font-semibold rounded-xl flex items-center justify-center gap-2"
                    >
                        {isSending ? (
                            <span className="animate-pulse">Sending...</span>
                        ) : (
                            <>
                                <Send size={20} /> Send Card
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
