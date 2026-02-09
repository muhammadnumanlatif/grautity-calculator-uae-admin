import { NextRequest, NextResponse } from 'next/server';
import { getMenuByLocation } from '@/lib/menus';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const location = searchParams.get('location');

        if (!location) {
            return NextResponse.json(
                { error: 'Location parameter is required' },
                { status: 400 }
            );
        }

        const menu = await getMenuByLocation(location as any);

        if (!menu) {
            return NextResponse.json(
                { error: 'Menu not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(menu);
    } catch (error) {
        console.error('Error fetching menu:', error);
        return NextResponse.json(
            { error: 'Failed to fetch menu' },
            { status: 500 }
        );
    }
}
