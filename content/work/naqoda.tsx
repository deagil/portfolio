import Link from "next/link"

export function NaqodaDescription() {
  return (
    <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
      Naqoda built a cloud-native core banking platform for specialist lenders. I
      developed ledger-facing features and third-party integrations in a regulated
      environment where correctness and audit trails are non-negotiable.
    </p>
  )
}

export function NaqodaBullets() {
  return (
    <ul className="space-y-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
      <li>
        Implemented transactions, payments, and direct debit collection — the
        platform has since handled over £1B in lending and £2.3B in deposits (as of
        early 2025)
      </li>
      <li>
        Integrated ClearBank for payment clearing, Experian CAIS for credit
        reporting, and ComplyAdvantage for fraud monitoring
      </li>
      <li>
        Collaborated closely with{" "}
        <Link
          href="/work/oxbury-bank"
          className="text-foreground underline underline-offset-2 decoration-border transition-colors hover:decoration-foreground"
        >
          Oxbury Bank
        </Link>
        &apos;s engineering and support teams to wire the platform into their
        front-end systems ahead of and through their 2021 launch
      </li>
      <li>
        In March 2022, Oxbury acquired Naqoda to bring the platform fully in-house
        as part of the Oxbury Earth fintech stack
      </li>
    </ul>
  )
}
