'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
    initialCount?: number;
}

export default function News({ items, title = 'News', initialCount = 3 }: NewsProps) {
    const [expanded, setExpanded] = useState(false);
    const hasMore = items.length > initialCount;
    const visibleItems = expanded ? items : items.slice(0, initialCount);

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-3">
                <AnimatePresence initial={false}>
                    {visibleItems.map((item, index) => (
                        <motion.div
                            key={`${item.date}-${index}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-start space-x-3 overflow-hidden"
                        >
                            <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 w-16 flex-shrink-0">{item.date}</span>
                            <p className="text-sm text-neutral-700 dark:text-neutral-300">{item.content}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            {hasMore && (
                <button
                    onClick={() => setExpanded(prev => !prev)}
                    className="mt-3 text-xs font-medium text-accent hover:text-accent-dark transition-colors duration-200"
                >
                    {expanded ? 'Show less ↑' : `Show more (${items.length - initialCount}) ↓`}
                </button>
            )}
        </motion.section>
    );
}
