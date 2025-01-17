import { formatTailwindHTML } from "@/lib/utils";
import pupeeter from "puppeteer";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const { html, structure } = body;

    if (!html || !structure)
      return Response.json(
        {
          message: "Invalid parameter:",
        },
        { status: 400 }
      );

    const browser = await pupeeter.launch();

    const page = await browser.newPage();

    await page.setContent(formatTailwindHTML(html, structure));

    const bodyHeight = await page.evaluate(() => {
      return document.body.scrollHeight + 20;
    });

    const pdf = await page.pdf({
      width: "210mm",
      height: `${bodyHeight}px`,
      printBackground: true,
    });

    await browser.close();

    return new Response(pdf, {
      headers: {
        "Content-type": "application/pdf",
      },
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Unexpected error:",
        error,
      },
      { status: 500 }
    );
  }
};
