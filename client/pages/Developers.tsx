import React from "react";
import Navbar from "@/components/lumen/Navbar";
import Footer from "@/components/lumen/Footer";
import { Github, Linkedin } from "lucide-react";
import { HyperText } from "@/components/lumen/HyperText";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const CV_URL =
  "https://cdn.builder.io/o/assets%2F445519f4dc2147579ea6fb2243527f29%2F64cb59ca2bb34b889f0a978bf1db3d56?alt=media&token=f1b2d979-0083-4c4e-9bca-11ee86faadd6&apiKey=445519f4dc2147579ea6fb2243527f29";
const DEFAULT_PHOTO =
  "https://cdn.builder.io/api/v1/image/assets%2F445519f4dc2147579ea6fb2243527f29%2F4587d99ad8074e819191cef9f9a8a2c7?format=webp&width=800";

function DeveloperCard({
  name,
  photo,
  cv,
  github,
  linkedin,
}: {
  name: string;
  photo?: string;
  cv?: string;
  github?: string;
  linkedin?: string;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="rounded-xl overflow-hidden border border-border">
          {photo ? (
            <div className="aspect-[4/5] w-full bg-black/5">
              <img
                src={photo}
                alt={`${name} photo`}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ) : (
            <div className="aspect-[4/5] w-full bg-muted grid place-items-center text-muted-foreground text-sm">
              Profile coming soon
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {cv ? (
            <a
              href={cv}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent"
            >
              View CV
            </a>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-input bg-background text-sm font-medium text-muted-foreground"
            >
              CV unavailable
            </button>
          )}
        </div>
        <div className="flex gap-2 pt-1 flex-wrap">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent"
            >
              <Github size={16} /> GitHub
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-input bg-background text-sm font-medium hover:bg-accent"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DevelopersPage() {
  return (
    <div className="relative">
      <FlickeringGrid
        className="absolute inset-0 -z-10 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <Navbar />
      <main className="relative z-10 pt-28 pb-16">
        <section className="container space-y-4">
          <HyperText
            className="text-center text-5xl sm:text-6xl font-extrabold"
            animateOnHover
            startOnView
          >
            Team LUMEN
          </HyperText>
          <p className="text-center text-black font-bold uppercase text-xl sm:text-2xl tracking-wide">
            MEET THE DEVELOPERS OF TEAM LUMEN
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <DeveloperCard
              name="Sanchit"
              photo={DEFAULT_PHOTO}
              cv={CV_URL}
              github={"https://github.com/sanchit1606"}
              linkedin={"https://www.linkedin.com/in/sanchit1606/"}
            />
            <DeveloperCard
              name="Priyal"
              photo="/Priyal.jpg"
              github="https://github.com/priyal-username"
              linkedin="https://www.linkedin.com/in/priyal-patange-b56904282/"
            />
            <DeveloperCard
              name="Paras"
              photo="/paras.jpg"
              cv="https://cdn.builder.io/o/assets%2Fe15e28af565249a28e9186f98d17e5d6%2F66d8999ca3824dfbb375211f9e3cd583?alt=media&token=a08f01d1-98a2-4513-81d1-b41e227a816d&apiKey=e15e28af565249a28e9186f98d17e5d6"
              github="https://github.com/paraspatil11"
              linkedin="https://www.linkedin.com/in/paras-patil-11o5/"
            />
            <DeveloperCard
              name="Kshitij"
              photo={
                "https://cdn.builder.io/api/v1/image/assets%2F445519f4dc2147579ea6fb2243527f29%2Fad5f0becc276472fbcdb59aafec6d377?format=webp&width=800"
              }
              cv={
                "https://cdn.builder.io/o/assets%2F445519f4dc2147579ea6fb2243527f29%2F7f75cef3e8af4aed861908f4f0157feb?alt=media&token=7d56d39a-2836-40ea-8049-ea52e4aa6feb&apiKey=445519f4dc2147579ea6fb2243527f29"
              }
              github={"https://github.com/okshitij"}
              linkedin={"https://www.linkedin.com/in/kshitij-kalrao/"}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
