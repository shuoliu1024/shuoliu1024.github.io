'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpenIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Publication } from '@/types/publication';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title = 'Selected Publications', enableOnePageMode = false }: SelectedPublicationsProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-serif font-bold text-primary">{title}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    View All →
                </Link>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                <span className="underline underline-offset-4 decoration-neutral-400">Underline</span> denotes equal contribution, <sup>†</sup> denotes advising/corresponding author.
            </p>
            <div className="space-y-4">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
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
                                {/* Title */}
                                <h3 className="text-base font-semibold text-primary mb-2 leading-snug group-hover:text-accent transition-colors">
                                    {pub.title}
                                </h3>

                                {/* Authors */}
                                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                                    {pub.authors.map((author, idx) => (
                                        <span key={idx}>
                                            <span className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}>
                                                {author.name}
                                            </span>
                                            {author.isCorresponding && (
                                                <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-400'}`}>†</sup>
                                            )}
                                            {idx < pub.authors.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>

                                {/* Venue */}
                                <p className="text-xs text-neutral-500 dark:text-neutral-500 mb-2">
                                    {pub.journal || pub.conference} {pub.year}
                                </p>

                                {/* Spacer */}
                                <div className="flex-grow" />

                                {/* Links Row */}
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
            </div>
        </motion.section>
    );
}
