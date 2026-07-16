import Link from "next/link"

export function OxburyDescription() {
  return (
    <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
      Following{" "}
      <a
        href="https://www.oxbury.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:decoration-foreground"
      >
        Oxbury Bank
      </a>
      &apos;s acquisition of{" "}
      <Link
        href="/work/naqoda"
        className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:decoration-foreground"
      >
        Naqoda
      </Link>{" "}
      in 2022, I focused on continuity — keeping the platform running and making its
      knowledge transferable while a new engineering organisation took shape.
    </p>
  )
}

export function OxburyBullets() {
  return (
    <ul className="space-y-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
      <li>
        Authored technical and user documentation and recorded video training for
        Oxbury developers — material that remained in use for new hires after the
        transition
      </li>
      <li>
        Reviewed pull requests for feature releases and continued building within
        the platform throughout the handover period
      </li>
      <li>
        Provided first- and second-line technical support for production banking
        systems
      </li>
      <li>
        Oxbury has since grown to £1.1B+ in drawn lending and £2.5B in savings
        deposits, reaching profitability in 2023
      </li>
      <li>
        Named #1 in the North West in{" "}
        <a
          href="https://www.chesterstandard.co.uk/news/25765767.chester-tech-firm-oxbury-bank-named-fastest-growing-times/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:decoration-foreground"
        >
          <em>The Sunday Times</em> 100 Tech
        </a>{" "}
        fastest-growing private tech firms
      </li>
      <li>
        British Business Bank expanded its sustainability-linked ENABLE guarantee
        with Oxbury to{" "}
        <a
          href="https://financialit.net/news/banking/british-business-bank-increases-existing-sustainability-incentivising-enable-guarantee"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:decoration-foreground"
        >
          £300M total
        </a>{" "}
        (February 2025)
      </li>
    </ul>
  )
}
