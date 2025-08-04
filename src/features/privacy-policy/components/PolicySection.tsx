'use client'

import { motion } from 'framer-motion'
import {
  PolicySectionProps,
  PolicyContent,
  PolicySubsection,
  PolicyTable,
  PolicyHighlight,
} from '../types'

/**
 * 政策章节组件
 * 渲染单个隐私政策章节的内容
 */
export function PolicySection({ section, className = '' }: PolicySectionProps) {
  const renderContent = (content: PolicyContent, index: number) => {
    switch (content.type) {
      case 'paragraph':
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 leading-relaxed text-gray-700"
          >
            {content.content as string}
          </motion.p>
        )

      case 'list':
        return (
          <motion.ul
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-4 space-y-2"
          >
            {(content.content as string[]).map((item, itemIndex) => (
              <motion.li
                key={itemIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + itemIndex * 0.05 }}
                className="flex items-start text-gray-700"
              >
                <span className="mt-1.5 mr-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600"></span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        )

      case 'subsection':
        const subsection = content.content as PolicySubsection
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6"
          >
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              {subsection.title}
            </h3>
            <div className="ml-4">
              {subsection.content.map((subContent, subIndex) =>
                renderContent(subContent, subIndex),
              )}
            </div>
          </motion.div>
        )

      case 'table':
        const table = content.content as PolicyTable
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6 overflow-hidden rounded-lg border border-gray-200"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {table.headers.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {table.rows.map((row, rowIndex) => (
                    <motion.tr
                      key={rowIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + rowIndex * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 text-sm whitespace-nowrap text-gray-700"
                        >
                          {cell}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )

      case 'highlight':
        const highlight = content.content as PolicyHighlight
        const getHighlightStyles = (type: string) => {
          switch (type) {
            case 'info':
              return 'border-blue-200 bg-blue-50 text-blue-800'
            case 'warning':
              return 'border-yellow-200 bg-yellow-50 text-yellow-800'
            case 'success':
              return 'border-green-200 bg-green-50 text-green-800'
            case 'error':
              return 'border-red-200 bg-red-50 text-red-800'
            default:
              return 'border-gray-200 bg-gray-50 text-gray-800'
          }
        }

        const getIcon = (type: string) => {
          switch (type) {
            case 'info':
              return (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )
            case 'warning':
              return (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              )
            case 'success':
              return (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )
            case 'error':
              return (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )
            default:
              return null
          }
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`mb-6 rounded-lg border p-4 ${getHighlightStyles(highlight.type)}`}
          >
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0">
                {getIcon(highlight.type)}
              </div>
              <div>
                {highlight.title && (
                  <h4 className="mb-2 font-semibold">{highlight.title}</h4>
                )}
                <p className="text-sm leading-relaxed">{highlight.content}</p>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-12 scroll-mt-24 ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 border-b border-gray-200 pb-3 text-2xl font-bold text-gray-900"
      >
        {section.title}
      </motion.h2>

      <div className="space-y-4">
        {section.content.map((content, index) => renderContent(content, index))}
      </div>
    </motion.section>
  )
}
