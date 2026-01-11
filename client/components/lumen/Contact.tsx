import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 scroll-mt-28 md:scroll-mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Get in Touch</h2>
            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                placeholder="Name"
                className="w-full rounded-lg border bg-background px-3 py-3 outline-none focus:ring-2 focus:ring-cta"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border bg-background px-3 py-3 outline-none focus:ring-2 focus:ring-cta"
              />
              <textarea
                placeholder="Message"
                rows={5}
                className="w-full rounded-lg border bg-background px-3 py-3 outline-none focus:ring-2 focus:ring-cta"
              />
              <button className="btn-cta">Send Message</button>
            </form>
            <p className="mt-6 text-xs text-muted-foreground">
              Disclaimer: LUMEN is a research prototype and does not replace
              professional medical advice.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Near Me - Pune</h3>
            <div className="mt-3 aspect-video overflow-hidden rounded-xl border">
              <iframe
                title="Pune Map"
                className="h-full w-full"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.72%2C18.42%2C74.12%2C18.72&layer=mapnik&marker=18.5204%2C73.8567"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
