import { EmailTemplate } from './../../_components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    console.log('Request:', req);
      const response=await req.json();
      console.log('Response:', response);
    try {
        
        const data = await resend.emails.send({
            from: 'flyfiles@resend.dev',
            to: ['vinaysharma.vs743@gmail.com'],
            subject: response?.fullName + "Share file with you",
            react: EmailTemplate({ response, file: null }),
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}


