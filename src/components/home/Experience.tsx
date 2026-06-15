'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

export interface ExperienceRole {
    title: string;
    date: string;
}

export interface ExperienceBullet {
    text: string;
}

export interface ExperienceItem {
    organization: string;
    group?: string;
    advisor?: string;
    logo?: string;
    logo_dark?: string;
    roles?: ExperienceRole[];
    bullets?: ExperienceBullet[];
}

interface ExperienceProps {
    items: ExperienceItem[];
    title?: string;
}

export default function Experience({ items, title = 'Experience' }: ExperienceProps) {
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
                                        alt={item.organization}
                                        width={224}
                                        height={224}
                                        className={`object-contain w-full h-full ${item.logo_dark ? 'block dark:hidden' : ''}`}
                                    />
                                    {item.logo_dark && (
                                        <Image
                                            src={item.logo_dark}
                                            alt={item.organization}
                                            width={224}
                                            height={224}
                                            className="object-contain w-full h-full hidden dark:block"
                                        />
                                    )}
                                </>
                            ) : (
                                <BriefcaseIcon className="h-14 w-14 text-neutral-400" />
                            )}
                        </div>
                        <div className="flex-grow min-w-0">
                            <h3 className="text-lg font-semibold text-primary">{item.organization}</h3>
                            {item.group && (
                                <p className="text-base text-neutral-700 dark:text-neutral-300 mt-1">{item.group}</p>
                            )}
                            {item.advisor && (
                                <p className="text-base italic text-neutral-700 dark:text-neutral-300 mt-1">{item.advisor}</p>
                            )}
                            {item.roles && item.roles.length > 0 && (
                                <div className="mt-2 space-y-0.5">
                                    {item.roles.map((role, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                            <span className="text-sm italic text-neutral-600 dark:text-neutral-400">{role.title}</span>
                                            <span className="text-xs text-neutral-500 dark:text-neutral-500">{role.date}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
