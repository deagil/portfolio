export function CodebaseDescription() {
  return (
    <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
      Sole engineer taking{" "}
      <a
        href="https://www.techscaler.co.uk/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:decoration-foreground"
      >
        Techscaler
      </a>
      —Scotland&apos;s £42M national startup accelerator, delivered by{" "}
      <a
        href="https://thisiscodebase.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:decoration-foreground"
      >
        CodeBase
      </a>{" "}
      for the Scottish Government—from zero to production, then into a full
      internal platform.
    </p>
  )
}

export function CodebaseBullets() {
  return (
    <ul className="space-y-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
      <li>
        Stood up data capture, reporting, and internal tooling end-to-end in under
        six weeks for programme launch — Zapier, Retool, HubSpot, AWS RDS, REST
        APIs
      </li>
      <li>
        Programme has supported 2,000+ businesses and attracted £257M in investment
        since 2022
      </li>
      <li>
        Co-led forming and hiring for CodeBase&apos;s first Product team, aimed at
        productising internal systems and exploring commercial opportunities
      </li>
      <li>
        Designing and building CodeBase&apos;s Next.js platform for education
        content and daily mentorship across six active programmes
      </li>
      <li>
        Scottish Government{" "}
        <a
          href="https://www.gov.scot/news/growing-scotlands-entrepreneurial-economy-2/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:decoration-foreground"
        >
          cited Techscaler
        </a>{" "}
        within Scotland&apos;s national entrepreneurship agenda; Scotland&apos;s
        startup economy now growing at 19% annually, outpacing the UK average
      </li>
    </ul>
  )
}
