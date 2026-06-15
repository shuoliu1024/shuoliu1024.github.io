'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { BookOpenIcon, DocumentTextIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';

interface PublicationsProps {
    publications: Publication[];
    title?: string;
}

type Tab = 'selected' | 'all';

export default function Publications({ publications, title = 'Publications' }: PublicationsProps) {
    const [activeTab, setActiveTab] = useState<Tab>('selected');

    const selectedPubs = useMemo(() => publications.filter(p => p.selected), [publications]);
    const visiblePubs = activeTab === 'selected' ? selectedPubs : publications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <h2 className="text-2xl font-serif font-bold text-primary">{title}</h2>
                <div className="inline-flex rounded-lg bg-neutral-100 dark:bg-neutral-800 p-1 text-xs">
                    <button
                        onClick={() => setActiveTab('selected')}
                        className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${
                            activeTab === 'selected'
                                ? 'bg-white dark:bg-neutral-900 text-primary shadow-sm'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-primary'
                        }`}
                    >
                        Selected
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-3 py-1.5 rounded-md font-medium transition-all duration-200 ${
                            activeTab === 'all'
                                ? 'bg-white dark:bg-neutral-900 text-primary shadow-sm'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-primary'
                        }`}
                    >
                        All Publications
                    </button>
                </div>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                * equal contribution &nbsp; ‡ equal advising &nbsp; § core contributors
            </p>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                >
                    {visiblePubs.map((pub, index) => (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.04 * index }}
                            className="group bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg hover:border-accent/30 transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex flex-col sm:flex-row">
                                {/* Left: Image/Video */}
                                <div className="w-full sm:w-56 flex-shrink-0 p-3">
                                    {pub.video ? (
                                        <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-800 flex items-center justify-center">
                                            <video
                                                src={`/papers/${pub.video}`}
                                                className="max-w-full max-h-full object-contain"
                                                muted
                                                loop
                                                playsInline
                                                onMouseEnter={(e) => e.currentTarget.play()}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.pause();
                                                    e.currentTarget.currentTime = 0;
                                                }}
                                            />
                                        </div>
                                    ) : pub.preview ? (
                                        <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden bg-neutral-50 dark:bg-neutral-800">
                                            <Image
                                                src={`/papers/${pub.preview}`}
                                                alt={pub.title}
                                                fill
                                                className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 640px) 100vw, 224px"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full aspect-[4/3] flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                                            <BookOpenIcon className="h-12 w-12 text-neutral-300 dark:text-neutral-600" />
                                        </div>
                                    )}
                                </div>

                                {/* Right: Content */}
                                <div className="flex-grow p-5 flex flex-col min-h-[200px]">
                                    <h3 className="text-base font-semibold text-primary mb-2 leading-snug group-hover:text-accent transition-colors">
                                        {pub.title}
                                    </h3>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                        {pub.authors.map((author, idx) => (
                                            <span key={idx}>
                                                <span className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}>
                                                    {author.name}
                                                </span>
                                                {author.isEqualContribution && (
                                                    <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-400'}`}>*</sup>
                                                )}
                                                {author.isSecondAuthor && (
                                                    <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-400'}`}>†</sup>
                                                )}
                                                {author.isEqualAdvising && (
                                                    <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-400'}`}>‡</sup>
                                                )}
                                                {author.isCoreContributor && (
                                                    <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-400'}`}>§</sup>
                                                )}
                                                {idx < pub.authors.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </p>
                                    {(() => {
                                        const venue = pub.journal || pub.conference || '';
                                        const isPreprint = /arxiv|preprint/i.test(venue);
                                        return (
                                            <p
                                                className={
                                                    isPreprint
                                                        ? 'text-xs text-neutral-500 dark:text-neutral-500 mb-2'
                                                        : 'text-xs italic font-medium text-accent dark:text-accent mb-2'
                                                }
                                            >
                                                {venue} {pub.year}
                                            </p>
                                        );
                                    })()}
                                    {pub.awards && pub.awards.length > 0 && (
                                        <ul className="mb-2 space-y-0.5">
                                            {pub.awards.map((award, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-400"
                                                >
                                                    <TrophyIcon className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                                    <span>{award}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="flex-grow" />
                                    <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                                        {pub.pdfUrl && (
                                            <a
                                                href={pub.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                                            >
                                                <DocumentTextIcon className="h-3 w-3 mr-1" />
                                                PDF
                                            </a>
                                        )}
                                        {pub.arxivId && (
                                            <a
                                                href={`https://arxiv.org/abs/${pub.arxivId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
                                            >
                                                arXiv
                                            </a>
                                        )}
                                        {pub.webpage && (
                                            <a
                                                href={pub.webpage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                                            >
                                                Webpage
                                            </a>
                                        )}
                                        {pub.code && (
                                            <a
                                                href={pub.code}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
                                            >
                                                Code
                                            </a>
                                        )}
                                        {pub.doi && (
                                            <a
                                                href={`https://doi.org/${pub.doi}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                                            >
                                                DOI
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </motion.section>
    );
}
