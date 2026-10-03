import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const GUEST_BUILD_MAX_AGE = 60 * 60 * 24 * 30;

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new Error("AUTH_SECRET is required for guest build access.");
  return value;
}

export function guestBuildCookieName(buildId: string) {
  // Hash IDs so cookie names contain only safe characters and have bounded length.
  return `guestBuild_${createHmac("sha256", secret()).update(buildId).digest("hex").slice(0, 32)}`;
}

function signature(buildId: string, payload: string) {
  return createHmac("sha256", secret())
    .update(JSON.stringify(["trailpicker-guest-build-v1", buildId, payload]))
    .digest("base64url");
}

export function createGuestBuildToken(buildId: string, now = Date.now()) {
  const payload = `${Math.floor(now / 1000) + GUEST_BUILD_MAX_AGE}:${randomBytes(32).toString("base64url")}`;
  return `${payload}.${signature(buildId, payload)}`;
}

export function verifyGuestBuildToken(buildId: string, token: string | undefined, now = Date.now()) {
  if (!token || token.length > 200) return false;
  const match = /^(\d+):([A-Za-z0-9_-]{43})\.([A-Za-z0-9_-]{43})$/.exec(token);
  if (!match) return false;
  const expiry = Number(match[1]);
  if (!Number.isSafeInteger(expiry) || expiry <= Math.floor(now / 1000)) return false;
  const actual = Buffer.from(match[3]);
  const expected = Buffer.from(signature(buildId, `${match[1]}:${match[2]}`));
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
