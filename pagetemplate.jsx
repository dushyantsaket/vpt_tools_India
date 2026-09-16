import React from 'react'

function Sidebar({items}){
  return (
    <aside className="w-64 hidden lg:block sticky top-20 p-4">
      <nav className="space-y-2">
        {items.map((it)=> (
          <a key={it} href={`#${it.replace(/\s+/g,'-').toLowerCase()}`} className="block text-sm text-gray-700 hover:text-blue-600">{it}</a>
        ))}
      </nav>
    </aside>
  )
}

export default function PageTemplate({title, sections=[], lastUpdated, contentMap = {}}){
  return (
    <div className="bg-white min-h-screen text-gray-900">
      <header className="bg-white border-b">
        <div className="container mx-auto p-6">
          <div className="text-sm text-gray-500">Home / Policies / {title}</div>
          <h1 className="text-3xl font-semibold mt-4">{title}</h1>
          <p className="text-sm text-gray-500 mt-2">Last updated: {lastUpdated || '—'}</p>
        </div>
      </header>

      <main className="container mx-auto p-6 flex gap-8">
        <Sidebar items={sections} />

        <div className="flex-1">
          <div className="mb-6">
            <div className="bg-gray-50 border rounded p-6">
              <h2 className="text-xl font-medium">Banner</h2>
              <p className="text-sm text-gray-600 mt-2">A brief banner/summary for {title}.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {sections.map((s)=> (
              <section id={s.replace(/\s+/g,'-').toLowerCase()} key={s} className="prose max-w-none">
                <h3 className="text-2xl font-semibold mt-6">{s}</h3>
                <div className="text-base text-gray-700 mt-2">
                  {contentMap[s] ? contentMap[s] : <p>Placeholder content for <strong>{s}</strong>. Replace this with final CMS content.</p>}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
            <div className="mt-4 space-y-4">
              <details className="border rounded p-4">
                <summary className="font-medium">How do I use this page?</summary>
                <div className="mt-2 text-sm text-gray-700">Replace placeholders with real policy text. Provide download and share links.</div>
              </details>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm text-gray-600">Related Articles: <a href="#" className="text-blue-600">See more</a></div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border rounded text-sm">Download PDF</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm">Contact Support</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
