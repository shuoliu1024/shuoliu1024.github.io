'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export interface EducationItem {
    institution: string;
    degree: string;
    date: string;
    logo?: string;
    logo_dark?: string;
    details?: string[];
}

interface EducationProps {
    items: EducationItem[];
    title?: string;
}

export default function Education({ items, title = 'Education' }: EducationProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{title}</h2>
            <div className="space-y-5">
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-5 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-md hover:border-accent/30 transition-all duration-300"
                    >
                        <div className="flex-shrink-0 w-28 h-28 flex items-center justify-center">
                            {item.logo ? (
                                <>
                                    <Image
                                        src={item.logo}
                                        alt={item.institution}
                                        width={224}
                                        height={224}
                                        className={`object-contain w-full h-full ${item.logo_dark ? 'block dark:hidden' : ''}`}
                                    />
                                    {item.logo_dark && (
                                        <Image
                                            src={item.logo_dark}
                                            alt={item.institution}
                                            width={224}
                                            height={224}
                                            className="object-contain w-full h-full hidden dark:block"
                                        />
                                    )}
                                </>
                            ) : (
                                <AcademicCapIcon className="h-14 w-14 text-neutral-400" />
                            )}
                        </div>
                        <div className="flex-grow min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                <h3 className="text-base font-semibold text-primary">{item.institution}</h3>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400 flex-shrink-0">{item.date}</span>
                            </div>
                            <p className="text-sm italic text-neutral-700 dark:text-neutral-300 mt-0.5">{item.degree}</p>
                            {item.details && item.details.length > 0 && (
                                <ul className="mt-2 space-y-1">
                                    {item.details.map((d, i) => (
                                        <li key={i} className="text-xs text-neutral-600 dark:text-neutral-400 flex">
                                            <span className="mr-2">•</span>
                                            <span>{d}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
