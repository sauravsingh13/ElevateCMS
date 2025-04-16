export const dynamic = "force-dynamic";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const typeFilter = searchParams.get("type");

  const templates = [
    {
      id: "travel-vibes",
      title: "Travel Vibes",
      description: "A full-width scenic blog template with rich formatting.",
      thumbnail: "/template-images/travel-thumb.png",
      type: "BLOG",
      content: `
  <div style="font-family: 'Georgia', serif; font-size: 18px; color: #333; padding: 4rem; line-height: 1.6;">
    <h1 style="font-size: 40px; font-weight: bold; color:rgb(52, 21, 21); text-align: center;">Exploring the Soul of Himachal</h1>
    <img src="/template-images/travel.png" alt="mountains" style="width: 100%; border-radius: 12px; margin: 2rem 0;" />
    <blockquote style="border-left: 4px solid #ccc; padding-left: 1rem; color: #666;">
      “Not all those who wander are lost” – J.R.R. Tolkien
    </blockquote>
    <p style="text-align: justify;">
      From waking up to the serene views of misty valleys and sipping steaming chai by the river, to hiking through lush pine forests and capturing breathtaking sunrises—Himachal offered us a life beyond the confines of screens and the stresses of daily routines. Each moment spent here felt like a gentle reminder of the beauty that exists in nature, waiting to be explored and cherished.
    </p>
    <p style="text-align: justify;">
      Whether it was sharing stories with locals over cups of butter tea or learning the art of wool weaving from village elders, the connections we built went far beyond any itinerary. Every turn on those winding roads brought us face-to-face with raw, untouched beauty—from apple orchards stretching across hillsides to monasteries echoing with chants of tranquility.
    </p>
    <ul style="margin-top: 1rem;">
      <li>☀️ Manali Mornings: Awaken to the melodious chirping of birds and the soft glow of dawn.</li>
      <li>🌲 Tirthan Valley Trails: Wander through enchanting trails that lead to hidden waterfalls and serene landscapes.</li>
      <li>🏞️ Kasol Calmness: Experience the tranquility of this quaint village, where time seems to stand still.</li>
      <li>⛺ Camping in Jibhi: Fall asleep under a sky full of stars beside a crackling bonfire.</li>
    </ul>
    <h2 style="margin-top: 2rem;">Local Flavors to Savor</h2>
    <p><strong>Sidu</strong>, <em>madra</em>, and <span style="background-color: #ffeaa7;">fresh apricots</span> — these are not just dishes, but a culinary journey that tells the story of Himachal’s rich culture and traditions. Don’t miss them!</p>
    <h2 style="margin-top: 2rem;">Culture & Practical Tips</h2>
    <p>
      Respect the calm of the mountains. Take your time, greet with a smile, and pack your trash. Avoid plastic and instead bring reusable bottles and bags. It’s not just about traveling—it’s about preserving the spirit of the place you visit.
    </p>
    <blockquote style="border-left: 4px solid #ccc; padding-left: 1rem; color: #666;">
      “Travel far enough, you meet yourself.” – David Mitchell
    </blockquote>
    <p style="text-align: justify;">
      Our journey also brought us closer as a group. Sitting around the campfire, wrapped in woolen shawls, sharing tales and roasted marshmallows under a starlit sky—it was a simple pleasure we’ll never forget. These conversations and quiet moments stitched us closer, offering a much-needed pause in a chaotic world.
    </p>
    <p style="text-align: justify;">
      The aroma of fresh pine, the distant echo of temple bells, and the warm hospitality of mountain villagers—all these now live in our hearts as a gentle reminder to revisit, to reconnect, and to rejuvenate with nature and self. Himachal wasn’t just a destination—it became an emotion.
    </p>
    <p style="text-align: justify;">
      While wandering through villages tucked away from the tourist routes, we were greeted with warm smiles and curious glances. Children played by clear mountain streams, while elders sat under ancient deodar trees, sharing folk tales passed down for generations.
    </p>
    <p style="text-align: justify;">
      In Kinnaur, we stumbled upon an old wooden temple, its intricate carvings telling stories of gods and warriors. The silence was almost spiritual, only broken by the soft rustle of prayer flags fluttering in the mountain breeze.
    </p>
    <p style="text-align: justify;">
      At sunrise, we climbed to a ridge overlooking the Spiti valley. The mountains turned golden, and the vastness of the landscape made all worries seem small. This was not just sightseeing; this was soul-searching.
    </p>
    <p style="text-align: justify;">
      We took detours to discover hidden waterfalls, icy glacial streams, and meadows that seemed straight out of a postcard. We’d often pause just to soak in the silence—the kind of silence that speaks volumes.
    </p>
    <p style="text-align: justify;">
      Food became an adventure in itself. We tried sepu vadi, dham, and chha ghost. Each meal was cooked with love and offered as a gesture of hospitality by strangers who soon felt like friends.
    </p>
    <p style="text-align: justify;">
      Our backpacks filled with pinecones, postcards, and handmade woolen socks, we realized we were taking home more than souvenirs—we carried with us the stories of Himachal.
    </p>
    <p style="text-align: justify;">
      We crossed suspension bridges, walked through apple orchards, and watched the night sky unfold with constellations unfamiliar yet comforting.
    </p>
    <p style="text-align: justify;">
      In Sangla, we sat by the Baspa River, its icy water a soothing soundtrack to our introspective musings. Time slowed down, and nature held us in a calming embrace.
    </p>
    <p style="text-align: justify;">
      Conversations were deeper, laughter more frequent, and friendships more real. Travel had stripped away the noise, allowing us to reconnect with our most authentic selves.
    </p>
    <p style="text-align: justify;">
      A local told us, “The mountains will call you again.” As we packed up on our final day, those words lingered like an echo in our hearts.
    </p>
    <hr />
    <p style="text-align: center;">Follow us on Instagram @wanderwise for more breathtaking adventures!</p>
  </div>
    `,
    },
    {
      id: "tech-talk",
      title: "Tech Talk",
      description: "Sleek dark mode layout for dev-focused blogs.",
      thumbnail: "/template-images/tech-thumb.png",
      type: "BLOG",
      content: `
      <div style="font-family: 'Courier New', monospace; background-color: #0F172A; color: #F8FAFC; padding: 3rem; min-height: 90vh;">
        <h1 style="font-size: 32px; font-weight: bold; color: #38BDF8;">Mastering React Server Components</h1>
        <img src="/template-images/tech.png" alt="tech" style="width: 100%; border-radius: 10px; margin: 1rem 0;" />
        <p>
          React Server Components are revolutionizing the way developers build applications by allowing them to deliver better performance and smaller bundles. Here's what you should know about their implementation and advantages:
        </p>
        <ol>
          <li>They run on the server, which means that heavy lifting can be done outside the client’s browser, leading to faster load times.</li>
          <li>Don’t ship unnecessary JS, as server components can help reduce the amount of JavaScript sent to the client, enhancing overall performance.</li>
          <li>Work alongside client components seamlessly, allowing for a hybrid approach that leverages the strengths of both server and client-side rendering.</li>
        </ol>
        <pre style="background: #1E293B; padding: 1rem; border-radius: 6px;"><code>const Component = async () =&gt; {
  const data = await getData();
  return &lt;div&gt;{data}&lt;/div&gt;;
}</code></pre>
        <p>
          React Server Components also introduce a new way of thinking about component boundaries, encouraging developers to separate concerns more cleanly between client interactivity and server logic. This promotes better modularization and maintainability in large-scale applications.
        </p>
        <p>
          When paired with streaming, you can achieve partial hydration — this means users begin to see content while other parts are still loading, improving perceived performance and user engagement. It’s like lazy loading but smarter and more integrated with the component lifecycle.
        </p>
        <p>
          For optimal results, always analyze your bundle and identify parts of your UI that don’t require interactivity. These are great candidates to be moved to server components.
        </p>
        <pre style="background: #1E293B; padding: 1rem; border-radius: 6px;"><code>
'use client'
import { useEffect } from 'react';
export default function Page() {
  useEffect(() => {
    console.log("Client side hydration complete.");
  }, []);
  return &lt;div&gt;Client-enhanced section&lt;/div&gt;;
}
</code></pre>
        <p>
          Integrating with backend APIs directly from the server component also allows for safer and faster access to secure data without exposing endpoints to the browser.
        </p>
        <p>
          With frameworks like Next.js leading the charge, server components unlock the full potential of modern SSR and edge deployments.
        </p>
        <blockquote style="color: #94A3B8; border-left: 4px solid #475569; padding-left: 1rem;">“Build once, run everywhere.” This mantra encapsulates the essence of modern web development.</blockquote>
        <p style="text-align: center;">Powered by Next.js 15 🚀, the future of web applications is here!</p>
      </div>
    `,
    },
    {
      id: "foodie-fun",
      title: "Foodie Fun",
      description: "Festive food diary packed with flavor and colors.",
      thumbnail: "/template-images/food-thumb.png",
      type: "BLOG",
      content: `
      <div style="font-family: 'Arial', sans-serif; background-color: #FFF3E0; color: #5D4037; padding: 3rem; min-height: 90vh; font-size: 18px;">
        <h1 style="text-align: center; font-weight: bold; color: #E64A19;">Diwali Treats from Grandma's Kitchen</h1>
        <img src="/template-images/food.png" alt="diwali sweets" style="width: 100%; border-radius: 12px; margin: 1.5rem 0;" />
        <p>
          This festive season, our home is filled with the delightful aroma of <strong>ghee</strong>, <em>cardamom</em>, and sweet nostalgia. Every corner of the kitchen buzzes with excitement as we prepare traditional sweets, each carrying memories of celebrations past. Here's how we make magic with every laddu, ensuring that every bite is a taste of love and tradition.
        </p>
        <h2>Ingredients:</h2>
        <ul>
          <li>Besan – 2 cups, sifted to ensure a light and fluffy texture.</li>
          <li>Ghee – 1 cup, melted to perfection for that rich flavor.</li>
          <li>Sugar – 1.5 cups, adjust according to your sweetness preference.</li>
        </ul>
        <p style="background-color: #FFF8E1; padding: 1rem; border-left: 4px solid #FFB74D;">
          <strong>Pro Tip:</strong> Stir continuously on low heat for the perfect roasted aroma! This ensures that the besan is cooked evenly, giving the laddus a delightful flavor and texture.
        </p>
        <h2>Preparation Steps:</h2>
        <ol>
          <li>Heat the ghee in a heavy-bottomed pan and roast the besan until golden brown and aromatic.</li>
          <li>Once roasted, allow it to cool slightly before adding sugar and shaping into laddus.</li>
          <li>Roll them in chopped nuts or edible silver leaf for a festive touch!</li>
        </ol>
        <p>
          We also experimented with coconut barfi and kaju katli this year. The secret? Fresh ingredients and loads of laughter while cooking.
        </p>
        <p>
          Sharing sweets with neighbors and exchanging stories over chai has always been a cherished tradition. It’s more than food—it’s how we reconnect and celebrate life.
        </p>
        <p style="text-align: center; font-weight: bold;">Happy Diwali 🎉 – May your home be filled with light and laddus!</p>
        <hr />
        <p style="text-align: right; font-style: italic;">Recipes passed down with love, creating sweet memories ♥</p>
        <p>
          This Diwali, we decided to revive long-lost family recipes stored in handwritten notebooks stained with turmeric and love. Among these treasures was a recipe for saffron-infused peda, made with khoya and just a pinch of nostalgia.
        </p>
        <p>
          The process was meditative — slow stirring over low flame, gently folding in flavors until the mixture reached the perfect consistency. Each ball was shaped with care, pressed with a thumbprint, and topped with a sliver of almond.
        </p>
        <p>
          We also made shakarpara, the crispy diamond-shaped delights dusted with cardamom sugar. These were stored in tin boxes and passed around with warmth to every guest that visited.
        </p>
        <p>
          Rangoli powders spilled onto the floor, kids ran around with sparklers, and the kitchen smelled of clove and cinnamon. Cooking wasn't just a task; it was the festival itself.
        </p>
        <p>
          My aunt arrived with a giant pot of kheer, made with basmati rice and generous servings of pistachios. The saffron threads floating on top added a royal touch, and the aroma spread through every room.
        </p>
        <p>
          Our family favorite, chakli, took the spotlight in the savory department. Spicy, spiral, and crunchy, it paired perfectly with evening tea. Grandpa insisted they be packed in paper cones — just like the good old days.
        </p>
        <p>
          By evening, the pooja thali was filled with delicacies: motichoor laddus, dry fruit chikki, gujiya, and fresh fruits — all offered to the gods before the first bite was taken.
        </p>
        <p>
          We set up a mini sweet stall at home, with colorful jars labeled “Try Me!”, making it fun for the kids. Each time they picked a jar, a story was told — about a cousin’s wedding, an old train ride, or a childhood prank.
        </p>
        <p>
          Our cousin from Chennai brought special Mysore Pak. Dense, sweet, and crumbly — it melted in the mouth. Mom served it on banana leaves for that authentic South Indian touch.
        </p>
        <p>
          To wind down the night, we all gathered on the terrace with cups of masala chai. Firecrackers lit the sky, but it was the smiles around us that truly sparkled.
        </p>
        <p>
          We took a group photo — all generations standing proud, holding plates of homemade joy. It wasn’t just food. It was heritage on a plate.
        </p>
        <p>
          Next morning, leftovers became breakfast: laddus with milk, chaklis dipped in chutney, and sweet-scented memories of a festival well-celebrated.
        </p>
        <p>
          Inspired by the celebration, we decided to compile our favorite festive recipes into a family cookbook. With stories, photos, and scribbled notes, it was our gift to the next generation.
        </p>
        <p>
          This Diwali, we didn’t just celebrate light — we preserved legacy, shared love, and made memories one recipe at a time.
        </p>
      </div>
    `,
    },
  ];

  const filtered = typeFilter
    ? templates.filter(
        (tpl) => tpl.type.toLowerCase() === typeFilter.toLowerCase()
      )
    : templates;

  return new Response(JSON.stringify(filtered), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
