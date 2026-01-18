// src/app/(site)/events/[slug]/page.tsx

// Tipe data dummy (nanti diganti dari Sanity)
type EventData = {
    title: string;
    date: string;
    content: string;
  };
  
  // Fungsi simulasi fetch data
  async function getEvent(slug: string): Promise<EventData> {
    // Nanti di sini pakai: client.fetch(query, { slug })
    return {
      title: `Kegiatan: ${slug.replace('-', ' ')}`, 
      date: "20 Jan 2026",
      content: "Ini adalah deskripsi detail kegiatan mahasiswa informatika..."
    };
  }
  
  export default async function EventPage({ params }: { params: { slug: string } }) {
    const data = await getEvent(params.slug);
  
    return (
      <article className="max-w-3xl mx-auto py-20 px-6">
        <div className="mb-8 border-b border-gray-800 pb-8">
          <p className="font-mono text-sm text-green-400 mb-2">{data.date}</p>
          <h1 className="text-4xl font-bold">{data.title}</h1>
        </div>
        <div className="prose prose-invert">
          <p>{data.content}</p>
        </div>
      </article>
    );
  }