
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Perform a simple query to check the connection
    // We use $queryRaw to avoid depending on specific table names
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Database connected successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: 'Database connection failed', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
