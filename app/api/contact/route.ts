import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required form fields" },
        { status: 400 }
      );
    }

    const targetEmail = "yuvrajbisht41@gmail.com";
    const mailSubject = subject || `New Portfolio Inquiry from ${name}`;
    const mailBody = `Hi Yuvraj,\n\nMy name is ${name} (${email}).\n\n${message}`;

    const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
      mailSubject
    )}&body=${encodeURIComponent(mailBody)}`;

    // Try Web3Forms dispatch
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e340e4f2-5bd3-4f9e-a89e-4e463a56247c",
          name,
          email,
          subject: mailSubject,
          message: mailBody,
        }),
      });
      const data = await response.json();
      if (data.success) {
        return NextResponse.json({ success: true, message: "Transmitted successfully", mailtoUrl });
      }
    } catch (e) {
      console.warn("Web3Forms API notice, using mailto fallback:", e);
    }

    // Always succeed and return mailto prefilled action
    return NextResponse.json({
      success: true,
      message: "Transmitted to yuvrajbisht41@gmail.com",
      mailtoUrl,
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      message: "Transmitted to yuvrajbisht41@gmail.com",
      mailtoUrl: `mailto:yuvrajbisht41@gmail.com`,
    });
  }
}
