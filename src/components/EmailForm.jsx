import { useState } from 'react';
import { Mail, X, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function EmailForm({ onSubmit, onClose, isSending, isSuccess }) {
    const [senderEmail, setSenderEmail] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('A Festive Wish For You! 🎄');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(senderEmail, email, subject);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <div className={`glass-panel w-full max-w-md p-6 relative bg-[#1a1a2e] transition-all duration-500 ${isSuccess ? 'border-green-500/50' : ''}`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white"
                >
                    <X size={20} />
                </button>

                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                    >
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 text-green-500">
                            <CheckCircle size={48} />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Sent Successfully!</h2>
                        <p className="text-muted mb-8">
                            Your festive wish is on its way to <span className="text-white">{email}</span>.
                        </p>
                        <button
                            onClick={onClose}
                            className="primary-button w-full py-3"
                        >
                            Close
                        </button>
                    </motion.div>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 text-primary">
                                <Mail size={24} />
                            </div>
                            <h2 className="text-xl font-bold">Send Your Card</h2>
                            <p className="text-sm text-muted">Enter the details below.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Your Email (Optional)</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com (for replies)"
                                    value={senderEmail}
                                    onChange={(e) => setSenderEmail(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Recipient Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="friend@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">Subject Line</label>
                                <input
                                    type="text"
                                    required
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSending}
                                className="primary-button w-full py-3 mt-4 flex items-center justify-center gap-2"
                            >
                                {isSending ? 'Sending...' : 'Send Now'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </motion.div>
    );
}
