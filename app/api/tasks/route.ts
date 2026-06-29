import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET, POST, PUT, DELETE 

// get - read all task
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(tasks);
}

// post - create task
export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // title gaboleh kosong
        if (!body.title) {
        return NextResponse.json({ error: 'Title is required!' }, { status: 400 });
        }

        // description boleh kosong
        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description || '',
            },
        });

        return NextResponse.json(task, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create task!' }, { status: 500 });
    }
}

// put - update task
export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const body = await request.json();
        
        // isComplete boolean, 1/0
        // updated at, timestamp
        const updatedTask = await prisma.task.update({
        where: { id: parseInt(id) },
        data: {
            isCompleted: body.isCompleted,
            updatedAt: new Date(),
        },
        });

        return NextResponse.json(updatedTask);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
}

// delete - delete task
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        // kalau delete, kasih timestamp waktunya
        // terapin soft delete (data di db tetap ada)
        const deletedTask = await prisma.task.update({
        where: { id: parseInt(id) },
        data: {
            deletedAt: new Date(),
        },
        });

        return NextResponse.json(deletedTask);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
    }
}