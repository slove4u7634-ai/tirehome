import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'src/data/db.json');

export async function GET(request: Request) {
  try {
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.reservations || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(fileContents);

    if (!data.reservations) {
      data.reservations = [];
    }

    const newReservation = {
      id: Date.now(), // simple auto-increment logic
      ...body,
      status: 'pending', // pending, completed, cancelled
      createdAt: new Date().toISOString()
    };

    data.reservations.unshift(newReservation); // add to top
    
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    
    // We can't really do webpush without a service worker, so we just return the new reservation
    // The admin dashboard will poll or fetch on load to see the new ones.
    
    return NextResponse.json({ success: true, reservation: newReservation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save reservation' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const fileContents = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(fileContents);

    if (!data.reservations) {
      return NextResponse.json({ error: 'No reservations found' }, { status: 404 });
    }

    const index = data.reservations.findIndex((r: any) => r.id === body.id);
    if (index > -1) {
      data.reservations[index] = { ...data.reservations[index], ...body };
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
      return NextResponse.json({ success: true, reservation: data.reservations[index] });
    } else {
      return NextResponse.json({ error: 'Reservation not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}
