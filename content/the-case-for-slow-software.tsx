import { Callout } from "@/components/article/callout"

export default function Content() {
  return (
    <>
      <p>
        The dominant religion in software is velocity. Ship fast, learn faster.
        Move at the speed of a startup. Deploy multiple times a day. The
        underlying assumption is that speed is inherently good—that more
        iterations mean better software, that faster feedback loops produce
        better products.
      </p>

      <p>
        Sometimes this is true. Often it&apos;s not. And the cases where it
        isn&apos;t true are rarely discussed, because velocity culture has made
        slowness almost morally suspect.
      </p>

      <h2>What fast shipping optimizes for</h2>

      <p>
        Continuous deployment optimizes for one specific kind of learning:
        learning from users who are using the product right now. This is
        genuinely valuable. There&apos;s no substitute for observing how people
        actually behave.
      </p>

      <p>
        But it&apos;s not the only kind of learning that matters. It doesn&apos;t
        help you learn what users don&apos;t know they want. It doesn&apos;t help
        you think through the second-order effects of a change, or the ways a
        feature might interact with parts of the system you haven&apos;t touched.
        It doesn&apos;t help you develop intuitions about quality that come only
        from sustained attention to craft.
      </p>

      <Callout type="aside">
        The fastest horse isn&apos;t always the winner. Sometimes the race
        requires a different animal entirely.
      </Callout>

      <h2>Technical debt as velocity debt</h2>

      <p>
        The clearest argument against unqualified velocity is technical debt. Fast
        shipping without sufficient care accumulates debt in the codebase—
        shortcuts, workarounds, missing abstractions, untested assumptions. This
        debt doesn&apos;t go away. It compounds. It makes every future change
        slower and more dangerous.
      </p>

      <p>
        Teams that ship fast early often find themselves unable to ship at all
        later. The irony is profound: the pursuit of velocity produces
        slowness. The teams that move carefully, maintain quality, and invest in
        foundations often end up faster over a longer time horizon.
      </p>

      <h2>Craft as competitive advantage</h2>

      <p>
        There are categories of software where care is an actual market
        differentiator. Where the quality of the product—its reliability, its
        precision, its attention to detail—creates loyalty that speed alone
        cannot. Professional tools, developer tools, infrastructure, anything
        where users have sophisticated taste.
      </p>

      <p>
        In these categories, the decision to move slowly is a strategic one. You
        are betting that users will pay a premium—in money, in loyalty, in
        word-of-mouth—for software that takes them seriously. This bet often pays
        off.
      </p>

      <Callout type="note">
        SQLite is maintained by a team of three people. It is used by billions of
        devices. Its test suite is larger than its source code. It has had no data
        corruption bugs in production in over two decades. This is what software
        built with care looks like.
      </Callout>

      <h2>The slower alternative</h2>

      <p>
        I&apos;m not arguing for waterfall development or for shipping nothing for
        years. The discipline of working software, of delivering real value
        regularly, is genuinely important.
      </p>

      <p>
        What I&apos;m arguing for is a more honest accounting of what velocity
        costs, and a willingness to choose slowness in specific, deliberate ways.
        To write tests before they&apos;re strictly necessary. To refactor before
        the pain becomes acute. To sit with a design problem long enough to find
        the elegant solution rather than the expedient one.
      </p>

      <p>
        Slow software, built carefully, compounds in the same way that fast
        software compounds debt. The interest accrues in the other direction.
      </p>
    </>
  )
}
