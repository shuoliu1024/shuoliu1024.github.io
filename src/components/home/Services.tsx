'use client';

import { motion } from 'framer-motion';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export interface ServiceItem {
    role: string;
    venue?: string;
    organization?: string;
    date?: string;
    content?: string;
}

interface ServicesProps {
    items: ServiceItem[];
    title?: string;
}

export default function Services({ items, title = 'Services' }: ServicesProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                        <UserGroupIcon className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                        <div className="flex-grow">
                            <span className="font-medium text-primary">{item.role}</span>
                            {(item.venue || item.organization) && (
                                <span className="text-neutral-600 dark:text-neutral-400">, {item.venue || item.organization}</span>
                            )}
                            {item.date && (
                                <span className="text-neutral-500 dark:text-neutral-500"> ({item.date})</span>
                            )}
                            {item.content && (
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">{item.content}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </motion.section>
    );
}
