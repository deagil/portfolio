import Image from "next/image"
import { Callout } from "@/components/article/callout"

export default function Content() {
  return (
    <>
      <p>
        Backroom started as a spreadsheet. Every FPL gameweek I&apos;d open a
        new tab, copy fixture difficulty ratings from somewhere, paste player
        stats from another tab, and try to make a decision. It was slow,
        error-prone, and rebuilding it from scratch each week.
      </p>

      <p>
        The obvious solution was to build something that did it properly. Two
        months later, Backroom was on the App Store.
      </p>

      <figure className="my-8">
        <div className="overflow-hidden rounded-xl border border-border">
          <Image
            src="/photos/backroom/hero.png"
            alt="Backroom for FPL — app screenshot"
            width={1200}
            height={675}
            className="w-full object-cover"
          />
        </div>
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          Backroom for FPL — transfer planning view
        </figcaption>
      </figure>

      <h2>The problem with FPL tools</h2>

      <p>
        Most FPL analytics tools are built for power users: dense tables, raw
        statistics, no opinion on what to actually do. They surface data but
        not insight. The gap between "I can see the expected goals stats" and
        "I know who to transfer in this week" remains entirely on the manager.
      </p>

      <p>
        Backroom tries to close that gap. It surfaces the same underlying data
        but presents it in a way that maps to the actual decisions you need to
        make: who to captain, which fixtures to target, which players are worth
        the hit.
      </p>

      <h2>Architecture</h2>

      <p>
        The iOS app is written in SwiftUI and talks to a Next.js API layer that
        aggregates and normalises data from the official FPL API. Player stats,
        fixture difficulty ratings, and ownership percentages are cached and
        refreshed on a schedule via Supabase edge functions.
      </p>

      <Callout type="note">
        The official FPL API is undocumented and changes without warning. A
        significant amount of the backend work is defensive—handling schema
        shifts gracefully and keeping the app usable when upstream data is
        stale or malformed.
      </Callout>

      <h2>What I learned</h2>

      <p>
        Building a native iOS app is a different discipline from web
        development. SwiftUI&apos;s declarative model is familiar if you&apos;ve
        used React, but the platform constraints—memory pressure, background
        execution limits, App Store review—require a different instinct.
      </p>

      <p>
        The most valuable thing I learned was about distribution. Getting an
        app into the hands of real users through the App Store is a forcing
        function. The polish required, the edge cases you have to handle, the
        support you end up providing—it makes the work feel real in a way that
        side projects running on localhost don&apos;t.
      </p>
    </>
  )
}
