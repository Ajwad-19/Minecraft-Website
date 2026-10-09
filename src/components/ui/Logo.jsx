import BlockRender from './BlockRender';

export default function Logo({ href = '#home', size = 'md' }) {
  const cube = size === 'lg' ? 50 : 40;
  return (
    <a href={href} className="group flex items-center gap-2.5" aria-label="ExampleCraft home">
      <BlockRender type="grass" size={cube} eager className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-6" />
      <span className={`font-pixel leading-none ${size === 'lg' ? 'text-base' : 'text-[13px] sm:text-sm'}`}>
        <span className="text-snow">EXAMPLE</span>
        <span className="text-grass text-glow-green">CRAFT</span>
      </span>
    </a>
  );
}
