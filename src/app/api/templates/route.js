export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const typeFilter = searchParams.get("type");

  const templates = [
    {
      id: "travel-vibes",
      title: "Travel Vibes",
      description: "A full-width scenic blog template with rich formatting.",
      thumbnail: "/template-images/travel-thumb.jpg",
      type: "BLOG",
      content: `
      <div style="font-family: 'Georgia', serif; font-size: 18px; color: #333; padding: 4rem; line-height: 1.6;">
        <h1 style="font-size: 40px; color: #FF6B6B; text-align: center;">Exploring the Soul of Himachal</h1>
        <img src="/template-images/travel.jpg" alt="mountains" style="width: 100%; border-radius: 12px; margin: 2rem 0;" />
        <blockquote style="border-left: 4px solid #ccc; padding-left: 1rem; color: #666;">
          “Not all those who wander are lost” – J.R.R. Tolkien
        </blockquote>
        <p style="text-align: justify;">
          From waking up to misty valleys and sipping chai by the river, to hiking through pine forests and capturing sunrises—Himachal offered us a life beyond screens and stress.
        </p>
        <ul style="margin-top: 1rem;">
          <li>☀️ Manali Mornings</li>
          <li>🌲 Tirthan Valley Trails</li>
          <li>🏞️ Kasol Calmness</li>
        </ul>
        <h2 style="margin-top: 2rem;">Local Flavors to Savor</h2>
        <p><strong>Sidu</strong>, <em>madra</em>, and <span style="background-color: #ffeaa7;">fresh apricots</span> — don’t miss them!</p>
        <hr />
        <p style="text-align: center;">Follow us on Instagram @wanderwise</p>
      </div>
    `
    },
    {
      id: "tech-talk",
      title: "Tech Talk",
      description: "Sleek dark mode layout for dev-focused blogs.",
      thumbnail: "/template-images/tech-thumb.jpg",
      type: "BLOG",
      content: `
      <div style="font-family: 'Courier New', monospace; background-color: #0F172A; color: #F8FAFC; padding: 3rem; min-height: 90vh;">
        <h1 style="font-size: 32px; color: #38BDF8;">Mastering React Server Components</h1>
        <img src="/template-images/tech.jpg" alt="tech" style="width: 100%; border-radius: 10px; margin: 1rem 0;" />
        <p>
          React Server Components allow developers to deliver better performance and smaller bundles. Here's what you should know:
        </p>
        <ol>
          <li>They run on the server</li>
          <li>Don’t ship unnecessary JS</li>
          <li>Work alongside client components</li>
        </ol>
        <pre style="background: #1E293B; padding: 1rem; border-radius: 6px;"><code>const Component = async () =&gt; {
  const data = await getData();
  return &lt;div&gt;{data}&lt;/div&gt;;
}</code></pre>
        <blockquote style="color: #94A3B8; border-left: 4px solid #475569; padding-left: 1rem;">“Build once, run everywhere.”</blockquote>
        <p style="text-align: center;">Powered by Next.js 15 🚀</p>
      </div>
    `
    },
    {
      id: "foodie-fun",
      title: "Foodie Fun",
      description: "Festive food diary packed with flavor and colors.",
      thumbnail: "/template-images/food-thumb.jpg",
      type: "BLOG",
      content: `
      <div style="font-family: 'Arial', sans-serif; background-color: #FFF3E0; color: #5D4037; padding: 3rem; min-height: 90vh; font-size: 18px;">
        <h1 style="text-align: center; color: #E64A19;">Diwali Treats from Grandma's Kitchen</h1>
        <img src="/template-images/food.jpg" alt="diwali sweets" style="width: 100%; border-radius: 12px; margin: 1.5rem 0;" />
        <p>
          This festive season, our home smells of <strong>ghee</strong>, <em>cardamom</em>, and sweet nostalgia. Here's how we make magic with every laddu.
        </p>
        <h2>Ingredients:</h2>
        <ul>
          <li>Besan – 2 cups</li>
          <li>Ghee – 1 cup</li>
          <li>Sugar – 1.5 cups</li>
        </ul>
        <p style="background-color: #FFF8E1; padding: 1rem; border-left: 4px solid #FFB74D;">
          <strong>Pro Tip:</strong> Stir continuously on low heat for the perfect roasted aroma!
        </p>
        <hr />
        <p style="text-align: right; font-style: italic;">Recipes passed down with love ♥</p>
      </div>
    `
    }
  ];

  const filtered = typeFilter
    ? templates.filter((tpl) => tpl.type.toLowerCase() === typeFilter.toLowerCase())
    : templates;

  return new Response(JSON.stringify(filtered), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
