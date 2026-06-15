'use client';

import { motion } from 'framer-motion';
import { TrophyIcon } from '@heroicons/react/24/outline';

export interface AwardItem {
    title: string;
    organization?: string;
    date?: string;
    content?: string;
}

interface AwardsProps {
    items: AwardItem[];
    title?: string;
}

export default function Awards({ items, title = 'Awards' }: AwardsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <ul className="space-y-2">
                {items.map((award, idx) => (
                    <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                        <TrophyIcon className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                        <div className="flex-grow">
                            <span className="font-medium text-primary">{award.title}</span>
                            {award.organization && (
                                <span className="text-neutral-600 dark:text-neutral-400">, {award.organization}</span>
                            )}
                            {award.date && (
                                <span className="text-neutral-500 dark:text-neutral-500"> ({award.date})</span>
                            )}
                            {award.content && (
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">{award.content}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </motion.section>
    );
}
