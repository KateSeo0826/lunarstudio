import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        const data = await resend.emails.send({
            from: 'Lunar Studio <onboarding@resend.dev>',
            to: ['studio.lunacode@gmail.com'],
            subject: `[LUNAR STUDIO 문의] ${name}님으로부터`,
            html: `
        <h2>새로운 프로젝트 문의</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}