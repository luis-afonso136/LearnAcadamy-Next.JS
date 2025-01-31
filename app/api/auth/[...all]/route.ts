import { auth } from "../../../../lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
import arcjet, { protectSignup } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
    key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
    rules: [
      protectSignup({
        email: {
          mode: "LIVE", 
          block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
        },
        bots: {
          mode: "LIVE",
          allow: [], 
        },
        rateLimit: {
          // uses a sliding window rate limit
          mode: "LIVE",
          interval: "10m", // counts requests over a 10 minute sliding window
          max: 10, // allows 5 submissions within the window
        },
      }),
    ],
  });

  const betterAuthHandlers = toNextJsHandler(auth.handler);

  const ajProtectedPOST = async (req: NextRequest) => {
    const { email } = await req.clone().json()

    const decision = await aj.protect(req, { email });
    if (decision.isDenied()) {
        if(decision.reason.isEmail()) {
            let message = '';
            if (decision.reason.emailTypes.includes("INVALID")) {
                message = "O formato do endereço de email é invalido. Há um erro de escrita?";
            } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
                message = "Não permitimos endereços de email descartaveis";
            } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
                message =
                "O seu dominio de email não possui um registo MX. Há um erro de escrita?";
            } else {
                message = "Email invalido.";
            }

            return NextResponse.json({
                message, reason: decision.reason,
            }, { status: 400 })

        } else {
            return NextResponse.json({ messsage: "Forbiden "}, { status: 403 });
        }
    }

    return betterAuthHandlers.POST(req)
  }

  export { ajProtectedPOST as POST }
export const { GET } = betterAuthHandlers;