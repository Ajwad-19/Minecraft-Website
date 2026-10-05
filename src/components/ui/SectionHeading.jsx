import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', id }) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <Reveal className={`mb-12 flex max-w-3xl flex-col gap-4 md:mb-16 ${alignment}`}>
      {eyebrow && (
        <span className="eyebrow inline-flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-2 w-2 bg-sky" />
          {eyebrow}
        </span>
      )}
      <h2 id={id} className="heading-pixel text-xl text-snow sm:text-2xl md:text-3xl">
        {title}
      </h2>
      <span aria-hidden="true" className="flex gap-1">
        <span className="h-1.5 w-10 bg-grass" />
        <span className="h-1.5 w-4 bg-grassdark" />
        <span className="h-1.5 w-2 bg-sky" />
      </span>
      {subtitle && <p className="max-w-xl text-base text-stone md:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
