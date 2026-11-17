import {permanentRedirect} from "next/navigation";
/** Old top-level Community link now lives under Discover. */
export default function FormerCommunityPage() {
  permanentRedirect("/discover/community");
}
