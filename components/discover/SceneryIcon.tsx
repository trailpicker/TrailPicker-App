import { Compass, Flower2, Mountain, Sailboat, Trees, Waves } from "lucide-react";
import type { Scenery } from "@/lib/discover-finder";

/** Share TrailPicker's existing Lucide icon style with the activity filters. */
const icons = {
  any: Compass,
  lakes: Waves,
  summits: Mountain,
  forest: Trees,
  coast: Sailboat,
  meadows: Flower2,
} satisfies Record<Scenery, typeof Compass>;

export default function SceneryIcon({ scene, className = "h-4 w-4" }: { scene: Scenery; className?: string }) {
  const Icon = icons[scene];
  return <Icon aria-hidden="true" className={className} strokeWidth={2} />;
}
