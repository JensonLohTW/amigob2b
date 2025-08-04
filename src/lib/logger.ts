/**
 * 日志系统配置
 * 统一输出到 logs/ 目录
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: any
  source?: string
}

class Logger {
  private logLevel: LogLevel = LogLevel.INFO

  constructor(private source?: string) {}

  private formatTimestamp(): string {
    return new Date().toISOString()
  }

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: this.formatTimestamp(),
      level,
      message,
      data,
      source: this.source,
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.logLevel
  }

  private formatLogMessage(entry: LogEntry): string {
    const levelName = LogLevel[entry.level]
    const source = entry.source ? `[${entry.source}]` : ''
    const data = entry.data ? ` ${JSON.stringify(entry.data)}` : ''
    return `${entry.timestamp} ${levelName} ${source} ${entry.message}${data}`
  }

  private writeToFile(entry: LogEntry): void {
    // 在浏览器环境中，我们将日志存储到 localStorage
    // 在服务器环境中，可以写入文件系统
    if (typeof window !== 'undefined') {
      const logs = JSON.parse(localStorage.getItem('app_logs') || '[]')
      logs.push(entry)
      // 保持最近 1000 条日志
      if (logs.length > 1000) {
        logs.splice(0, logs.length - 1000)
      }
      localStorage.setItem('app_logs', JSON.stringify(logs))
    }
  }

  debug(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.DEBUG)) return
    const entry = this.createLogEntry(LogLevel.DEBUG, message, data)
    console.debug(this.formatLogMessage(entry))
    this.writeToFile(entry)
  }

  info(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.INFO)) return
    const entry = this.createLogEntry(LogLevel.INFO, message, data)
    console.info(this.formatLogMessage(entry))
    this.writeToFile(entry)
  }

  warn(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.WARN)) return
    const entry = this.createLogEntry(LogLevel.WARN, message, data)
    console.warn(this.formatLogMessage(entry))
    this.writeToFile(entry)
  }

  error(message: string, data?: any): void {
    if (!this.shouldLog(LogLevel.ERROR)) return
    const entry = this.createLogEntry(LogLevel.ERROR, message, data)
    console.error(this.formatLogMessage(entry))
    this.writeToFile(entry)
  }

  setLogLevel(level: LogLevel): void {
    this.logLevel = level
  }
}

// 创建默认日志实例
export const logger = new Logger('APP')

// 创建特定模块的日志实例
export const createLogger = (source: string): Logger => {
  return new Logger(source)
}

// 导出日志下载功能
export const downloadLogs = (): void => {
  if (typeof window === 'undefined') return
  
  const logs = localStorage.getItem('app_logs')
  if (!logs) return

  const blob = new Blob([logs], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `app-logs-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 清除日志
export const clearLogs = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('app_logs')
  }
}
