import { Callout } from "@/components/article/callout"

export default function Content() {
  return (
    <>
      <p>
        Every design system starts with a lie: that you can anticipate everything
        in advance. You draw up the tokens, name the colors, document the spacing
        scale. You ship it. Then reality arrives with requirements you hadn&apos;t
        imagined, and the system starts bending.
      </p>

      <p>
        The systems that survive aren&apos;t the ones that planned for everything.
        They&apos;re the ones that made good guesses about the right things and
        left enough room to grow.
      </p>

      <h2>Starting with tokens</h2>

      <p>
        The first meaningful decision is always the primitive layer—the raw values
        that everything else references. Colors as hues and lightness steps, not
        semantic names. Spacing as a ratio, not a list of pixels. Typography as a
        scale built on a ratio, not a grab-bag of sizes.
      </p>

      <p>
        At this level, the system doesn&apos;t know anything about your product. It
        just knows math. That separation is what allows the semantic layer to be
        swapped—dark mode, brand variants, accessibility overrides—without
        re-architecting anything below it.
      </p>

      <Callout type="note">
        The ratio I find works best for spacing is 1.5×, starting from 4px. This
        gives you 4, 6, 8, 12, 16, 24, 32, 48, 64, 96. Enough granularity that
        you rarely need to go off-scale.
      </Callout>

      <h2>The naming problem</h2>

      <p>
        Naming is where most design systems go wrong. There are two failure modes.
        The first is too descriptive: <code>blue-500</code>, <code>18px</code>,
        <code>font-weight-600</code>. These names tell you what the value is, not
        what it&apos;s for. The moment you want to change the design, the names
        become lies.
      </p>

      <p>
        The second failure mode is too abstract: <code>primary</code>,
        <code>secondary</code>, <code>tertiary</code>. These sound like they mean
        something but they don&apos;t. Primary what? Primary in which context?
      </p>

      <p>
        The names that age best are role-based and context-specific:{" "}
        <code>surface-raised</code>, <code>text-subdued</code>,{" "}
        <code>interactive-default</code>. They describe the job, not the value.
        When you change the underlying color, the name stays true.
      </p>

      <h2>The documentation trap</h2>

      <p>
        Design systems have a documentation problem that nobody wants to talk
        about: the documentation is almost always wrong. Not because the people
        who wrote it were careless—they weren&apos;t. But because systems evolve
        faster than documentation gets updated. The code drifts from the spec. The
        spec drifts from practice.
      </p>

      <p>
        The partial fix I&apos;ve found is to treat the code as the source of
        truth and generate documentation from it. Storybook, if you&apos;re in
        that ecosystem, gets you most of the way. The remaining work is cultural:
        making documentation updates as automatic as code reviews.
      </p>

      <Callout type="aside">
        The best design systems are the ones nobody notices. Users don&apos;t
        think about the grid. Developers don&apos;t fight the tokens. The system
        disappears into the product.
      </Callout>

      <h2>What to accept</h2>

      <p>
        No system will stay clean. Entropy is the default state of any sufficiently
        complex product. Accept this, and you stop fighting the wrong battles. You
        build in mechanisms for evolution rather than trying to achieve permanence.
      </p>

      <p>
        The goal is never a perfect system. The goal is a system that&apos;s
        better than the alternative—which is no system at all, just decisions
        accumulating without structure until nobody knows why anything is the way
        it is.
      </p>
    </>
  )
}
