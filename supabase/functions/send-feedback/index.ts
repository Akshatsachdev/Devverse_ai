import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeedbackRequest {
  name: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  feedback: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, age, gender, email, phone, feedback }: FeedbackRequest = await req.json();

    console.log("Sending feedback email from:", email);

    const emailResponse = await resend.emails.send({
      from: "Devverse AI <onboarding@resend.dev>",
      to: ["devverseai@gmail.com"],
      replyTo: email,
      subject: `New Feedback from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fefbf6; border-radius: 10px;">
          <h1 style="color: #c6a700; text-align: center; margin-bottom: 30px;">New Feedback Received 🙏</h1>
          
          <div style="background-color: #fffaf0; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #c6a700;">
            <h2 style="color: #442c1c; margin-top: 0;">User Information</h2>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Age:</strong> ${age}</p>
            <p style="margin: 8px 0;"><strong>Gender:</strong> ${gender}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
          </div>
          
          <div style="background-color: #fff6d8; padding: 20px; border-radius: 8px; border-left: 4px solid #4d6b5d;">
            <h2 style="color: #442c1c; margin-top: 0;">Feedback</h2>
            <p style="color: #2c2c2c; line-height: 1.6; white-space: pre-wrap;">${feedback}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e8e2d0;">
            <p style="color: #4d6b5d; font-size: 14px;">Sent from Devverse AI Feedback Form</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-feedback function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
