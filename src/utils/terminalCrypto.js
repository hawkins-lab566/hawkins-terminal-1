const encoder = new TextEncoder();
const decoder = new TextDecoder();

const EXPECTED_RETURN_CODE_HASH = "23ace28e2f7c8aed39542f7bd4b885728d3ee96f3ab0d72fbb8dc8abd6fe5f8d";

const ENCRYPTED_FINAL_FRAGMENT = {
  iv: "avB69sT0C3xzHROx",
  ciphertext: "bHqmQQGfjjN7ou65LZPh7PEPF0ZUx2K+idHURyl98g=="
};

export function normalizeTerminalCode(value) {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

function bytesToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function base64ToBytes(value) {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function sha256(value) {
  return crypto.subtle.digest("SHA-256", encoder.encode(value));
}

async function getAesKeyFromCode(normalizedCode) {
  const digest = await sha256(normalizedCode);

  return crypto.subtle.importKey(
    "raw",
    digest,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
}

export async function unlockFinalFragment(returnCode) {
  const normalizedCode = normalizeTerminalCode(returnCode);
  const digest = await sha256(normalizedCode);
  const hash = bytesToHex(digest);

  if (hash !== EXPECTED_RETURN_CODE_HASH) {
    throw new Error("INVALID_RETURN_CODE");
  }

  const key = await getAesKeyFromCode(normalizedCode);
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64ToBytes(ENCRYPTED_FINAL_FRAGMENT.iv) },
    key,
    base64ToBytes(ENCRYPTED_FINAL_FRAGMENT.ciphertext)
  );

  return decoder.decode(decrypted);
}
