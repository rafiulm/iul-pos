export { db } from './connection';
export * from './schema';

import { db } from './connection';
import { products } from './schema';
import { logError } from '../middleware/logger';

export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  try {
    await db.select().from(products).limit(1);
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logError('Database health check failed', error);
    throw new Error('Database connection failed');
  }
}
