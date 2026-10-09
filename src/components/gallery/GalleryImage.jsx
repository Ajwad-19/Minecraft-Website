// Gallery scenes rendered in Blender with Poly Haven materials (public/renders/gallery-*.webp, 1600×1000).
const POSITION = {
  center: 'object-center',
  top: 'object-[50%_25%]',
  bottom: 'object-[50%_75%]',
};

export default function GalleryImage({ scene, alt = '', focus = 'center', className = '', eager = false }) {
  return (
    <img
      src={`/renders/gallery-${scene}.webp`}
      alt={alt}
      width="1600"
      height="1000"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
      className={`h-full w-full select-none object-cover ${POSITION[focus] ?? POSITION.center} ${className}`}
    />
  );
}
