import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  information: [
    { label: "About us", href: "#about" },
    { label: "Members", href: "#testimonials" },
    { label: "Vacancies", href: "/signup" },
    { label: "Contact", href: "mailto:hello@mastry.co" },
  ],
  platform: [
    { label: "Career Passport", href: "/signup" },
    { label: "Job Discovery", href: "/signup" },
    { label: "Smart Matching", href: "/signup" },
    { label: "Interview Coach", href: "/signup" },
    { label: "Visa Intelligence", href: "/signup" },
  ],
  connect: [
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="bg-[var(--dark)] text-white/60">
      <div className="mx-auto max-w-[1240px] px-11 py-16">
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/brand/4.png"
                alt="Mastry"
                width={110}
                height={38}
                className="object-contain"
              />
            </Link>
            <p className="mt-4 max-w-[280px] text-[14px] leading-[1.65] text-white/35">
              AI career intelligence. Sharper search, truer matches, better
              outcomes. Built on truth, not tricks.
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-5">
              {footerLinks.connect.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-white/35 transition hover:text-white/60"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30">
              Information
            </h4>
            <ul className="space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/50 transition hover:text-white/80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30">
              Platform
            </h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/50 transition hover:text-white/80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/30">
              Contact
            </h4>
            <ul className="space-y-3 text-[14px] text-white/50">
              <li>
                <Link
                  href="mailto:hello@mastry.co"
                  className="transition hover:text-white/80"
                >
                  hello@mastry.co
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-white/[0.06] pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-6 text-[13px] text-white/30">
              <Link href="#" className="transition hover:text-white/50">
                Terms
              </Link>
              <Link href="#" className="transition hover:text-white/50">
                Privacy Policy
              </Link>
              <Link href="#" className="transition hover:text-white/50">
                Cookies
              </Link>
            </div>
            <div className="text-[13px] text-white/25">
              &copy; {new Date().getFullYear()} Mastry
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
