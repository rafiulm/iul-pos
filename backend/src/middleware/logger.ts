import type { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] 📥 ${req.method} ${req.path}`);
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 500 ? '🔴' : res.statusCode >= 400 ? '🟡' : '🟢';
    console.log(`[${timestamp}] 📤 ${statusColor} ${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

export function logInfo(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ℹ️ ${message}`, data || '');
}

export function logSuccess(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ✅ ${message}`, data || '');
}

export function logError(message: string, error?: any) {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ❌ ${message}`, error || '');
}

export function logWarning(message: string, data?: any) {
  const timestamp = new Date().toISOString();
  console.warn(`[${timestamp}] ⚠️ ${message}`, data || '');
}

export function logDatabase(action: string, table: string, data?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 💾 DB ${action} ${table}`, data || '');
}
