import Reveal from './Reveal';

/**
 * Section title block. Eyebrows are optional and used sparingly (about one in three sections),
 * so headings don't all share the same templated rhythm.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', id, className = '' }) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <Reveal className={`mb-12 flex max-w-3xl flex-col gap-4 md:mb-16 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="eyebrow inline-flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-sky" />
          {eyebrow}
        </span>
      )}
      <h2 id={id} className="heading-pixel text-4xl text-snow sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && <p className="max-w-[56ch] text-base leading-relaxed text-stone md:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
